import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="bg-white overflow-hidden py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
          
          {/* Left Text Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12 lg:mb-0"
          >
            <div className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 font-semibold text-sm mb-6 tracking-wide uppercase">
              PREMIUM CAR RENTAL
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight mb-6">
              Sewa Mobil Jadi Lebih <span className="text-blue-600">Praktis</span> dengan Rent & Go
            </h1>
            
            <p className="text-lg sm:text-xl text-slate-500 mb-8 max-w-2xl">
              Nikmati perjalanan tanpa hambatan dengan pilihan armada mobil premium terbaru. Proses cepat, harga transparan, dan layanan bintang lima.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-blue-600 text-white px-8 py-3.5 rounded-md font-semibold text-lg hover:bg-blue-700 transition-all shadow-md shadow-blue-600/20 flex items-center justify-center gap-2">
                Sewa Sekarang <ArrowRight size={20} />
              </button>
              <button className="bg-white text-slate-700 border-2 border-slate-200 px-8 py-3.5 rounded-md font-semibold text-lg hover:border-slate-300 hover:bg-slate-50 transition-all flex items-center justify-center">
                Lihat Armada
              </button>
            </div>
          </motion.div>

          {/* Right Visual Content */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative lg:h-[500px] w-full rounded-2xl bg-zinc-900 overflow-hidden shadow-2xl flex items-center justify-center"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-zinc-900 via-zinc-800 to-zinc-900 opacity-80" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
            
            {/* Contextual Placeholder for Mercedes G-Class */}
            <div className="relative z-10 text-center p-8">
              <p className="text-zinc-500 text-sm font-medium tracking-widest uppercase mb-2">Featured Vehicle</p>
              <h3 className="text-zinc-200 text-2xl font-bold mb-6">Mercedes-Benz G-Class</h3>
              <div className="w-full max-w-sm mx-auto h-48 border-2 border-dashed border-zinc-700 rounded-lg flex items-center justify-center text-zinc-600 bg-zinc-800/50 backdrop-blur-sm">
                [ Stunning G-Class Imagine Here ]
              </div>
            </div>
            
          </motion.div>
          
        </div>
      </div>
    </section>
  );
};

export default Hero;
