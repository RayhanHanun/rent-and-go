import { motion, useReducedMotion } from 'framer-motion';
import { Star } from 'lucide-react';
import SectionHeader from './ui/SectionHeader';

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
  const shouldReduceMotion = useReducedMotion();
  const displayedTestimonials = shouldReduceMotion
    ? testimonials
    : duplicatedTestimonials;

  return (
    <section className="bg-white py-24 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeader
          title="Apa Kata Pelanggan Kami?"
          description="Pengalaman pelanggan dalam menggunakan armada dan layanan Rent & Go."
          className="mb-10"
        />
      </div>

      <div
        className={`group relative flex ${
          shouldReduceMotion ? 'overflow-x-auto px-4' : 'overflow-hidden'
        }`}
      >
        {/* Left Fade Overlay */}
        <div className="absolute top-0 bottom-0 left-0 w-16 sm:w-32 bg-linear-to-r from-white to-transparent z-10 pointer-events-none" />

        {/* Marquee Track */}
        <motion.div 
          className="flex gap-6 w-max items-center pr-6 py-16"
          animate={shouldReduceMotion ? undefined : { x: ['0%', '-50%'] }}
          transition={
            shouldReduceMotion
              ? undefined
              : { repeat: Infinity, ease: 'linear', duration: 25 }
          }
        >
          {displayedTestimonials.map((testimonial, index) => (
            <div 
              key={`${testimonial.name}-${index}`}
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
                  <h3 className="font-bold text-slate-900">{testimonial.name}</h3>
                  <p className="text-sm text-slate-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Right Fade Overlay */}
        <div className="pointer-events-none absolute bottom-0 right-0 top-0 z-10 w-16 bg-linear-to-l from-white to-transparent sm:w-32" />
      </div>

    </section>
  );
};

export default Testimonials;
