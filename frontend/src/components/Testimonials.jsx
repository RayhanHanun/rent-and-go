import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: "Budi Santoso",
    role: "Pelaku Perjalanan Bisnis",
    initials: "BS",
    text: "Pilihan mobilnya sesuai kebutuhan perjalanan dinas saya. Proses booking cepat dan tidak ribet."
  },
  {
    name: "Sari Wijaya",
    role: "Wirausaha",
    initials: "SW",
    text: "Pilihan armadanya beragam dan nyaman. Harga yang ditampilkan juga transparan sejak awal."
  },
  {
    name: "Andi Pratama",
    role: "Pelaku Perjalanan Keluarga",
    initials: "AP",
    text: "Kami menemukan SUV untuk perjalanan keluarga dalam satu tempat. Booking cepat dan perjalanannya nyaman."
  },
  {
    name: "Maya Indah",
    role: "Blogger Perjalanan",
    initials: "MI",
    text: "Mobilnya nyaman dan proses pemesanannya mudah. Rencana perjalanan jadi lebih praktis."
  },
  {
    name: "Rizky Darmawan",
    role: "Eksekutif Perusahaan",
    initials: "RD",
    text: "Dari memilih kendaraan sampai booking, semuanya bisa dilakukan dengan cepat dalam satu platform."
  }
];

const duplicatedTestimonials = [...testimonials, ...testimonials];

const Testimonials = () => {
  return (
    <section className="bg-white py-24 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Apa Kata Pengguna Kami?</h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            Platform rental terpercaya untuk semua kebutuhan perjalananmu.
          </p>
        </div>
      </div>

      <div className="relative flex overflow-hidden group">
        {/* Left Fade Overlay */}
        <div className="absolute top-0 bottom-0 left-0 w-16 sm:w-32 bg-linear-to-r from-white to-transparent z-10 pointer-events-none" />

        {/* Marquee Track */}
        <motion.div 
          className="flex gap-6 w-max items-center pr-6 py-16"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
        >
          {duplicatedTestimonials.map((testimonial, idx) => (
            <div 
              key={idx}
              className="bg-slate-50 border border-slate-100 shadow-lg shadow-slate-200/50 rounded-2xl p-8 w-87.5 shrink-0 transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-2xl hover:shadow-slate-300/60"
            >
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} className="fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              
              <p className="text-slate-600 mb-8 italic leading-relaxed min-h-20">
                "{testimonial.text}"
              </p>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white text-slate-900 font-bold rounded-full flex items-center justify-center text-lg shadow-sm border border-slate-200">
                  {testimonial.initials}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">{testimonial.name}</h4>
                  <p className="text-sm text-slate-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Right Fade Overlay */}
        <div className="absolute top-0 bottom-0 right-0 w-16 sm:w-32 bg-linear-to-l from-slate-50 to-transparent z-10 pointer-events-none" />
      </div>

    </section>
  );
};

export default Testimonials;
