import React, { useState } from 'react';
import { FaUsers, FaCalendar, FaMoneyBillWave, FaTrophy, FaUserPlus, FaChartLine, FaClock, FaCheckCircle } from 'react-icons/fa';

export default function GroupSavings() {
  const [groups, setGroups] = useState(() => {
    const saved = localStorage.getItem('user-groups');
    return saved ? JSON.parse(saved) : [
      {
        id: 1,
        name: "Lagos Savers",
        description: "Community savings group for professionals",
        members: [
          { id: 1, name: "Chika", phone: "+2348012345678", contributions: 50000, status: "active" },
          { id: 2, name: "Tunde", phone: "+2348087654321", contributions: 50000, status: "active" },
          { id: 3, name: "Ada", phone: "+2348098765432", contributions: 50000, status: "active" },
          { id: 4, name: "You", phone: "+2348001234567", contributions: 50000, status: "active" }
        ],
        totalMembers: 4,
        monthlyContribution: 50000,
        frequency: "Monthly",
        nextPayoutDate: "2025-12-15",
        payoutCycle: "Rotating",
        totalCollected: 200000,
        startDate: "2025-10-01",
        status: "active"
      },
      {
        id: 2,
        name: "Friends Thrift Circle",
        description: "Close friends group savings",
        members: [
          { id: 1, name: "Blessing", phone: "+2348012389456", contributions: 30000, status: "active" },
          { id: 2, name: "Joy", phone: "+2348019876543", contributions: 30000, status: "active" },
          { id: 3, name: "You", phone: "+2348001234567", contributions: 30000, status: "active" }
        ],
        totalMembers: 3,
        monthlyContribution: 30000,
        frequency: "Monthly",
        nextPayoutDate: "2025-12-20",
        payoutCycle: "Rotating",
        totalCollected: 90000,
        startDate: "2025-11-01",
        status: "active"
      }
    ];
  });

  const [selectedGroup, setSelectedGroup] = useState(null);
  const [showAddMember, setShowAddMember] = useState(false);
  const [newMember, setNewMember] = useState({ name: '', phone: '', contribution: '' });
  const [filter, setFilter] = useState('all');

  // Add new member to group
  const handleAddMember = (groupId) => {
    if (!newMember.name || !newMember.phone || !newMember.contribution) {
      alert('Please fill all fields');
      return;
    }

    const updated = groups.map(g => {
      if (g.id === groupId) {
        return {
          ...g,
          members: [...g.members, {
            id: Date.now(),
            name: newMember.name,
            phone: newMember.phone,
            contributions: parseInt(newMember.contribution),
            status: 'active'
          }],
          totalMembers: g.totalMembers + 1
        };
      }
      return g;
    });

    setGroups(updated);
    localStorage.setItem('user-groups', JSON.stringify(updated));
    setNewMember({ name: '', phone: '', contribution: '' });
    setShowAddMember(false);
  };

  // Update member contribution
  const updateMemberContribution = (groupId, memberId, newAmount) => {
    const updated = groups.map(g => {
      if (g.id === groupId) {
        return {
          ...g,
          members: g.members.map(m =>
            m.id === memberId ? { ...m, contributions: newAmount } : m
          ),
          totalCollected: g.members.reduce((sum, m) => {
            if (m.id === memberId) return sum + newAmount;
            return sum + m.contributions;
          }, 0)
        };
      }
      return g;
    });

    setGroups(updated);
    localStorage.setItem('user-groups', JSON.stringify(updated));
  };

  // Remove member from group
  const removeMember = (groupId, memberId) => {
    const updated = groups.map(g => {
      if (g.id === groupId) {
        const newMembers = g.members.filter(m => m.id !== memberId);
        return {
          ...g,
          members: newMembers,
          totalMembers: g.totalMembers - 1,
          totalCollected: newMembers.reduce((sum, m) => sum + m.contributions, 0)
        };
      }
      return g;
    });

    setGroups(updated);
    localStorage.setItem('user-groups', JSON.stringify(updated));
  };

  const filteredGroups = filter === 'all' ? groups : groups.filter(g => g.status === filter);

  return (
    <div className="space-y-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-teal-900 mb-2">My Groups</h1>
        <p className="text-slate-700">Manage your group thrift and Ajo groups</p>
      </div>

      {/* Stats Overview */}
      {groups.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-xl shadow border-l-4 border-teal-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Active Groups</p>
                <p className="text-3xl font-bold text-teal-700">{groups.filter(g => g.status === 'active').length}</p>
              </div>
              <FaTrophy className="text-4xl text-teal-300" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow border-l-4 border-emerald-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Total Members</p>
                <p className="text-3xl font-bold text-emerald-700">{groups.reduce((sum, g) => sum + g.totalMembers, 0)}</p>
              </div>
              <FaUsers className="text-4xl text-emerald-300" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow border-l-4 border-teal-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Total Collected</p>
                <p className="text-3xl font-bold text-teal-700">₦{(groups.reduce((sum, g) => sum + g.totalCollected, 0) / 1000).toFixed(0)}k</p>
              </div>
              <FaMoneyBillWave className="text-4xl text-teal-300" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow border-l-4 border-emerald-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Next Payout</p>
                <p className="text-xl font-bold text-emerald-700">Dec 15</p>
              </div>
              <FaCalendar className="text-4xl text-emerald-300" />
            </div>
          </div>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex gap-2 bg-white p-3 rounded-xl shadow">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg font-semibold transition ${
            filter === 'all'
              ? 'bg-linear-to-r from-teal-600 to-emerald-600 text-white'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          All Groups
        </button>
        <button
          onClick={() => setFilter('active')}
          className={`px-4 py-2 rounded-lg font-semibold transition ${
            filter === 'active'
              ? 'bg-linear-to-r from-teal-600 to-emerald-600 text-white'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          Active
        </button>
      </div>

      {/* Groups List */}
      {filteredGroups.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-12 text-center">
          <FaUsers className="text-5xl text-slate-300 mx-auto mb-4" />
          <p className="text-lg text-slate-600 mb-4">No groups yet</p>
          <button className="px-6 py-2 bg-linear-to-r from-teal-600 to-emerald-600 text-white rounded-lg hover:from-teal-700 hover:to-emerald-700">
            Create a Group
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredGroups.map(group => (
            <div key={group.id} className="bg-white rounded-xl shadow-lg border-t-4 border-teal-600 overflow-hidden hover:shadow-xl transition">
              {/* Group Header */}
              <div className="bg-linear-to-r from-teal-50 to-emerald-50 p-6 border-b border-slate-200">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-teal-900 mb-1">{group.name}</h2>
                    <p className="text-slate-600">{group.description}</p>
                  </div>
                  <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                    {group.status === 'active' ? '🟢 Active' : '⚪ Inactive'}
                  </span>
                </div>

                {/* Key Stats */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div>
                    <p className="text-xs text-slate-600 mb-1">Members</p>
                    <p className="text-2xl font-bold text-teal-700">{group.totalMembers}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-600 mb-1">Monthly</p>
                    <p className="text-2xl font-bold text-teal-700">₦{(group.monthlyContribution / 1000).toFixed(0)}k</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-600 mb-1">Frequency</p>
                    <p className="text-sm font-bold text-teal-700">{group.frequency}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-600 mb-1">Total Collected</p>
                    <p className="text-2xl font-bold text-teal-700">₦{(group.totalCollected / 1000).toFixed(0)}k</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-600 mb-1">Next Payout</p>
                    <p className="text-sm font-bold text-emerald-700">{group.nextPayoutDate}</p>
                  </div>
                </div>
              </div>

              {/* Members Section */}
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-teal-900 flex items-center gap-2">
                    <FaUsers /> Members ({group.members.length})
                  </h3>
                  <button
                    onClick={() => {
                      setSelectedGroup(group.id);
                      setShowAddMember(!showAddMember);
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-linear-to-r from-teal-600 to-emerald-600 text-white rounded-lg hover:from-teal-700 hover:to-emerald-700 text-sm"
                  >
                    <FaUserPlus /> Add Member
                  </button>
                </div>

                {/* Add Member Form */}
                {selectedGroup === group.id && showAddMember && (
                  <div className="bg-slate-50 p-4 rounded-lg mb-4 border-l-4 border-emerald-600">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                      <input
                        type="text"
                        placeholder="Member name"
                        value={newMember.name}
                        onChange={(e) => setNewMember({...newMember, name: e.target.value})}
                        className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                      <input
                        type="tel"
                        placeholder="Phone number"
                        value={newMember.phone}
                        onChange={(e) => setNewMember({...newMember, phone: e.target.value})}
                        className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                      <input
                        type="number"
                        placeholder="Contribution amount"
                        value={newMember.contribution}
                        onChange={(e) => setNewMember({...newMember, contribution: e.target.value})}
                        className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleAddMember(group.id)}
                        className="px-4 py-2 bg-linear-to-r from-teal-600 to-emerald-600 text-white rounded-lg hover:from-teal-700 hover:to-emerald-700 text-sm font-semibold"
                      >
                        Add Member
                      </button>
                      <button
                        onClick={() => {
                          setShowAddMember(false);
                          setNewMember({ name: '', phone: '', contribution: '' });
                        }}
                        className="px-4 py-2 bg-slate-300 text-slate-700 rounded-lg hover:bg-slate-400 text-sm font-semibold"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                {/* Members Table */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-slate-100 border-b border-slate-200">
                        <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Name</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Phone</th>
                        <th className="px-4 py-3 text-right text-sm font-semibold text-slate-700">Contribution</th>
                        <th className="px-4 py-3 text-center text-sm font-semibold text-slate-700">Status</th>
                        <th className="px-4 py-3 text-center text-sm font-semibold text-slate-700">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {group.members.map((member, idx) => (
                        <tr key={member.id} className={`border-b border-slate-100 ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'} hover:bg-teal-50 transition`}>
                          <td className="px-4 py-3 font-medium text-slate-900">{member.name}</td>
                          <td className="px-4 py-3 text-slate-700 text-sm">{member.phone}</td>
                          <td className="px-4 py-3 text-right">
                            <input
                              type="number"
                              value={member.contributions}
                              onChange={(e) => updateMemberContribution(group.id, member.id, parseInt(e.target.value))}
                              className="w-32 text-right px-2 py-1 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm font-semibold"
                            />
                          </td>
                          <td className="px-4 py-3 text-center">
                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                              <FaCheckCircle /> Active
                            </span>
                          </td>
                          <td className="px-4 py-3 text-center">
                            <button
                              onClick={() => removeMember(group.id, member.id)}
                              className="text-red-600 hover:text-red-800 font-semibold text-sm"
                            >
                              Remove
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Group Timeline */}
              <div className="bg-slate-50 p-6 border-t border-slate-200">
                <h3 className="text-lg font-bold text-teal-900 mb-4 flex items-center gap-2">
                  <FaChartLine /> Group Timeline
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Start Date:</span>
                    <span className="font-semibold text-slate-900">{group.startDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Payout Cycle:</span>
                    <span className="font-semibold text-slate-900">{group.payoutCycle}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Next Payout:</span>
                    <span className="font-semibold text-emerald-700">{group.nextPayoutDate}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
