import React from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import CarList from '../components/CarList';
import HowItWorks from '../components/HowItWorks';
import Testimonials from '../components/Testimonials';

const Beranda = () => {
  return (
    <div className="flex flex-col min-h-screen font-sans bg-white selection:bg-slate-300 selection:text-slate-950">
      <main className="flex-grow">
        <Hero />
        <Features />
        <CarList />
        <HowItWorks />
        <Testimonials />
      </main>
    </div>
  );
};

export default Beranda;
