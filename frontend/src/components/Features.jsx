import React from 'react';
import { motion } from 'framer-motion';
import { Car, Clock, ShieldCheck, Tag } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <Car className="w-8 h-8 text-blue-600" />,
      title: "Banyak pilihan mobil",
      description: "Mulai dari City Car yang lincah hingga Luxury SUV untuk kenyamanan keluarga Anda."
    },
    {
      icon: <Clock className="w-8 h-8 text-blue-600" />,
      title: "Proses booking cepat",
      description: "Hanya butuh 5 menit untuk memesan kendaraan impian Anda lewat platform digital kami."
    },
    {
      icon: <Tag className="w-8 h-8 text-blue-600" />,
      title: "Harga transparan",
      description: "Tidak ada biaya tersembunyi. Harga yang Anda lihat adalah harga yang Anda bayar."
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-blue-600" />,
      title: "Aman & terpercaya",
      description: "Seluruh unit kami telah melewati pengecekan rutin dan dilindungi asuransi komprehensif."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <section className="bg-slate-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Kenapa Pilih Rent & Go?</h2>
          <p className="text-lg text-slate-500">
            Kami berkomitmen memberikan pelayanan terbaik dengan armada terawat dan harga yang transparan.
          </p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300 ease-in-out"
            >
              <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">{feature.title}</h3>
              <p className="text-slate-500 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
