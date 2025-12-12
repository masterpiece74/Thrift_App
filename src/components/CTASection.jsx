// src/components/CTASection.jsx
import React from 'react';

export default function CTASection() {
  return (
    <div className="py-20 bg-linear-to-r from-emerald-600 to-teal-600 text-white text-center">
      <h2 className="text-4xl font-bold mb-4">Join ThriftApp</h2>
      <p className="mb-8 max-w-xl mx-auto">
        Become financially free and included when you build credit through flexible savings such as rotating group savings and thrift contribution with collective investment.
      </p>
      <a href="/signup" className="px-8 py-4 bg-indigo-700 text-white font-semibold rounded-md hover:bg-indigo-800 transition-colors">
        Get Started
      </a>
    </div>
  );
}
