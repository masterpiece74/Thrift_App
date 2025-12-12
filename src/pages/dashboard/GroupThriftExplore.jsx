import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FaUsers, FaCalendar, FaMoneyBillWave, FaPlus, FaSearch } from 'react-icons/fa';

export default function GroupThriftExplore() {
  const { currentUser } = useAuth();
  const [groups, setGroups] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [frequency, setFrequency] = useState('monthly');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loadGroups = () => {
      const saved = JSON.parse(localStorage.getItem('rt-groups') || 'null');
      if (saved && Array.isArray(saved)) {
        return saved;
      } else {
        // Seed with comprehensive mock groups
        const seed = [
          {
            id: 'g-1',
            name: 'Lagos Savers',
            description: 'Community savings group for professionals in Lagos',
            members: ['admin@example.com', 'user@example.com'],
            owner: 'admin@example.com',
            frequency: 'monthly',
            amount: 50000,
            contributions: [
              { id: 'c-1', user: 'admin@example.com', amount: 50000, date: '2025-12-01' },
              { id: 'c-2', user: 'user@example.com', amount: 50000, date: '2025-12-01' }
            ],
            startDate: '2025-10-01',
            nextPayout: '2025-12-15',
            totalCollected: 100000,
            status: 'active'
          },
          {
            id: 'g-2',
            name: 'Graduate Circle',
            description: 'Small rotating savings for recent graduates',
            members: ['grad1@example.com'],
            owner: 'grad1@example.com',
            frequency: 'weekly',
            amount: 20000,
            contributions: [],
            startDate: '2025-11-01',
            nextPayout: '2025-12-22',
            totalCollected: 0,
            status: 'active'
          },
          {
            id: 'g-3',
            name: 'EKITI MSME STUDENTS',
            description: 'Dedicated savings group for small business owners and students in Ekiti State',
            members: ['ifeoma@example.com', 'ololade@example.com', 'esho@example.com', 'davidbassey@example.com', 'ebenezer@example.com', 'charles@example.com', 'tosin@example.com', 'stephen@example.com'],
            owner: 'ifeoma@example.com',
            frequency: 'monthly',
            amount: 15000,
            contributions: [
              { id: 'c-3', user: 'ifeoma@example.com', amount: 15000, date: '2025-12-05' },
              { id: 'c-3a', user: 'ololade@example.com', amount: 15000, date: '2025-12-05' },
              { id: 'c-3b', user: 'esho@example.com', amount: 15000, date: '2025-12-05' },
              { id: 'c-3c', user: 'davidbassey@example.com', amount: 15000, date: '2025-12-05' }
            ],
            startDate: '2025-11-15',
            nextPayout: '2026-01-15',
            totalCollected: 60000,
            status: 'active'
          },
          {
            id: 'g-4',
            name: 'HKT SAVERS',
            description: 'Professional rotating savings group with flexible contribution plans',
            members: ['prof1@example.com', 'prof2@example.com', 'prof3@example.com', 'prof4@example.com'],
            owner: 'prof1@example.com',
            frequency: 'monthly',
            amount: 35000,
            contributions: [
              { id: 'c-4', user: 'prof1@example.com', amount: 35000, date: '2025-12-01' },
              { id: 'c-5', user: 'prof2@example.com', amount: 35000, date: '2025-12-01' }
            ],
            startDate: '2025-10-15',
            nextPayout: '2025-12-31',
            totalCollected: 70000,
            status: 'active'
          },
          {
            id: 'g-5',
            name: 'ADO SAVERS',
            description: 'Community-driven savings initiative for traders and entrepreneurs in Ado area',
            members: ['trader1@example.com', 'trader2@example.com', 'trader3@example.com'],
            owner: 'trader1@example.com',
            frequency: 'weekly',
            amount: 25000,
            contributions: [
              { id: 'c-6', user: 'trader1@example.com', amount: 25000, date: '2025-12-08' },
              { id: 'c-7', user: 'trader2@example.com', amount: 25000, date: '2025-12-08' },
              { id: 'c-8', user: 'trader3@example.com', amount: 25000, date: '2025-12-08' }
            ],
            startDate: '2025-12-01',
            nextPayout: '2025-12-29',
            totalCollected: 75000,
            status: 'active'
          },
          {
            id: 'g-6',
            name: 'ESHO SAVERS',
            description: 'Innovative savings group combining traditional rotating credit with digital convenience',
            members: ['member1@example.com', 'member2@example.com', 'member3@example.com', 'member4@example.com', 'member5@example.com'],
            owner: 'member1@example.com',
            frequency: 'monthly',
            amount: 40000,
            contributions: [
              { id: 'c-9', user: 'member1@example.com', amount: 40000, date: '2025-12-01' }
            ],
            startDate: '2025-11-01',
            nextPayout: '2026-02-01',
            totalCollected: 40000,
            status: 'active'
          }
        ];
        localStorage.setItem('rt-groups', JSON.stringify(seed));
        return seed;
      }
    };
    
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setGroups(loadGroups());
  }, []);

  function persist(next) {
    setGroups(next);
    localStorage.setItem('rt-groups', JSON.stringify(next));
  }

  function handleCreate(e) {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!currentUser) {
      setError('You must be signed in to create a group');
      return;
    }
    if (!name.trim()) {
      setError('Group name is required');
      return;
    }
    if (!amount || Number(amount) <= 0) {
      setError('Valid contribution amount is required');
      return;
    }

    const ownerId = currentUser.email || currentUser.id || currentUser.name || 'unknown';
    const newGroup = {
      id: `g-${Date.now()}`,
      name: name.trim(),
      description: description.trim(),
      members: [ownerId],
      owner: ownerId,
      frequency: frequency,
      amount: Number(amount),
      contributions: [],
      startDate: new Date().toISOString().split('T')[0],
      nextPayout: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      totalCollected: 0,
      status: 'active'
    };

    const next = [newGroup, ...groups];
    persist(next);
    setName('');
    setDescription('');
    setAmount('');
    setFrequency('monthly');
    setSuccess('🎉 Group created successfully! You can now invite members.');
    setTimeout(() => setSuccess(''), 3000);
  }

  function handleJoin(g) {
    navigate(`/dashboard/group/${g.id}`);
  }

  const filteredGroups = groups.filter(g =>
    g.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    g.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-teal-900 mb-2">Family Ajo (Group Thrift)</h1>
        <p className="text-slate-700">Join existing groups or create your own rotating savings circle</p>
      </div>

      {/* Available Groups Section */}
      <div className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-teal-600">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-teal-900">Available Groups</h2>
          <span className="px-4 py-2 bg-teal-100 text-teal-800 rounded-full font-semibold">
            {filteredGroups.length} groups
          </span>
        </div>

        {/* Search */}
        <div className="mb-6 relative">
          <FaSearch className="absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search groups..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        {/* Groups Grid */}
        {filteredGroups.length === 0 ? (
          <div className="text-center py-12">
            <FaUsers className="text-5xl text-slate-300 mx-auto mb-4" />
            <p className="text-lg text-slate-600 mb-4">No groups match your search</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGroups.map(g => (
              <div
                key={g.id}
                className="bg-linear-to-br from-slate-50 to-teal-50 border-2 border-slate-200 rounded-xl p-6 hover:shadow-lg hover:border-teal-400 transition transform hover:scale-105"
              >
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-teal-900 mb-2">{g.name}</h3>
                  <p className="text-sm text-slate-700 mb-3">{g.description}</p>
                  <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                    🟢 Active
                  </span>
                </div>

                <div className="space-y-3 mb-6 py-4 border-t border-b border-slate-200">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600 flex items-center gap-2"><FaUsers size={16} /> Members</span>
                    <span className="font-bold text-teal-700">{g.members.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600 flex items-center gap-2"><FaMoneyBillWave size={16} /> Amount</span>
                    <span className="font-bold text-teal-700">₦{(g.amount || 0).toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600 flex items-center gap-2"><FaCalendar size={16} /> Frequency</span>
                    <span className="font-bold text-teal-700 capitalize">{g.frequency}</span>
                  </div>
                </div>

                <button
                  onClick={() => handleJoin(g)}
                  className="w-full px-4 py-3 bg-linear-to-r from-teal-600 to-emerald-600 text-white rounded-lg hover:from-teal-700 hover:to-emerald-700 font-semibold transition"
                >
                  View & Join
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create Group Section */}
      <div className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-emerald-600">
        <h2 className="text-3xl font-bold text-teal-900 mb-6 flex items-center gap-2">
          <FaPlus /> Create Your Own Group
        </h2>

        {success && (
          <div className="p-4 bg-green-50 border-l-4 border-green-600 text-green-800 rounded-lg mb-6">
            {success}
          </div>
        )}
        {error && (
          <div className="p-4 bg-red-50 border-l-4 border-red-600 text-red-800 rounded-lg mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleCreate} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Group Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Family Ajo"
                className="w-full border border-slate-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Monthly Contribution (₦)</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="50000"
                className="w-full border border-slate-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What is your group about?"
                className="w-full border border-slate-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-teal-500 h-24"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Contribution Frequency</label>
              <select
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
                className="w-full border border-slate-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full px-6 py-4 bg-linear-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-lg hover:from-emerald-700 hover:to-teal-700 transition flex items-center justify-center gap-2"
          >
            <FaPlus /> Create Group
          </button>
        </form>
      </div>
    </div>
  );
}
