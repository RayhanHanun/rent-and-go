import React from 'react';
import { motion } from 'framer-motion';
import { Map, UserCheck, Plane, Key, ChevronRight } from 'lucide-react';

const SERVICES_DATA = [
  {
    id: 1,
    title: "Paket Tour Wisata",
    description: "Liburan bebas repot dengan paket komplit termasuk pengemudi profesional, BBM, dan biaya parkir untuk menjelajahi destinasi wisata terbaik dengan nyaman.",
    icon: Map,
    delay: 0.1
  },
  {
    id: 2,
    title: "Sewa dengan Pengemudi",
    description: "Nikmati perjalanan VIP tanpa stres. Pengemudi kami yang ramah dan berpengalaman siap mengantar Anda ke tempat tujuan dengan aman dan tepat waktu.",
    icon: UserCheck,
    delay: 0.2
  },
  {
    id: 3,
    title: "Antar-Jemput Bandara",
    description: "Layanan penjemputan VIP di area kedatangan bandara yang selalu tepat waktu. Kami memastikan Anda tidak pernah menunggu lama setelah penerbangan yang melelahkan.",
    icon: Plane,
    delay: 0.3
  },
  {
    id: 4,
    title: "Sewa Lepas Kunci",
    description: "Rasakan privasi dan kebebasan mengemudi mobil premium pilihan Anda sendiri. Nikmati proses verifikasi dokumen yang mudah, cepat, dan transparan.",
    icon: Key,
    delay: 0.4
  }
];

const Layanan = () => {
  return (
    <section className="pt-24 pb-20 min-h-screen bg-slate-50 relative overflow-hidden">
      {/* Background Soft Gradients */}
      <div className="absolute top-0 right-0 w-96 h-96 filter blur-3xl bg-blue-100 rounded-full opacity-50 z-0 translate-x-1/3 -translate-y-1/4"></div>
      <div className="absolute bottom-0 left-0 w-125 h-125 filter blur-3xl bg-slate-200 rounded-full opacity-40 z-0 -translate-x-1/4 translate-y-1/3"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
              Layanan <span className="text-blue-600">Unggulan</span> Kami
            </h1>
            <p className="text-lg text-slate-500 leading-relaxed">
              Sebagai mitra mobilitas Anda, Rent & Go menghadirkan solusi transportasi total yang dirancang untuk memberikan kenyamanan ekstra pada setiap kebutuhan pribadi maupun bisnis Anda.
            </p>
          </motion.div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SERVICES_DATA.map((service) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: service.delay, ease: "easeOut" }}
              className="bg-white rounded-2xl p-10 lg:p-12 border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-blue-900/10 hover:-translate-y-2 transition-all duration-300 group flex flex-col"
            >
              {/* Icon Container */}
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                <service.icon className="w-8 h-8" />
              </div>
              
              {/* Text Content */}
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                {service.title}
              </h3>
              <p className="text-slate-500 leading-relaxed mb-8 grow">
                {service.description}
              </p>
              
              {/* CTA Button */}
              <div className="mt-auto border-t border-slate-50 pt-6">
                <button className="flex items-center text-blue-600 font-semibold group/btn hover:text-blue-700 transition-colors">
                  Konsultasi Sekarang
                  <ChevronRight className="w-5 h-5 ml-1 inline-block group-hover/btn:translate-x-1.5 transition-transform duration-300" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Layanan;