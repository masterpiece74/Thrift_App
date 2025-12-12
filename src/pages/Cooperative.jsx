import React from 'react';
import cooperativeImg from '../assets/cooperative.png';

export default function Cooperative() {
  return (
    <div className="bg-linear-to-br from-slate-50 to-teal-50 py-20 px-6 md:px-12 flex flex-col md:flex-row items-center gap-12">
      <div className="md:w-1/2">
        <h2 className="text-4xl font-bold bg-linear-to-r from-teal-700 to-emerald-700 bg-clip-text text-transparent mb-4">Cooperative</h2>
        <p className="text-slate-700 mb-4">
          Turn your cooperative into a neo-bank and help your members grow with improved thrift savings and loan management.
        </p>
      </div>
      <div className="md:w-1/2">
        <img src={cooperativeImg} alt="Cooperative" className="rounded-xl shadow-lg mx-auto" />
      </div>
    </div>
  );
}
