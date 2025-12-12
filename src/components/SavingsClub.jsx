// src/components/SavingsClub.jsx
import React from 'react';

export default function SavingsClub() {
  return (
    <div className="py-20 px-10 flex flex-col md:flex-row-reverse items-center gap-12">
      <img src="/Ajo2.png" alt="Savings club" className="w-full md:w-1/2 rounded-xl shadow-lg"/>
      <div className="md:w-1/2">
        <h2 className="text-3xl font-bold mb-4">Savings club & credit</h2>
        <p className="mb-4 text-slate-700">
          Not an instant loan, but why stay broke because you are saving money. Save your income daily, weekly, or monthly and take turns to get additional credit when you need it.
        </p>
        <a href="/join-group" className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700">
          Join a group
        </a>
      </div>
    </div>
  );
}
