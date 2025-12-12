// Paystack Configuration
// Replace with your actual Paystack public key from https://dashboard.paystack.com

export const PAYSTACK_PUBLIC_KEY = 'pk_test_your_paystack_key'; // Development key - replace with your key

export const initPaystackScript = () => {
  return new Promise((resolve) => {
    if (window.PaystackPop) {
      resolve(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://js.paystack.co/v1/inline.js';
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.head.appendChild(script);
  });
};

export const makePayment = (config) => {
  return new Promise((resolve, reject) => {
    if (!window.PaystackPop) {
      reject(new Error('Paystack is not loaded'));
      return;
    }

    const handler = window.PaystackPop.setup({
      key: PAYSTACK_PUBLIC_KEY,
      email: config.email,
      amount: config.amount * 100, // Convert to kobo
      ref: config.reference || `ref-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      onClose: function () {
        reject(new Error('Payment window closed'));
      },
      onSuccess: function (response) {
        resolve(response);
      },
    });

    handler.openIframe();
  });
};
