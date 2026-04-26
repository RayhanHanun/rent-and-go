import React from 'react';
import { motion } from 'framer-motion';
import { Map, Navigation, Tag, Users, Settings, Wallet, MessageCircle, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BENEFITS_DATA = [
  {
    icon: Map,
    title: 'Itinerary Fleksibel',
    desc: 'Bebas tentukan destinasi wisata sesuai keinginan rombongan.'
  },
  {
    icon: Navigation,
    title: 'Driver Merangkap Guide',
    desc: 'Driver berpengalaman yang bisa merekomendasikan spot terbaik.'
  },
  {
    icon: Tag,
    title: 'Harga All-in Terbaik',
    desc: 'Transparan tanpa biaya tersembunyi selama perjalanan.'
  }
];

const VEHICLES_DATA = [
  {
    id: 1,
    name: 'Toyota Avanza',
    category: 'Family Trip',
    price: 'Rp 750.000',
    image: 'https://plus.unsplash.com/premium_photo-1661338573175-10acb650fbdf?q=80&w=1500&auto=format&fit=crop',
    specs: { capacity: '6 Penumpang', feature: 'AC/Audio', includes: 'All-In' }
  },
  {
    id: 2,
    name: 'Toyota Innova',
    category: 'Comfort MPV',
    price: 'Rp 750.000',
    image: 'https://images.unsplash.com/photo-1549921296-3a6b3923f0d9?q=80&w=1500&auto=format&fit=crop',
    specs: { capacity: '7 Penumpang', feature: 'AC/Audio', includes: 'All-In' }
  },
  {
    id: 3,
    name: 'Hiace Commuter',
    category: 'Group Van',
    price: 'Rp 750.000',
    image: 'https://images.unsplash.com/photo-1551830820-330a71b99659?q=80&w=1500&auto=format&fit=crop',
    specs: { capacity: '14 Penumpang', feature: 'AC/Audio', includes: 'All-In' }
  },
  {
    id: 4,
    name: 'Hiace Premio',
    category: 'Premium Van',
    price: 'Rp 750.000',
    image: 'https://images.unsplash.com/photo-1586483621916-221b03f742fd?q=80&w=1500&auto=format&fit=crop',
    specs: { capacity: '12 Penumpang', feature: 'AC/Audio', includes: 'All-In' }
  },
  {
    id: 5,
    name: 'Elf Long',
    category: 'Big Group',
    price: 'Rp 750.000',
    image: 'https://images.unsplash.com/photo-1570125909517-53cb21c89ff2?q=80&w=1500&auto=format&fit=crop',
    specs: { capacity: '19 Penumpang', feature: 'AC/Audio', includes: 'All-In' }
  },
  {
    id: 6,
    name: 'Medium Bus',
    category: 'Rombongan Besar',
    price: 'Rp 750.000',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1500&auto=format&fit=crop',
    specs: { capacity: '30 Penumpang', feature: 'AC/Audio', includes: 'All-In' }
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

const LayananPaketTour = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[50vh] bg-slate-950 flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?q=80&w=2670&auto=format&fit=crop')` }}
        />
        <div className="absolute inset-0 bg-linear-to-b from-slate-950/60 via-slate-900/70 to-slate-950/95 mix-blend-multiply" />

        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto mt-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 drop-shadow-lg"
          >
            Eksplorasi Keindahan Yogyakarta
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg md:text-xl text-slate-300 font-light leading-relaxed"
          >
            Pilihan armada tour terlengkap untuk liburan tak terlupakan bersama rombongan.
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
            <h2 className="text-3xl font-bold text-slate-900 mb-4 border-l-4 border-slate-900 pl-4">Pilihan Armada Paket Tour</h2>
            <p className="text-slate-500 max-w-2xl">
              Armada lengkap untuk perjalanan wisata keluarga hingga rombongan besar dengan paket layanan all-in yang praktis.
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
                    Mulai {car.price} <span className="text-sm font-normal text-slate-500">/ Hari</span>
                  </p>

                  <div className="grid grid-cols-3 gap-2 mb-8 bg-slate-50 py-3 px-2 rounded-xl border border-slate-100">
                    <div className="flex flex-col items-center justify-center text-center text-slate-600 gap-1">
                      <Users size={18} className="text-slate-400" />
                      <span className="text-[11px] font-medium">{car.specs.capacity}</span>
                    </div>
                    <div className="flex flex-col items-center justify-center text-center text-slate-600 gap-1 border-x border-slate-200">
                      <Settings size={18} className="text-slate-400" />
                      <span className="text-[11px] font-medium">{car.specs.feature}</span>
                    </div>
                    <div className="flex flex-col items-center justify-center text-center text-slate-600 gap-1">
                      <Wallet size={18} className="text-slate-400" />
                      <span className="text-[11px] font-medium">{car.specs.includes}</span>
                    </div>
                  </div>

                  <div className="mt-auto">
                    <button
                      onClick={() => navigate('/fleet')}
                      className="w-full py-3.5 bg-white border-2 border-slate-900 text-slate-900 rounded-xl font-bold hover:bg-slate-900 hover:text-white transition-colors duration-300 flex items-center justify-center gap-2 group/btn"
                    >
                      Booking Tour
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
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Butuh itinerary custom?</h2>
          <p className="text-slate-500 mb-10 max-w-xl mx-auto">
            Konsultasikan rute wisata, durasi, dan kebutuhan rombongan Anda bersama tim kami melalui WhatsApp.
          </p>
          <a
            href="https://wa.me/628123456789"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 bg-slate-900 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-slate-800 transition-colors shadow-xl shadow-slate-900/20"
          >
            <MessageCircle size={24} />
            Konsultasi Itinerary via WhatsApp
          </a>
        </div>
      </section>
    </div>
  );
};

export default LayananPaketTour;
