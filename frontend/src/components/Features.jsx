import { motion, useReducedMotion } from 'framer-motion';
import { Car, Clock, ShieldCheck, Tag } from 'lucide-react';
import SectionHeader from './ui/SectionHeader';

const features = [
  {
    icon: Car,
    title: 'Pilihan Armada Lengkap',
    description:
      'Temukan armada terawat yang sesuai dengan kebutuhan perjalanan Anda.',
  },
  {
    icon: Clock,
    title: 'Proses Pemesanan Cepat',
    description:
      'Pilih kendaraan dan konsultasikan jadwal perjalanan Anda tanpa proses yang rumit.',
  },
  {
    icon: Tag,
    title: 'Harga Transparan',
    description:
      'Informasi harga disampaikan dengan jelas sebelum perjalanan dimulai.',
  },
  {
    icon: ShieldCheck,
    title: 'Aman dan Terpercaya',
    description:
      'Armada diperiksa secara rutin untuk mendukung perjalanan yang nyaman.',
  },
];

const Features = () => {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: shouldReduceMotion ? 0 : 0.08 }
    }
  };

  const itemVariants = {
    hidden: { y: shouldReduceMotion ? 0 : 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <section className="bg-slate-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Kenapa Pilih Rent & Go?"
          description="Armada terawat, informasi harga yang jelas, dan layanan yang siap membantu perjalanan Anda."
          className="mb-16"
        />

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial={shouldReduceMotion ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
            <motion.article
              key={feature.title}
              variants={itemVariants}
              className="rounded-2xl border border-slate-100 bg-white p-8 shadow-[0_16px_36px_-20px_rgba(15,23,42,0.25)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_45px_-22px_rgba(15,23,42,0.35)]"
            >
              <div className="w-16 h-16 bg-slate-50 rounded-xl flex items-center justify-center mb-6">
                <Icon className="h-8 w-8 text-slate-900" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">{feature.title}</h3>
              <p className="text-slate-500 leading-relaxed">{feature.description}</p>
            </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
