# Paystack Live Payment Integration Setup Guide

## Step 1: Create a Paystack Account
1. Go to https://paystack.com
2. Sign up for a free account
3. Verify your email
4. Complete your business verification

## Step 2: Get Your Public Key
1. Log in to Paystack Dashboard: https://dashboard.paystack.com
2. Go to **Settings** → **API Keys & Webhooks**
3. Copy your **Public Key** (starts with `pk_`)

## Step 3: Update Configuration
Replace the placeholder key in `src/config/paystack.js`:

```javascript
export const PAYSTACK_PUBLIC_KEY = 'pk_live_your_actual_key_here';
```

## Step 4: Enable Paystack Script
The Paystack script is automatically loaded from the CDN when needed.

## Payment Flow

### Customer Makes a Payment:
1. User navigates to **Payments** page
2. Enters amount and selects Paystack method
3. Clicks "Pay with Paystack"
4. Paystack modal appears for payment
5. Customer enters card/mobile money details
6. Payment is processed
7. **Wallet balance automatically updates** in dashboard
8. Payment appears in Payment History

### Payment Recording:
- ✅ Successful payments update `contributions` in AuthContext
- ✅ Wallet balance persists in localStorage
- ✅ Payment history tracked in local storage
- ✅ Dashboard shows real-time wallet balance

## Test Cards for Development

**Visa Test Card:**
- Card Number: 4084084084084081
- Expiry: Any future date (e.g., 12/25)
- CVV: Any 3 digits (e.g., 123)
- OTP: 123456

**Mastercard Test Card:**
- Card Number: 5061020000000000
- Expiry: Any future date
- CVV: Any 3 digits
- OTP: 123456

## Integration Points

### 1. Payment Page (`src/pages/Payments.jsx`)
- Amount input
- Method selection
- Payment processing
- History tracking

### 2. Dashboard (`src/pages/dashboard/Dashboard.jsx`)
- Real-time wallet balance display
- Quick links to Payment page
- Shows contributions from all payment methods

### 3. AuthContext (`src/context/AuthContext.jsx`)
- `recordPayment(amount)` - Records payment and updates contributions
- `contributions` - Current wallet balance
- Data persists in localStorage

### 4. Paystack Config (`src/config/paystack.js`)
- Configuration management
- Payment initialization
- Response handling

## Features Implemented

✅ **Live Paystack Integration**
- Real card payments processed
- Instant fund transfer to your account
- Secure payment processing

✅ **Wallet Management**
- Automatic balance updates
- Real-time dashboard reflection
- Transaction history tracking

✅ **Multiple Payment Methods**
- Card payments (Visa, Mastercard, Verve)
- Mobile money (MTN, Airtel)
- Bank transfers (manual)
- Mobile money transfers (manual)

✅ **User Experience**
- Real-time error messages
- Success notifications
- Payment history with timestamps
- Transaction references

## Troubleshooting

### Payment Not Processing
1. Check that PUBLIC_KEY is correctly set
2. Verify Paystack account is verified
3. Check browser console for errors
4. Ensure amount is ≥ ₦100

### Wallet Not Updating
1. Check localStorage (browser DevTools)
2. Verify AuthContext is properly initialized
3. Check that payment was marked as successful

### Script Not Loading
1. Check internet connection
2. Paystack CDN might be down (rare)
3. Try refreshing the page

## Next Steps

1. Go live with Paystack by switching to live keys
2. Set up webhooks for payment verification
3. Implement payment notifications via email
4. Add payment receipts
5. Implement automated payment confirmation system

## Support

For Paystack support: https://paystack.com/support
For your app issues: Check the browser console for error messages
