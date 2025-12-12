import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function GroupThriftSignup() {
  const [groupName, setGroupName] = useState('');
  const [organiser, setOrganiser] = useState('');
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
    if (!groupName || !organiser || !phone || !email || !password || !confirm) {
      setError('Please fill in all fields.');
      return;
    }
    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }

    const res = await registerUser({ name: organiser, email, phone, password, type: 'group', groupName });
    if (!res.ok) {
      setError(res.message || 'Registration failed');
      return;
    }
    alert('Group account created! Please verify your phone via WhatsApp OTP.');
    setGroupName('');
    setOrganiser('');
    setEmail('');
    setPhone('');
    setPassword('');
    setConfirm('');
    setTimeout(() => navigate('/verify-phone', { state: { phone } }), 300);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50 flex flex-col">
      <div className="flex-grow flex items-center justify-center py-12 px-4">
        <div className="max-w-lg w-full bg-white p-8 rounded-2xl shadow-2xl border-t-4 border-emerald-600">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">Create Group Thrift Account</h1>
        <p className="text-sm text-slate-600 mb-6">Create a group account and invite members to join your rotational savings.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700">Group name</label>
            <input
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              className="mt-1 block w-full border rounded-md p-2"
              placeholder="Chika's Savings Group"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Organiser / Admin</label>
            <input
              value={organiser}
              onChange={(e) => setOrganiser(e.target.value)}
              className="mt-1 block w-full border rounded-md p-2"
              placeholder="Full name"
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
              placeholder="organiser@example.com"
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

          <button type="submit" className="w-full px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-md hover:from-emerald-700 hover:to-teal-700 font-semibold">
            Create Group
          </button>
        </form>

        <p className="text-sm text-slate-600 mt-4">
          Already have an account?{' '}
          <Link to="/signin" className="text-emerald-600 font-medium hover:underline">
            Sign in
          </Link>
        </p>
      </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-gradient-to-r from-emerald-700 to-teal-700 text-white py-8 px-6 text-center shadow-lg">
        <p className="text-sm mb-2 text-amber-300">© 2025 RubiesThrift — Group Savings Made Easy</p>
        <p className="text-xs text-emerald-100">Secure • Transparent • Trusted</p>
      </footer>
    </div>
  );
}
