import { motion, useReducedMotion } from 'framer-motion';
import { Search, CalendarDays, CheckCircle } from 'lucide-react';
import SectionHeader from './ui/SectionHeader';

const steps = [
  {
    icon: Search,
    title: 'Pilih Mobil',
    description: 'Temukan kendaraan yang sesuai dengan kebutuhan perjalanan Anda.',
  },
  {
    icon: CalendarDays,
    title: 'Tentukan Jadwal',
    description: 'Sampaikan tanggal, durasi, dan lokasi perjalanan kepada tim kami.',
  },
  {
    icon: CheckCircle,
    title: 'Konfirmasi Pemesanan',
    description: 'Konfirmasikan ketersediaan dan mulai perjalanan Anda dengan nyaman.',
  },
];

const HowItWorks = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="bg-slate-50 py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          title="Cara Kerja Rent & Go"
          description="Temukan semua kebutuhan perjalanan Anda dalam satu tempat."
          className="mb-16"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center relative">
          
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-[28px] left-[15%] right-[15%] h-px bg-slate-300 border-t border-dashed border-slate-300 z-0"></div>

          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
            <motion.div 
              key={step.title}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.4,
                delay: shouldReduceMotion ? 0 : index * 0.1,
              }}
              viewport={{ once: true }}
              className="relative z-10 flex flex-col items-center"
            >
              <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center shadow-lg shadow-slate-900/30 mb-6 transition-transform">
                <Icon className="h-8 w-8 text-white" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
              <p className="text-slate-500 leading-relaxed max-w-sm">{step.description}</p>
            </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
