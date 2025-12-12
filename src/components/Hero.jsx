// src/components/Hero.jsx
import React from 'react';
import Ajo1 from '../assets/ajo1.png';

export default function Hero() {
  return (
    <div className="relative bg-gradient-to-br from-slate-50 to-teal-50">
      <div className="container mx-auto flex flex-col-reverse md:flex-row items-center py-24 px-6 md:px-12">
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-5xl font-extrabold text-slate-900 mb-4">
            Alternative finance for underserved Africans
          </h1>
          <p className="text-lg text-slate-700 mb-6">
            We make access to micro-credit easy for SMEs and corporate workers at zero-interest. Become part of our community financing digital rotating savings and credit platform (ROSCA) to get started.
          </p>
          <a href="/signup" className="px-6 py-3 bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-semibold rounded-md shadow hover:from-teal-700 hover:to-emerald-700 transition-all">
            Get Started
          </a>
        </div>
        <div className="md:w-1/2 mb-8 md:mb-0">
          <img src={Ajo1} alt="Hero" className="rounded-xl shadow-lg mx-auto" />
        </div>
      </div>
    </div>
  );
}
