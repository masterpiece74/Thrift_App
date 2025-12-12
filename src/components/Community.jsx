// src/components/Community.jsx
import React from 'react';
import ajo2 from '../assets/ajo2.png';

export default function Community() {
  return (
    <div className="py-20 px-6 md:px-12 flex flex-col md:flex-row items-center gap-12 bg-gray-50">
      <img src={ajo2} alt="Community financing" className="w-full md:w-1/2 rounded-xl shadow-lg" />
      <div className="md:w-1/2">
        <h2 className="text-3xl font-bold mb-4">Community financing (ROSCA)</h2>
        <p className="mb-4 text-slate-700">
          By being a member of a rotating savings and credit group, you can collectively save money with people of similar cooperative significance and rotate collection.
        </p>
        <a href="/learn-more" className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700">
          Learn more
        </a>
      </div>
    </div>
  );
}
