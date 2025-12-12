import React from 'react';

export default function FeatureCard({ title, description }) {
  return (
    <div className="bg-white shadow-md rounded-xl p-6 flex-1 hover:shadow-xl transition">
      <h3 className="text-xl font-bold mb-2 text-indigo-600">{title}</h3>
      <p className="text-slate-600">{description}</p>
    </div>
  );
}
