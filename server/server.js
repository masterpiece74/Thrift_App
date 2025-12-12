/* eslint-disable no-undef */
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());
const https = require('https');
const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET || 'sk_test_your_paystack_secret';

const DATA_FILE = path.join(__dirname, 'data.json');
let data = { users: [], transactions: [] };
try {
  if (fs.existsSync(DATA_FILE)) {
    data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8')) || { users: [] };
  }
} catch (e) {
  console.error('Failed to load data file', e);
}

function save() {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

// In-memory OTP store: { phone: { code, createdAt } }
const otps = new Map();

// Helpers
function findUserByPhone(phone) {
  return data.users.find(u => u.phone === phone);
}
function findUserByEmail(email) {
  return data.users.find(u => u.email === email);
}

app.post('/api/register', (req, res) => {
  const { name, email, phone, password, type, groupName } = req.body;
  if (!name || !email || !phone || !password) return res.status(400).json({ ok: false, message: 'Missing fields' });
  if (findUserByPhone(phone) || findUserByEmail(email)) return res.status(409).json({ ok: false, message: 'User exists' });
  const newUser = { id: Date.now().toString(36), name, email, phone, password, type, groupName: groupName || null, phoneVerified: false, bvnVerified: false };
  data.users.push(newUser);
  save();
  return res.json({ ok: true, user: { ...newUser, password: undefined } });
});

app.post('/api/login', (req, res) => {
  const { identifier, password } = req.body;
  if (!identifier || !password) return res.status(400).json({ ok: false, message: 'Missing fields' });
  const user = data.users.find(u => (u.phone === identifier || u.email === identifier) && u.password === password);
  if (!user) return res.status(401).json({ ok: false, message: 'Invalid credentials' });
  const safe = { ...user }; delete safe.password;
  return res.json({ ok: true, user: safe });
});

app.post('/api/send-otp', (req, res) => {
  const { phone } = req.body;
  if (!phone) return res.status(400).json({ ok: false, message: 'Phone required' });
  const code = String(Math.floor(100000 + Math.random() * 900000));
  otps.set(phone, { code, createdAt: Date.now() });
  console.log(`Mock OTP for ${phone}: ${code}`);
  // In real world, you'd call WhatsApp API here.
  return res.json({ ok: true, message: 'OTP sent (mock)', code });
});

app.post('/api/verify-otp', (req, res) => {
  const { phone, code } = req.body;
  if (!phone || !code) return res.status(400).json({ ok: false, message: 'Missing fields' });
  const entry = otps.get(phone);
  if (!entry) return res.status(400).json({ ok: false, message: 'No OTP sent' });
  if (entry.code !== code) return res.status(400).json({ ok: false, message: 'Invalid code' });
  // mark user verified
  const user = findUserByPhone(phone);
  if (user) {
    user.phoneVerified = true;
    save();
  }
  otps.delete(phone);
  return res.json({ ok: true });
});

app.post('/api/verify-bvn', (req, res) => {
  const { phone, bvn } = req.body;
  if (!phone || !bvn) return res.status(400).json({ ok: false, message: 'Missing fields' });
  if (!/^[0-9]{11}$/.test(bvn)) return res.status(400).json({ ok: false, message: 'Invalid BVN' });
  const user = findUserByPhone(phone);
  if (!user) return res.status(404).json({ ok: false, message: 'User not found' });
  user.bvnVerified = true;
  user.bvn = bvn;
  save();
  return res.json({ ok: true });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Mock server listening on http://localhost:${PORT}`));

// Paystack transaction verification endpoint (server-side)
app.post('/api/payments/verify', (req, res) => {
  const { reference } = req.body;
  if (!reference) return res.status(400).json({ ok: false, message: 'Missing reference' });

  const options = {
    hostname: 'api.paystack.co',
    path: `/transaction/verify/${encodeURIComponent(reference)}`,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${PAYSTACK_SECRET}`,
      'Content-Type': 'application/json',
    },
  };

  const reqPaystack = https.request(options, (r) => {
    let data = '';
    r.on('data', (chunk) => (data += chunk));
    r.on('end', () => {
      try {
        const parsed = JSON.parse(data);
        // If transaction is successful, reconcile into local data.transactions
        try {
          const status = parsed && parsed.data && parsed.data.status;
          const reference = parsed && parsed.data && parsed.data.reference;
          if (status === 'success' && reference) {
            // find or create transaction record
            let tx = data.transactions.find(t => t.reference === reference);
            if (!tx) {
              tx = {
                id: Date.now().toString(36),
                reference,
                amount: parsed.data.amount || null,
                status: parsed.data.status,
                gatewayResponse: parsed.data.gateway_response,
                paidAt: parsed.data.paid_at || null,
                raw: parsed,
              };
              data.transactions.push(tx);
            } else {
              tx.status = parsed.data.status;
              tx.gatewayResponse = parsed.data.gateway_response;
              tx.paidAt = parsed.data.paid_at || tx.paidAt;
              tx.raw = parsed;
            }
            save();
          }
        } catch (e) {
          console.error('Failed to reconcile transaction', e);
        }

        // forward Paystack verification response to client
        return res.json({ ok: true, data: parsed });
      } catch (e) {
        console.error('Failed parsing Paystack response', e, data);
        return res.status(502).json({ ok: false, message: 'Failed to verify transaction' });
      }
    });
  });

  reqPaystack.on('error', (err) => {
    console.error('Paystack verify request error', err);
    return res.status(502).json({ ok: false, message: 'Verification request failed' });
  });

  reqPaystack.end();
});

// Paystack webhook endpoint: receives event notifications from Paystack
// It expects raw JSON (required to verify signature) and validates the
// `x-paystack-signature` header using HMAC SHA512 with the secret.
const crypto = require('crypto');

app.post('/api/payments/webhook', express.raw({ type: 'application/json' }), (req, res) => {
  const signature = req.headers['x-paystack-signature'];
  const rawBody = req.body && req.body.toString ? req.body.toString() : '';
  if (!signature) {
    console.warn('Webhook received without signature');
    return res.status(400).send('Missing signature');
  }

  const expected = crypto.createHmac('sha512', PAYSTACK_SECRET).update(rawBody).digest('hex');
  if (expected !== signature) {
    console.warn('Invalid webhook signature');
    return res.status(400).send('Invalid signature');
  }

  let payload;
  try {
    payload = JSON.parse(rawBody);
  } catch (e) {
    console.error('Invalid webhook JSON', e);
    return res.status(400).send('Invalid JSON');
  }

  // Basic handling: store event data for transactions
  try {
    const event = payload.event;
    const eventData = payload.data || {};
    if (event && event.includes('charge.complete')) {
      const reference = eventData.reference || (eventData.transaction && eventData.transaction.reference);
      if (reference) {
        let tx = data.transactions.find(t => t.reference === reference);
        if (!tx) {
          tx = {
            id: Date.now().toString(36),
            reference,
            amount: eventData.amount || (eventData.transaction && eventData.transaction.amount) || null,
            status: eventData.status || 'unknown',
            gatewayResponse: eventData.gateway_response || null,
            paidAt: eventData.paid_at || null,
            raw: payload,
          };
          data.transactions.push(tx);
        } else {
          tx.status = eventData.status || tx.status;
          tx.gatewayResponse = eventData.gateway_response || tx.gatewayResponse;
          tx.paidAt = eventData.paid_at || tx.paidAt;
          tx.raw = payload;
        }
        save();
      }
    } else if (event && event.includes('transfer')) {
      // store other events as needed
      data.transactions.push({ id: Date.now().toString(36), event, raw: payload });
      save();
    } else {
      // keep a copy of other events
      data.transactions.push({ id: Date.now().toString(36), event, raw: payload });
      save();
    }
  } catch (e) {
    console.error('Failed processing webhook', e);
  }

  // Acknowledge quickly
  res.status(200).send('OK');
});

// Admin: simple transactions listing (read-only)
app.get('/api/admin/transactions', (req, res) => {
  // In production, secure this endpoint with authentication and authorization
  return res.json({ ok: true, transactions: data.transactions || [] });
});
