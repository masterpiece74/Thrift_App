import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function SoloThriftSignup() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const { registerUser } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (!name || !email || !phone || !password || !confirm) {
      setError('Please fill in all fields.');
      return;
    }
    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }

    // Register user (backend)
    const res = await registerUser({ name, email, phone, password, type: 'solo' });
    if (!res.ok) {
      setError(res.message || 'Registration failed');
      return;
    }else if (res.ok){
      console.log("Registration successful:", res);
    }
    alert('Account created! Please verify your phone via WhatsApp OTP.');
    setName('');
    setEmail('');
    setPassword('');
    setConfirm('');
    setTimeout(() => navigate('/verify-phone', { state: { phone } }), 300);
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-teal-50 flex flex-col">
      <div className="grow flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-2xl border-t-4 border-teal-600">
          <h1 className="text-2xl font-bold bg-linear-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent mb-2">Create Solo Thrift Account</h1>
          <p className="text-sm text-slate-600 mb-6">Sign up to create and manage your personal thrift/Kolo.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700">Full name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full border rounded-md p-2"
              placeholder="Jane Doe"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Phone number</label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1 block w-full border rounded-md p-2"
              placeholder="+2348012345678"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full border rounded-md p-2"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full border rounded-md p-2"
              placeholder="Choose a strong password"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Confirm Password</label>
            <input
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="mt-1 block w-full border rounded-md p-2"
              placeholder="Repeat password"
            />
          </div>

          {error && <div className="text-sm text-red-600">{error}</div>}

          <button type="submit" className="w-full px-4 py-2 bg-linear-to-r from-teal-600 to-emerald-600 text-white rounded-md hover:from-teal-700 hover:to-emerald-700 font-semibold">
            Create Account
          </button>
        </form>

          <p className="text-sm text-slate-600 mt-4">
            Already have an account?{' '}
            <Link to="/signin" className="text-teal-600 font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-linear-to-r from-teal-700 to-emerald-700 text-white py-8 px-6 text-center shadow-lg">
        <p className="text-sm mb-2 text-amber-300">© 2025 RubiesThrift — Personal Savings Made Simple</p>
        <p className="text-xs text-teal-100">Secure • Transparent • Trusted</p>
      </footer>
    </div>
  );
}
