// src/pages/Home.jsx
import React from 'react';

import Hero from '../components/Hero';
import Community from '../components/Community';
import CTASection from '../components/CTASection';

export default function Home() {
  return (
    <>
      <Hero />        {/* Displays Ajo1.png */}
      <Community />   {/* Displays Ajo2.png */}
      <CTASection />
    </>
  );
}
