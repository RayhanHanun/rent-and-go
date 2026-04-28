import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Settings, Briefcase, Fuel, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CATEGORIES = ['Semua', 'City Car', 'SUV', 'Premium', 'Microbus'];

const CARS = [
  {
    id: 1,
    name: 'Toyota Agya',
    category: 'City Car',
    price: 'Rp 250.000',
    image: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?q=80&w=1500&auto=format&fit=crop',
    specs: { seats: '4', trans: 'Automatic', luggage: '1', fuel: 'Bensin' }
  },
  {
    id: 2,
    name: 'Toyota Avanza',
    category: 'SUV',
    price: 'Rp 300.000',
    image: 'https://plus.unsplash.com/premium_photo-1661338573175-10acb650fbdf?q=80&w=1500&auto=format&fit=crop',
    specs: { seats: '7', trans: 'AT / MT', luggage: '2', fuel: 'Bensin' }
  },
  {
    id: 3,
    name: 'Honda HR-V',
    category: 'SUV',
    price: 'Rp 450.000',
    image: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?q=80&w=1500&auto=format&fit=crop',
    specs: { seats: '5', trans: 'Automatic', luggage: '3', fuel: 'Bensin' }
  },
  {
    id: 4,
    name: 'Innova Zenix',
    category: 'Premium',
    price: 'Rp 600.000',
    image: 'https://images.unsplash.com/photo-1549921296-3a6b3923f0d9?q=80&w=1500&auto=format&fit=crop',
    specs: { seats: '7', trans: 'Automatic', luggage: '3', fuel: 'Hybrid' }
  },
  {
    id: 5,
    name: 'Toyota Alphard',
    category: 'Premium',
    price: 'Rp 1.500.000',
    image: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?q=80&w=1500&auto=format&fit=crop',
    specs: { seats: '7', trans: 'Automatic', luggage: '4', fuel: 'Bensin' }
  },
  {
    id: 6,
    name: 'Toyota Hiace',
    category: 'Microbus',
    price: 'Rp 900.000',
    image: 'https://images.unsplash.com/photo-1551830820-330a71b99659?q=80&w=1500&auto=format&fit=crop',
    specs: { seats: '14', trans: 'Manual', luggage: '5', fuel: 'Diesel' }
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
};

const Armada = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('Semua');

  const filteredCars = activeCategory === 'Semua'
    ? CARS
    : CARS.filter(car => car.category === activeCategory);

  return (
    <div className="bg-slate-50 min-h-screen">
      
      {/* Hero Section */}
      <section className="relative min-h-[40vh] bg-slate-900 pb-20 pt-20 flex flex-col items-center justify-center text-center px-4 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-overlay"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1493238792000-8113da705763?q=80&w=2670&auto=format&fit=crop')" }}
        />
        <div className="relative z-10 max-w-3xl mx-auto mt-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 drop-shadow-lg"
          >
            Koleksi Armada Premium Kami
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg md:text-xl text-slate-300 font-light leading-relaxed"
          >
            Temukan kendaraan sempurna untuk setiap perjalanan Anda. Tersedia berbagai pilihan mulai dari city car hingga bus pariwisata.
          </motion.p>
        </div>
      </section>

      {/* Category Filter Bar */}
      <section className="bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="bg-white rounded-2xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] p-2 border border-slate-100 flex items-center w-full gap-4 overflow-x-auto whitespace-nowrap hide-scrollbar justify-start md:overflow-visible md:justify-between">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
                className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 flex items-center justify-center md:flex-1 md:text-center shrink-0 ${
                activeCategory === cat
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'bg-transparent text-slate-500 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              {cat}
            </button>
          ))}
          </div>
        </div>
      </section>

      {/* Vehicle Grid Section */}
      <section className="pt-0 pb-16 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              variants={containerVariants}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredCars.map((car) => (
                <motion.div
                  key={car.id}
                  variants={itemVariants}
                  className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] hover:-translate-y-1 transition-transform duration-300 group flex flex-col cursor-pointer"
                  onClick={() => navigate(`/armada/${car.id}`)}
                >
                  {/* Image Container */}
                  <div className="h-56 overflow-hidden relative bg-slate-100">
                    <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/10 transition-colors z-10 duration-300" />
                    <img
                      src={car.image}
                      alt={car.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs font-bold text-slate-900 z-20 shadow-sm">
                      {car.category}
                    </div>
                  </div>

                  {/* Content Container */}
                  <div className="p-6 grow flex flex-col">
                    <h3 className="text-2xl font-bold text-slate-900 mb-1">{car.name}</h3>
                    <p className="text-slate-900 font-extrabold text-xl mb-6">
                      Mulai {car.price} <span className="text-sm font-normal text-slate-500">/ hari</span>
                    </p>

                    {/* Specs Grid */}
                    <div className="grid grid-cols-4 gap-2 mb-8 bg-slate-50 py-3 px-2 rounded-xl border border-slate-100">
                      <div className="flex flex-col items-center justify-center text-center text-slate-600 gap-1 border-r border-slate-200">
                        <Users size={16} className="text-slate-400" />
                        <span className="text-[10px] font-medium">{car.specs.seats}</span>
                      </div>
                      <div className="flex flex-col items-center justify-center text-center text-slate-600 gap-1 border-r border-slate-200">
                        <Settings size={16} className="text-slate-400" />
                        <span className="text-[10px] font-medium">{car.specs.trans}</span>
                      </div>
                      <div className="flex flex-col items-center justify-center text-center text-slate-600 gap-1 border-r border-slate-200">
                        <Briefcase size={16} className="text-slate-400" />
                        <span className="text-[10px] font-medium">{car.specs.luggage}</span>
                      </div>
                      <div className="flex flex-col items-center justify-center text-center text-slate-600 gap-1">
                        <Fuel size={16} className="text-slate-400" />
                        <span className="text-[10px] font-medium">{car.specs.fuel}</span>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="mt-auto pt-2 border-t border-slate-50">
                      <button className="w-full flex items-center justify-between text-slate-900 font-bold group/btn py-2">
                        <span>Lihat Detail</span>
                        <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover/btn:bg-slate-900 group-hover/btn:text-white transition-colors duration-300">
                          <ChevronRight size={16} />
                        </div>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredCars.length === 0 && (
            <div className="text-center py-20 text-slate-500">
              Kategori armada ini belum tersedia saat ini.
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Armada;
