import React from 'react';
import FeatureCard from './FeatureCard';

export default function Features() {
  const features = [
    { title: 'Group Savings (Ajo)', description: 'Join or create a savings group and take turns collecting payouts.' },
    { title: 'Personal Savings', description: 'Save for your goals with flexible deposits and withdrawals.' },
    { title: 'Investment Clans', description: 'Invest with friends or community groups to earn returns.' },
  ];

  return (
    <div id="features" className="py-20 px-10 bg-gray-50">
      <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">Our Products</h2>
      <div className="flex flex-col md:flex-row gap-6">
        {features.map((f, i) => (
          <FeatureCard key={i} title={f.title} description={f.description} />
        ))}
      </div>
    </div>
  );
}
