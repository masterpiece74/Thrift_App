import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function VerifyPhone() {
  const loc = useLocation();
  const navigate = useNavigate();
  const { sendOtpToWhatsApp, verifyOtp } = useAuth();
  const phoneFromState = loc?.state?.phone;
  const [phone, setPhone] = useState(phoneFromState || '');
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');

  async function handleSend() {
    if (!phone) return setMessage('Enter phone number first');
    setMessage('Sending OTP...');
    const res = await sendOtpToWhatsApp(phone);
    if (!res || !res.ok) {
      setMessage(res?.message || 'Failed to send OTP');
      return;
    }
    // Show mock code returned by server for testing only
    setMessage(`OTP sent via WhatsApp (mock). Code: ${res.code}`);
  }

  async function handleVerify(e) {
    e.preventDefault();
    setMessage('Verifying...');
    const res = await verifyOtp(phone, otp);
    if (!res || !res.ok) return setMessage(res?.message || 'OTP verification failed');
    setMessage('Phone verified! Redirecting to marketplace...');
    setTimeout(() => navigate('/dashboard'), 800);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 to-teal-50 p-6">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow border-t-4 border-emerald-600">
        <h1 className="text-xl font-bold mb-2 text-teal-900">Verify your phone via WhatsApp</h1>
        <p className="text-sm text-slate-600 mb-4">We will send a one-time code to your WhatsApp number.</p>

        <div className="space-y-3">
          <div>
            <label className="block text-sm text-slate-700">Phone</label>
            <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="+234801..." className="mt-1 block w-full border border-slate-300 rounded p-2 focus:ring-2 focus:ring-teal-500" />
          </div>

          <div className="flex gap-2">
            <button onClick={handleSend} className="px-4 py-2 bg-linear-to-r from-teal-600 to-emerald-600 text-white rounded hover:from-teal-700 hover:to-emerald-700 font-semibold">Send OTP via WhatsApp</button>
            <button onClick={() => { setMessage('Resend not implemented'); }} className="px-4 py-2 bg-slate-200 rounded">Resend</button>
          </div>

          <form onSubmit={handleVerify} className="space-y-2">
            <div>
              <label className="block text-sm text-slate-700">Enter OTP</label>
              <input value={otp} onChange={e => setOtp(e.target.value)} placeholder="123456" className="mt-1 block w-full border border-slate-300 rounded p-2 focus:ring-2 focus:ring-teal-500" />
            </div>
            <div>
              <button type="submit" className="w-full px-4 py-2 bg-linear-to-r from-teal-600 to-emerald-600 text-white rounded hover:from-teal-700 hover:to-emerald-700 font-semibold">Verify OTP</button>
            </div>
          </form>

          {message && <div className="mt-2 p-2 bg-teal-50 text-teal-800 rounded">{message}</div>}
        </div>
      </div>
    </div>
  );
}
