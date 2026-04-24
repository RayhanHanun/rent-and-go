import React from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import CarList from '../components/CarList';
import HowItWorks from '../components/HowItWorks';
import Testimonials from '../components/Testimonials';

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen font-sans bg-white selection:bg-blue-200 selection:text-blue-900">
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

export default Home;