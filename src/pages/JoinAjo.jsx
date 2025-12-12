import React from 'react';
import Ajo4 from '../assets/Ajo4.png'; // ✅ import the image

export default function JoinAjo() {
  return (
    <div className="bg-gradient-to-br from-slate-50 to-teal-50 py-20 px-6 md:px-12 flex flex-col md:flex-row items-center gap-12">
      <div className="md:w-1/2">
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-teal-700 to-emerald-700 bg-clip-text text-transparent mb-6">Join AjoMoney</h1>
        <p className="text-lg text-slate-700 mb-6">
          Become financially free and included when you build credit through flexible savings such as rotating group savings and thrift contribution with collective investment.
        </p>
        <a href="/signup" className="px-6 py-3 bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-semibold rounded-md shadow hover:from-teal-700 hover:to-emerald-700">
          Get Started
        </a>
      </div>
      <div className="md:w-1/2">
        <img src={Ajo4} alt="Join AjoMoney" className="rounded-xl shadow-lg mx-auto" />
      </div>
    </div>
  );
}
