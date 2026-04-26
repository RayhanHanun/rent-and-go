import React from 'react';
import { motion } from 'framer-motion';
import { UserCheck, MapPin, ShieldCheck, Users, Wallet, Map, MessageCircle, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BENEFITS_DATA = [
  {
    icon: UserCheck,
    title: 'Driver Berpengalaman',
    desc: 'Ramah, profesional, dan hafal rute terbaik.'
  },
  {
    icon: MapPin,
    title: 'Bebas Lelah & Nyasar',
    desc: 'Nikmati perjalanan tanpa perlu memikirkan navigasi atau kemacetan.'
  },
  {
    icon: ShieldCheck,
    title: 'Jaminan Aman & Nyaman',
    desc: 'Standar pelayanan VIP untuk keamanan maksimal.'
  }
];

const VEHICLES_DATA = [
  {
    id: 1,
    name: 'Toyota Innova Reborn',
    category: 'MPV Executive',
    price: 'Rp 600.000',
    image: 'https://images.unsplash.com/photo-1592853625511-adf1f9f6f4f5?q=80&w=1500&auto=format&fit=crop',
    specs: { seats: '7 Kursi', includes: 'Mobil+Driver', area: 'Dalam Kota' }
  },
  {
    id: 2,
    name: 'Toyota Innova Zenix',
    category: 'Hybrid MPV',
    price: 'Rp 600.000',
    image: 'https://images.unsplash.com/photo-1549921296-3a6b3923f0d9?q=80&w=1500&auto=format&fit=crop',
    specs: { seats: '7 Kursi', includes: 'Mobil+Driver', area: 'Dalam Kota' }
  },
  {
    id: 3,
    name: 'Toyota Alphard',
    category: 'Luxury MPV',
    price: 'Rp 600.000',
    image: 'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?q=80&w=1500&auto=format&fit=crop',
    specs: { seats: '7 Kursi', includes: 'Mobil+Driver', area: 'Dalam Kota' }
  },
  {
    id: 4,
    name: 'Toyota Camry',
    category: 'Executive Sedan',
    price: 'Rp 600.000',
    image: 'https://images.unsplash.com/photo-1542282088-fe8426682b8f?q=80&w=1500&auto=format&fit=crop',
    specs: { seats: '5 Kursi', includes: 'Mobil+Driver', area: 'Dalam Kota' }
  },
  {
    id: 5,
    name: 'Hyundai Staria',
    category: 'Premium Van',
    price: 'Rp 600.000',
    image: 'https://images.unsplash.com/photo-1551830820-330a71b99659?q=80&w=1500&auto=format&fit=crop',
    specs: { seats: '9 Kursi', includes: 'Mobil+Driver', area: 'Dalam Kota' }
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

const LayananDenganPengemudi = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-slate-50 min-h-screen">
      
      {/* Hero Section */}
      <section className="relative w-full h-[50vh] bg-slate-950 flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?q=80&w=2670&auto=format&fit=crop')` }}
        />
        <div className="absolute inset-0 bg-linear-to-b from-slate-950/60 via-slate-900/70 to-slate-950/95 mix-blend-multiply" />

        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto mt-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 drop-shadow-lg"
          >
            Perjalanan Eksklusif & Bebas Stres
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg md:text-xl text-slate-300 font-light leading-relaxed"
          >
            Duduk santai dan nikmati perjalanan. Driver profesional kami siap melayani Anda.
          </motion.p>
        </div>
      </section>

      {/* Benefits Grid Section */}
      <section className="py-20 -mt-8 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {BENEFITS_DATA.map((benefit, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 55 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + idx * 0.1 }}
                className="bg-white p-8 rounded-2xl border border-slate-100 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] hover:-translate-y-1 transition-transform duration-300"
              >
                <div className="w-14 h-14 bg-slate-50 text-slate-900 rounded-2xl flex items-center justify-center mb-6">
                  <benefit.icon size={28} strokeWidth={2} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{benefit.title}</h3>
                <p className="text-slate-500 leading-relaxed">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Vehicle Grid Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4 border-l-4 border-slate-900 pl-4">Pilihan Armada dengan Pengemudi</h2>
            <p className="text-slate-500 max-w-2xl">
              Armada premium lengkap dengan driver profesional untuk perjalanan kota yang nyaman, aman, dan tepat waktu.
            </p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-50px' }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {VEHICLES_DATA.map((car) => (
              <motion.div
                key={car.id}
                variants={itemVariants}
                className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-[0_15px_30px_-5px_rgba(0,0,0,0.05)] group flex flex-col"
              >
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

                <div className="p-6 grow flex flex-col">
                  <h3 className="text-2xl font-bold text-slate-900 mb-1">{car.name}</h3>
                  <p className="text-slate-900 font-extrabold text-xl mb-6">
                    Mulai {car.price} <span className="text-sm font-normal text-slate-500">/ 12 Jam</span>
                  </p>

                  <div className="grid grid-cols-3 gap-2 mb-8 bg-slate-50 py-3 px-2 rounded-xl border border-slate-100">
                    <div className="flex flex-col items-center justify-center text-center text-slate-600 gap-1">
                      <Users size={18} className="text-slate-400" />
                      <span className="text-[11px] font-medium">{car.specs.seats}</span>
                    </div>
                    <div className="flex flex-col items-center justify-center text-center text-slate-600 gap-1 border-x border-slate-200">
                      <Wallet size={18} className="text-slate-400" />
                      <span className="text-[11px] font-medium">{car.specs.includes}</span>
                    </div>
                    <div className="flex flex-col items-center justify-center text-center text-slate-600 gap-1">
                      <Map size={18} className="text-slate-400" />
                      <span className="text-[11px] font-medium">{car.specs.area}</span>
                    </div>
                  </div>

                  <div className="mt-auto">
                    <button
                      onClick={() => navigate('/fleet')}
                      className="w-full py-3.5 bg-white border-2 border-slate-900 text-slate-900 rounded-xl font-bold hover:bg-slate-900 hover:text-white transition-colors duration-300 flex items-center justify-center gap-2 group/btn"
                    >
                      Sewa Sekarang
                      <ChevronRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Modern Minimalist CTA */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Butuh rute luar kota?</h2>
          <p className="text-slate-500 mb-10 max-w-xl mx-auto">
            Konsultasikan kebutuhan perjalanan Anda bersama tim kami untuk opsi rute, durasi, dan paket layanan terbaik.
          </p>
          <a
            href="https://wa.me/628123456789"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 bg-slate-900 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-slate-800 transition-colors shadow-xl shadow-slate-900/20"
          >
            <MessageCircle size={24} />
            Hubungi Admin via WhatsApp
          </a>
        </div>
      </section>
    </div>
  );
};

export default LayananDenganPengemudi;
