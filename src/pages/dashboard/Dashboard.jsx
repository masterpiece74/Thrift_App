import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Dashboard() {
  const { currentUser, contributions } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50">
      {/* Top navbar for dashboard */}
      <header className="bg-gradient-to-r from-teal-700 to-emerald-700 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="text-2xl font-bold text-amber-300">RubiesThrift</div>
            <nav className="hidden md:flex items-center gap-4 text-teal-100">
              <NavLink to="/dashboard" end className={({isActive})=> isActive? 'text-amber-300 font-semibold' : '' }>Home</NavLink>
              <NavLink to="/dashboard/transactions" className={({isActive})=> isActive? 'text-amber-300 font-semibold' : '' }>Transactions</NavLink>
              <NavLink to="/support" className={({isActive})=> isActive? 'text-amber-300 font-semibold' : '' }>Support</NavLink>
              <NavLink to="/dashboard/profile" className={({isActive})=> isActive? 'text-amber-300 font-semibold' : '' }>Account</NavLink>
              <NavLink to="/dashboard/group-savings" className={({isActive})=> isActive? 'text-amber-300 font-semibold' : '' }>My Group</NavLink>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-sm text-teal-100">{currentUser ? `Hi ${currentUser.name}` : 'Hi there'}</div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column: thrift options and verification card */}
          <div className="lg:col-span-2">
            {/* Thrift Type Selection */}
            <div className="bg-white p-6 rounded-xl shadow mb-6 border-t-4 border-teal-600">
              <h2 className="text-2xl font-bold mb-4 text-teal-900">Choose your thrift type</h2>
              <p className="text-slate-600 mb-6">Select how you want to save and grow your wealth.</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <NavLink to="/solo-thrift/signup" className="block p-6 bg-gradient-to-br from-teal-50 to-teal-100 border-2 border-teal-300 rounded-lg hover:shadow-lg transition transform hover:scale-105">
                  <h3 className="text-xl font-bold text-teal-900">Solo Thrift</h3>
                  <p className="text-teal-700 mt-2">Personal savings and goals.</p>
                  <div className="mt-4 inline-flex items-center px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700">Get started</div>
                </NavLink>

                <NavLink to="/dashboard/group-thrift" className="block p-6 bg-gradient-to-br from-emerald-50 to-emerald-100 border-2 border-emerald-300 rounded-lg hover:shadow-lg transition transform hover:scale-105">
                  <h3 className="text-xl font-bold text-emerald-900">Group Thrift (Ajo)</h3>
                  <p className="text-emerald-700 mt-2">Create or join a group thrift.</p>
                  <div className="mt-4 inline-flex items-center px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700">Get started</div>
                </NavLink>
              </div>
            </div>

            {/* Verification Card */}
            <div className="bg-white p-6 rounded-xl shadow border-t-4 border-emerald-600">
              <h2 className="text-2xl font-bold mb-2 text-teal-900">Complete your verification</h2>
              <p className="text-slate-600 mb-4">Upload a selfie, a government issued ID and proof of address to join</p>

              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-slate-500">Rubiesthrift group have</div>
                  <div className="text-3xl font-extrabold mt-1 text-teal-600">0%</div>
                </div>

                <div>
                  <button className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700">Complete verification</button>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <Outlet />
            </div>
          </div>

          {/* Right column: wallet */}
         <aside className="bg-gradient-to-br from-teal-600 to-emerald-600 p-6 rounded-xl shadow-lg text-white">
  <h3 className="text-lg font-semibold text-amber-300">Wallet Balance</h3>

  <div className="text-4xl font-extrabold mt-3 text-amber-300">
    ₦{(contributions || 0).toLocaleString()}
  </div>

  <p className="text-xs text-teal-100 mt-2">Total funds available</p>

  <div className="mt-6 space-y-2">
    <a
      href="/payments"
      className="block px-4 py-2 bg-amber-500 text-teal-900 rounded-lg hover:bg-amber-400 text-center font-semibold transition font-bold"
    >
      Make Payment
    </a>

    <a
      href="/marketplace"
      className="block px-4 py-2 bg-teal-700 text-white rounded-lg hover:bg-teal-800 text-center font-semibold transition border border-amber-300"
    >
      Go to Marketplace
    </a>

    <button className="w-full px-4 py-2 bg-emerald-700 text-white rounded-md hover:bg-emerald-800 border border-amber-300">
      Add money
    </button>
  </div>
</aside>

        </div>
      </div>
    </div>
  );
}
