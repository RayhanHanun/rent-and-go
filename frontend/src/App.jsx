import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import CarList from './components/CarList';
import HowItWorks from './components/HowItWorks';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import './index.css';

function App() {
  return (
    <div className="min-h-screen font-sans bg-white flex flex-col selection:bg-blue-200 selection:text-blue-900">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Features />
        <CarList />
        <HowItWorks />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}

export default App;
