import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Users, Briefcase, Settings, Zap, Shield, UserCheck, MessageCircle } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

const CAR_DATA = {
  id: 'toyota-agya',
  name: 'Toyota Agya',
  category: 'City Car',
  price: 'Rp 250.000',
  description: 'Toyota Agya adalah pilihan sempurna untuk mobilitas perkotaan yang padat. Dengan dimensi compact, konsumsi bahan bakar yang sangat efisien, dan manuver yang lincah, mobil ini ideal untuk pasangan muda, perjalanan dinas singkat, atau sekadar berkeliling kota dengan penuh gaya.',
  images: [
    'https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fd?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&q=80'
  ],
  specs: [
    { icon: Users, label: 'Tempat Duduk', value: '4 Kursi' },
    { icon: Briefcase, label: 'Bagasi', value: '2 Koper' },
    { icon: Settings, label: 'Transmisi', value: 'Automatic' },
    { icon: Zap, label: 'Bahan Bakar', value: 'Bensin' },
    { icon: Shield, label: 'Asuransi', value: 'Termasuk' },
    { icon: UserCheck, label: 'Pengemudi', value: 'Lepas Kunci / Supir' },
  ]
};

const DetailArmada = () => {
  const { id } = useParams();
  const [activeImage, setActiveImage] = useState(0);

  // In a real app, you would fetch real data based on the ID.
  const car = CAR_DATA; // Mock data for now

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Breadcrumb Context */}
      <div className="bg-slate-50 border-b border-slate-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center text-sm text-slate-500">
          <Link to="/" className="hover:text-slate-900 transition-colors">Beranda</Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <Link to="/armada" className="hover:text-slate-900 transition-colors">Armada</Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="text-slate-900 font-medium">{car.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Column (Image Gallery) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="space-y-4"
        >
          {/* Main Image */}
          <div className="aspect-4/3 rounded-2xl overflow-hidden border border-slate-100 bg-slate-50 relative group">
            <img 
              src={car.images[activeImage]} 
              alt={car.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          {/* Thumbnails */}
          <div className="grid grid-cols-4 gap-4">
            {car.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(idx)}
                className={`aspect-4/3 rounded-xl overflow-hidden border-2 transition-all ${
                  activeImage === idx 
                    ? 'border-slate-900 ring-4 ring-slate-900/10' 
                    : 'border-transparent hover:border-slate-300'
                }`}
              >
                <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </motion.div>

        {/* Right Column (Specs & Action) */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col"
        >
          <span className="inline-block px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm font-medium mb-4 w-fit">
            {car.category}
          </span>
          <h1 className="text-4xl font-bold text-slate-900 mb-2">{car.name}</h1>
          <div className="flex items-baseline gap-2 mb-8 border-b border-slate-100 pb-8">
            <span className="text-3xl font-bold text-slate-900">{car.price}</span>
            <span className="text-slate-500">/ hari</span>
          </div>

          {/* Specs Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 gap-6 mb-8">
            {car.specs.map((spec, idx) => {
              const Icon = spec.icon;
              return (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">{spec.label}</p>
                    <p className="font-medium text-slate-900">{spec.value}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Description */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Tentang Kendaraan Ini</h3>
            <p className="text-slate-600 leading-relaxed">
              {car.description}
            </p>
          </div>

          <div className="mt-auto space-y-4">
            {/* Assurance Box */}
            <div className="bg-slate-50 rounded-xl p-4 flex items-start gap-3 border border-slate-100">
              <Shield className="w-6 h-6 text-slate-700 shrink-0 mt-0.5" />
              <p className="text-sm text-slate-700 leading-relaxed">
                Kendaraan selalu <span className="font-semibold">divakum, dicuci, dan disinfeksi total</span> sebelum penyerahan kunci kepada pelanggan.
              </p>
            </div>

            {/* CTA Button */}
            <a
              href={`https://wa.me/6281234567890?text=Halo%20Rent%20%26%20Go,%20saya%20tertarik%20untuk%20menyewa%20${car.name}.%20Apakah%20unitnya%20tersedia?`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-xl py-4 flex items-center justify-center gap-2 font-semibold transition-all hover:shadow-lg hover:shadow-slate-900/20 active:scale-[0.98]"
            >
              <MessageCircle className="w-5 h-5" />
              Booking Kendaraan Ini
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DetailArmada;
