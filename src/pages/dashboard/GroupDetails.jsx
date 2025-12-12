import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaArrowLeft, FaUsers, FaMoneyBillWave, FaCalendar, FaCheckCircle, FaClock } from 'react-icons/fa';

export default function GroupDetails() {
  const { id } = useParams();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [group, setGroup] = useState(null);
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const loadGroup = () => {
      const groups = JSON.parse(localStorage.getItem('rt-groups') || '[]');
      const g = groups.find(x => x.id === id);
      if (g) {
        setGroup(g);
      } else {
        setError('Group not found');
      }
    };
    
    loadGroup();
  }, [id]);

  function handleJoin() {
    if (!group) return;
    setError('');
    setMessage('');

    const members = group.members || [];
    const userId = currentUser?.email || currentUser?.id || currentUser?.name || 'anonymous';
    
    if (members.includes(userId)) {
      setError('You are already a member of this group');
      return;
    }

    const updatedGroup = {
      ...group,
      members: [...members, userId]
    };

    const groups = JSON.parse(localStorage.getItem('rt-groups') || '[]');
    const idx = groups.findIndex(x => x.id === id);
    if (idx >= 0) groups[idx] = updatedGroup;
    localStorage.setItem('rt-groups', JSON.stringify(groups));
    setGroup(updatedGroup);
    setMessage('✅ Welcome! You are now a member of this group.');
    setTimeout(() => setMessage(''), 3000);
  }

  function handleContribute(e) {
    e.preventDefault();
    if (!group) return;
    setError('');
    setMessage('');

    if (!amount || Number(amount) <= 0) {
      setError('Amount must be greater than 0');
      return;
    }

    const userId = currentUser?.email || currentUser?.id || currentUser?.name || 'anonymous';
    
    const contributions = group.contributions || [];
    
    const con = {
      id: `c-${Date.now()}`,
      user: userId,
      amount: Number(amount),
      date: new Date().toISOString().split('T')[0]
    };

    const updatedGroup = {
      ...group,
      contributions: [...contributions, con],
      totalCollected: (group.totalCollected || 0) + Number(amount)
    };

    // Save to localStorage
    const groups = JSON.parse(localStorage.getItem('rt-groups') || '[]');
    const idx = groups.findIndex(x => x.id === id);
    if (idx >= 0) groups[idx] = updatedGroup;
    localStorage.setItem('rt-groups', JSON.stringify(groups));

    setGroup(updatedGroup);
    setAmount('');
    setMessage('💰 Contribution recorded successfully!');
    setTimeout(() => setMessage(''), 3000);
  }

  if (error && !group) {
    return (
      <div className="space-y-4">
        <button
          onClick={() => navigate('/dashboard/group-savings')}
          className="flex items-center gap-2 text-teal-600 hover:text-teal-700 mb-4"
        >
          <FaArrowLeft /> Back to Groups
        </button>
        <div className="p-6 bg-red-50 border-l-4 border-red-600 text-red-800 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  if (!group) return null;

  const userId = currentUser?.email || currentUser?.id || currentUser?.name || 'anonymous';
  const isMember = group.members && group.members.includes(userId);
  const totalContributed = group.contributions ? group.contributions.reduce((s, c) => s + Number(c.amount), 0) : 0;
  const userContributions = group.contributions ? group.contributions.filter(c => c.user === userId) : [];

  return (
    <div className="space-y-8">
      <button
        onClick={() => navigate('/dashboard/group-savings')}
        className="flex items-center gap-2 text-teal-600 hover:text-teal-700 font-semibold mb-4"
      >
        <FaArrowLeft /> Back to Groups
      </button>

      {/* Group Header */}
      <div className="bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-xl shadow-lg p-8">
        <h1 className="text-4xl font-bold mb-3">{group.name}</h1>
        <p className="text-teal-50 text-lg mb-6">{group.description}</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/20 rounded-lg p-4 backdrop-blur">
            <div className="flex items-center gap-2 text-teal-100 mb-1">
              <FaUsers /> Members
            </div>
            <p className="text-3xl font-bold">{group.members?.length || 0}</p>
          </div>

          <div className="bg-white/20 rounded-lg p-4 backdrop-blur">
            <div className="flex items-center gap-2 text-teal-100 mb-1">
              <FaMoneyBillWave /> Per Cycle
            </div>
            <p className="text-2xl font-bold">₦{(group.amount || 0).toLocaleString()}</p>
          </div>

          <div className="bg-white/20 rounded-lg p-4 backdrop-blur">
            <div className="flex items-center gap-2 text-teal-100 mb-1">
              <FaCalendar /> Frequency
            </div>
            <p className="text-xl font-bold capitalize">{group.frequency || 'Monthly'}</p>
          </div>

          <div className="bg-white/20 rounded-lg p-4 backdrop-blur">
            <div className="flex items-center gap-2 text-teal-100 mb-1">
              <FaCheckCircle /> Status
            </div>
            <p className="text-xl font-bold">🟢 Active</p>
          </div>
        </div>

        {!isMember && (
          <button
            onClick={handleJoin}
            className="mt-6 px-8 py-3 bg-white text-teal-600 font-bold rounded-lg hover:bg-slate-50 transition"
          >
            Join This Group
          </button>
        )}

        {isMember && (
          <div className="mt-6 inline-block px-6 py-3 bg-white/30 rounded-lg text-white font-semibold">
            ✅ You are a member
          </div>
        )}
      </div>

      {error && (
        <div className="p-4 bg-red-50 border-l-4 border-red-600 text-red-800 rounded-lg">
          {error}
        </div>
      )}

      {message && (
        <div className="p-4 bg-green-50 border-l-4 border-green-600 text-green-800 rounded-lg">
          {message}
        </div>
      )}

      {/* Group Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-teal-600">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-800">Total Collected</h3>
            <FaMoneyBillWave className="text-2xl text-teal-600" />
          </div>
          <p className="text-3xl font-bold text-teal-700">₦{(group.totalCollected || totalContributed).toLocaleString()}</p>
          <p className="text-sm text-slate-600 mt-2">{group.contributions?.length || 0} contributions</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-emerald-600">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-800">Your Contribution</h3>
            <FaCheckCircle className="text-2xl text-emerald-600" />
          </div>
          <p className="text-3xl font-bold text-emerald-700">₦{userContributions.reduce((s, c) => s + Number(c.amount), 0).toLocaleString()}</p>
          <p className="text-sm text-slate-600 mt-2">{userContributions.length} payment{userContributions.length !== 1 ? 's' : ''}</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-amber-600">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-800">Next Payout</h3>
            <FaClock className="text-2xl text-amber-600" />
          </div>
          <p className="text-2xl font-bold text-amber-700">{group.nextPayout || 'TBA'}</p>
          <p className="text-sm text-slate-600 mt-2">Cycle: {group.frequency || 'Monthly'}</p>
        </div>
      </div>

      {isMember && (
        /* Contribute Section */
        <div className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-teal-600">
          <h2 className="text-2xl font-bold text-teal-900 mb-6">Record Your Contribution</h2>

          <form onSubmit={handleContribute} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Amount (₦)
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder={`e.g., ${group.amount || 50000}`}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <p className="text-xs text-slate-600 mt-2">Standard amount: ₦{(group.amount || 50000).toLocaleString()}</p>
              </div>

              <div className="flex flex-col justify-end">
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-bold rounded-lg hover:from-teal-700 hover:to-emerald-700 transition"
                >
                  Record Contribution
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Members Section */}
      <div className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-emerald-600">
        <h2 className="text-2xl font-bold text-teal-900 mb-6 flex items-center gap-2">
          <FaUsers /> Group Members ({group.members?.length || 0})
        </h2>

        {group.members && group.members.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-slate-200">
                  <th className="text-left py-3 px-4 text-slate-700 font-semibold">Member</th>
                  <th className="text-right py-3 px-4 text-slate-700 font-semibold">Total Contributed</th>
                  <th className="text-center py-3 px-4 text-slate-700 font-semibold">Contributions</th>
                </tr>
              </thead>
              <tbody>
                {group.members.map((member, idx) => {
                  const memberContributions = group.contributions?.filter(c => c.user === member) || [];
                  const memberTotal = memberContributions.reduce((s, c) => s + Number(c.amount), 0);
                  return (
                    <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50 transition">
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-semibold text-slate-900">{member}</p>
                          {member === group.owner && (
                            <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded mt-1 inline-block">
                              👑 Group Owner
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <p className="font-bold text-teal-700 text-lg">₦{memberTotal.toLocaleString()}</p>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className="inline-block px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-sm font-semibold">
                          {memberContributions.length}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-slate-600 text-center py-8">No members yet</p>
        )}
      </div>

      {/* Contribution History */}
      <div className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-amber-600">
        <h2 className="text-2xl font-bold text-teal-900 mb-6">Contribution History</h2>

        {group.contributions && group.contributions.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-slate-200">
                  <th className="text-left py-3 px-4 text-slate-700 font-semibold">Date</th>
                  <th className="text-left py-3 px-4 text-slate-700 font-semibold">Member</th>
                  <th className="text-right py-3 px-4 text-slate-700 font-semibold">Amount</th>
                </tr>
              </thead>
              <tbody>
                {group.contributions
                  .sort((a, b) => new Date(b.date) - new Date(a.date))
                  .map(c => (
                    <tr key={c.id} className="border-b border-slate-100 hover:bg-slate-50 transition">
                      <td className="py-3 px-4">
                        <p className="font-medium text-slate-900">{c.date}</p>
                      </td>
                      <td className="py-3 px-4">
                        <p className="text-slate-700">{c.user}</p>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <span className="font-bold text-emerald-700 text-lg">₦{Number(c.amount).toLocaleString()}</span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>

            <div className="mt-6 p-6 bg-gradient-to-r from-teal-50 to-emerald-50 rounded-lg border-l-4 border-teal-600">
              <p className="text-slate-700 mb-2">Total Collected from Group:</p>
              <p className="text-3xl font-bold text-teal-700">
                ₦{(group.totalCollected || totalContributed).toLocaleString()}
              </p>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-slate-600 text-lg mb-4">No contributions yet</p>
            {isMember && (
              <p className="text-slate-500">Be the first to contribute to this group!</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
