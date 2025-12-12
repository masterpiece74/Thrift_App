import React from 'react';
import PartnersImg from '../assets/Partners.png';

export default function Partners() {
  return (
    <div className="bg-gradient-to-br from-slate-50 to-teal-50 py-20 px-6 md:px-12 flex flex-col md:flex-row items-center gap-12">
      <div className="md:w-1/2">
        <img src={PartnersImg} alt="Partners API" className="rounded-xl shadow-lg mx-auto" />
      </div>
      <div className="md:w-1/2">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-teal-700 to-emerald-700 bg-clip-text text-transparent mb-4">Partners API</h2>
        <p className="text-slate-700 mb-4">
          Savings and credit as a service API for developers and businesses. Launch your savings and credit platform or solution. Help your users build credit for saving.
        </p>
      </div>
    </div>
  );
}
