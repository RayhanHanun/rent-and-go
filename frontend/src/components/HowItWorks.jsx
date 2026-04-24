import React from 'react';
import { motion } from 'framer-motion';
import { Search, CalendarDays, CheckCircle } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: <Search className="w-8 h-8 text-white" />,
      title: "Pilih mobil",
      description: "Pilih kendaraan yang sesuai dengan gaya dan kebutuhan perjalanan Anda dari koleksi premium kami."
    },
    {
      icon: <CalendarDays className="w-8 h-8 text-white" />,
      title: "Tentukan tanggal",
      description: "Atur jadwal sewa yang fleksibel. Pilih lokasi pengambilan dan pengembalian yang nyaman bagi Anda."
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-white" />,
      title: "Booking",
      description: "Selesaikan pembayaran dengan aman, dan mobil Anda siap untuk digunakan."
    }
  ];

  return (
    <section className="bg-slate-50 py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Cara Kerja Rent & Go</h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Proses penyewaan yang simpel, dirancang khusus untuk menghemat waktu Anda tanpa proses yang berbelit.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center relative">
          
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-[28px] left-[15%] right-[15%] h-px bg-slate-300 border-t border-dashed border-slate-300 z-0"></div>

          {steps.map((step, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative z-10 flex flex-col items-center"
            >
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-600/30 mb-6 rotate-3 hover:rotate-0 transition-transform">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
              <p className="text-slate-500 leading-relaxed max-w-sm">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
