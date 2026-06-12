import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Key, UserCheck, Map, Plane } from 'lucide-react';

const CAROUSEL_SLIDES = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=2670&auto=format&fit=crop',
    title: 'Kebebasan Lepas Kunci',
    subtitle: 'Pilih kendaraan yang tepat dan mulai perjalananmu dengan lebih nyaman.'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2670&auto=format&fit=crop',
    title: 'Perjalanan Nyaman dengan Pengemudi',
    subtitle: 'Nikmati perjalanan lebih tenang dengan layanan pengemudi sesuai kebutuhanmu.'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2621&auto=format&fit=crop',
    title: 'Paket Tour untuk Perjalananmu',
    subtitle: 'Temukan kendaraan dan layanan perjalanan yang kamu butuhkan dalam satu tempat.'
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2674&auto=format&fit=crop',
    title: 'Antar-Jemput Bandara Tanpa Ribet',
    subtitle: 'Proses cepat dan layanan tepat waktu untuk perjalanan dari atau menuju bandara.'
  }
];

const SERVICES_DATA = [
  {
    id: 'lepas-kunci',
    title: "Sewa Mobil Lepas Kunci",
    description: "Pilih armada mobil terbaru sesuai kebutuhanmu dan nikmati perjalanan dengan lebih leluasa. Proses booking cepat dan harga transparan membuat perjalananmu bisa dimulai tanpa ribet.",
    icon: Key,
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1500&auto=format&fit=crop",
    link: "/layanan/lepas-kunci"
  },
  {
    id: 'dengan-pengemudi',
    title: "Sewa Mobil dengan Pengemudi",
    description: "Nikmati perjalanan lebih nyaman dengan kendaraan yang tepat dan layanan pengemudi sesuai kebutuhanmu. Booking dalam satu aplikasi untuk perjalanan dalam maupun luar kota.",
    icon: UserCheck,
    image: "https://images.unsplash.com/photo-1616422285623-13ff0162193c?q=80&w=1500&auto=format&fit=crop",
    link: "/layanan/dengan-pengemudi"
  },
  {
    id: 'paket-tour',
    title: "Layanan Paket Tour Wisata",
    description: "Temukan kebutuhan kendaraan dan layanan perjalanan wisata dalam satu tempat. Pilih paket tour, lakukan booking, dan mulai perjalananmu tanpa ribet.",
    icon: Map,
    image: "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?q=80&w=1500&auto=format&fit=crop",
    link: "/layanan/paket-tour"
  },
  {
    id: 'bandara',
    title: "Layanan Antar-Jemput Bandara",
    description: "Atur perjalanan dari atau menuju bandara dengan proses cepat dan kendaraan yang tepat. Harga transparan dan layanan tepat waktu membantu perjalanan Anda lebih nyaman.",
    icon: Plane,
    image: "https://images.unsplash.com/photo-1542282088-fe8426682b8f?q=80&w=1500&auto=format&fit=crop",
    link: "/layanan/bandara"
  }
];

const Layanan = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Carousel Section */}
      <section className="relative w-full h-[70vh] bg-slate-950 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${CAROUSEL_SLIDES[currentSlide].image})` }}
          />
        </AnimatePresence>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-b from-slate-950/40 via-slate-900/60 to-slate-950/90 z-10" />

        {/* Text Content */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 mt-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={`text-${currentSlide}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="max-w-4xl"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight drop-shadow-xl">
                {CAROUSEL_SLIDES[currentSlide].title}
              </h1>
              <p className="text-lg md:text-xl text-slate-200 font-light max-w-2xl mx-auto drop-shadow-md">
                {CAROUSEL_SLIDES[currentSlide].subtitle}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Slide Indicators */}
          <div className="absolute bottom-12 flex gap-3">
            {CAROUSEL_SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${
                  currentSlide === idx ? "w-8 bg-white" : "bg-white/40 hover:bg-white/70"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Services 1-Column List Section */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Perjalanan Asik Dimulai dari Jasa yang Menarik.</h2>
            <div className="w-16 h-1 bg-slate-900 mx-auto rounded-full mb-6"></div>
            <p className="text-slate-500 max-w-2xl mx-auto">
              Kenapa harus ribet cari kendaraan di banyak tempat? Temukan semua yang kamu butuhkan dalam satu aplikasi.
            </p>
          </div>

          <div className="flex flex-col gap-16">
            {SERVICES_DATA.map((service, idx) => (
              <motion.div 
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="bg-white rounded-3xl overflow-hidden shadow-[0_15px_30px_-5px_rgba(0,0,0,0.05)] border border-slate-100 flex flex-col md:flex-row group"
              >
                {/* Image Column */}
                <div className="md:w-5/12 relative h-64 md:h-auto overflow-hidden">
                  <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-3 rounded-2xl shadow-lg z-20 text-slate-900">
                    <service.icon size={24} strokeWidth={2.5} />
                  </div>
                </div>

                {/* Text Content Column */}
                <div className="md:w-7/12 p-8 lg:p-12 flex flex-col justify-center">
                  <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-4 group-hover:text-slate-700 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-slate-500 mb-8 leading-relaxed">
                    {service.description}
                  </p>
                  <div className="mt-auto pointer-events-auto">
                    <button 
                      onClick={() => navigate(service.link)}
                      className="bg-slate-900 text-white px-6 py-3.5 rounded-xl font-medium hover:bg-slate-800 transition-colors flex items-center gap-2 w-fit group/btn"
                    >
                      Pelajari Lebih Lanjut 
                      <ChevronRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
};

export default Layanan;
