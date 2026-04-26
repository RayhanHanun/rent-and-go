import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import heroImage from '../assets/hero-mobil.jpeg';

const Hero = () => {
  const navigate = useNavigate();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  return (
    <section className="relative min-h-screen lg:min-h-[90vh] bg-slate-950 overflow-hidden flex items-center">
      {/* Background Image memanggil variabel heroImage */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${heroImage})`,
        }}
      />
      
      {/* Gradient Overlay for Text Readability */}
      <div className="absolute inset-0 bg-linear-to-r from-slate-950/95 via-slate-900/80 to-transparent/10 z-10" />

      {/* Content Container */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-16 md:mt-0">
        <motion.div 
          className="max-w-2xl"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {/* Kicker */}
          <motion.div variants={itemVariants} className="mb-6">
            <span className="inline-block bg-white text-slate-900 px-4 py-1.5 rounded-full text-sm font-bold tracking-widest uppercase shadow-sm">
              Rental Mobil No. 1 di Indonesia
            </span>
          </motion.div>
          
          {/* Main Headline */}
          <motion.h1 
            variants={itemVariants} 
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6"
          >
            Jelajahi Destinasi dengan Armada Ternyaman
          </motion.h1>
          
          {/* Subtitle */}
          <motion.p 
            variants={itemVariants} 
            className="text-lg sm:text-xl text-slate-300 mb-10 leading-relaxed font-light max-w-xl"
          >
            Mulai petualangan tak terlupakan dan nikmati dunia dengan kenyamanan dan gaya tak tertandingi bersama koleksi mobil premium kami.
          </motion.p>
          
          {/* Action Buttons */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => navigate('/fleet')} 
              className="bg-white text-slate-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-slate-100 transition-all duration-300 flex items-center justify-center gap-2 group shadow-xl hover:shadow-white/20"
            >
              Sewa Sekarang <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => navigate('/fleet')} 
              className="bg-transparent border border-white/30 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 hover:border-white transition-all duration-300 flex items-center justify-center backdrop-blur-sm"
            >
              Lihat Armada
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll to Top Button */}
      <div 
        className={`fixed bottom-8 right-8 z-50 transition-opacity duration-300 ${showScrollTop ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
        <button 
          onClick={scrollToTop}
          className="bg-slate-900 text-white p-4 rounded-full shadow-2xl hover:bg-slate-800 transition-colors border border-white/10"
        >
          <ArrowUp size={24} />
        </button>
      </div>
    </section>
  );
};

export default Hero;