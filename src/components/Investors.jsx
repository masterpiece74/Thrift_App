// src/components/Investors.jsx
import React from 'react';

const investors = [
  '/logo1.png',
  '/logo2.png',
  '/logo3.png',
  '/logo4.png',
];

export default function Investors() {
  return (
    <div className="py-20 px-6 md:px-12 bg-white">
      <h2 className="text-3xl font-bold text-center mb-12">Our Investors and Partners</h2>
      <div className="flex flex-wrap justify-center items-center gap-8">
        {investors.map((logo, i) => (
          <img key={i} src={logo} alt={`Investor ${i + 1}`} className="h-16 object-contain" />
        ))}
      </div>
    </div>
  );
}
