import React from 'react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    name: "Budi Santoso",
    role: "Business Traveler",
    initials: "BS",
    text: "Rent & Go sangat membantu perjalanan dinas saya. Mobil dalam kondisi prima dan bersih. Sangat direkomendasikan!"
  },
  {
    name: "Sari Wijaya",
    role: "Entrepreneur",
    initials: "SW",
    text: "Pilihan armadanya sangat beragam dan mewah. Cocok untuk menjemput klien penting. Pelayanannya benar-benar bintang lima."
  },
  {
    name: "Andi Pratama",
    role: "Family Traveler",
    initials: "AP",
    text: "Sewa SUV untuk liburan keluarga, prosesnya cepat tanpa ribet dan harga sangat transparan. Pasti akan sewa di sini lagi."
  }
];

const Testimonials = () => {
  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Apa Kata Pengguna Kami?</h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            Kepercayaan pelanggan adalah prioritas kami. Simak pengalaman mereka bersama Rent & Go.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="bg-slate-50 rounded-2xl p-8 border border-slate-100 hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300 ease-in-out"
            >
              <div className="flex gap-1 mb-6">
                {[1, 2, 3, 4, 5].map(star => (
                   <span key={star} className="text-yellow-400 text-2xl drop-shadow-sm">★</span>
                ))}
              </div>
              
              <p className="text-slate-600 mb-8 italic leading-relaxed">"{testimonial.text}"</p>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-lg border border-blue-200">
                  {testimonial.initials}
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900">{testimonial.name}</h4>
                  <p className="text-sm text-slate-500">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Testimonials;
