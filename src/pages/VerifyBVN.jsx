import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function VerifyBVN() {
  const { currentUser, verifyBVN } = useAuth();
  const navigate = useNavigate();
  const [bvn, setBvn] = useState('');
  const [message, setMessage] = useState('');

  function handleVerify(e) {
    e.preventDefault();
    setMessage('Verifying BVN...');
    if (!currentUser) return setMessage('No signed-in user');
    if (!bvn) return setMessage('Please enter your BVN');
    (async () => {
      const res = await verifyBVN(currentUser.email, bvn);
      if (!res || !res.ok) return setMessage(res?.message || 'BVN verify failed');
      setMessage('BVN verified! Redirecting...');
      setTimeout(() => navigate('/dashboard'), 800);
    })();
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 to-teal-50 p-6">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow border-t-4 border-teal-600">
        <h1 className="text-xl font-bold mb-2 text-teal-900">Verify your BVN</h1>
        <p className="text-sm text-slate-600 mb-4">Enter your 11-digit BVN to complete verification.</p>

        <form onSubmit={handleVerify} className="space-y-4">
          <div>
            <label className="block text-sm text-slate-700">BVN</label>
            <input value={bvn} onChange={e => setBvn(e.target.value)} placeholder="11 digits" className="mt-1 block w-full border border-slate-300 rounded p-2 focus:ring-2 focus:ring-teal-500" />
          </div>

          <div>
            <button type="submit" className="w-full px-4 py-2 bg-linear-to-r from-teal-600 to-emerald-600 text-white rounded hover:from-teal-700 hover:to-emerald-700 font-semibold">Verify BVN</button>
          </div>

          {message && <div className="mt-2 p-2 bg-teal-50 text-teal-800 rounded">{message}</div>}
        </form>
      </div>
    </div>
  );
}
