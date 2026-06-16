import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { featuredCars } from '../data/cars';
import CarCard from './CarCard';
import Button from './ui/Button';
import SectionHeader from './ui/SectionHeader';

const CarList = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Armada Pilihan untuk Perjalanan Anda"
          description="Temukan pilihan kendaraan terawat yang nyaman, fleksibel, dan siap menemani kebutuhan perjalanan Anda."
          className="mb-12"
        />

        <motion.div
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
          initial={shouldReduceMotion ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: shouldReduceMotion ? 0 : 0.08,
              },
            },
          }}
        >
          {featuredCars.map((car) => (
            <motion.div
              key={car.slug}
              variants={{
                hidden: { y: shouldReduceMotion ? 0 : 16, opacity: 0 },
                visible: { y: 0, opacity: 1 },
              }}
            >
              <CarCard car={car} />
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-12 flex justify-center">
          <Button to="/armada" size="lg">
            Lihat Semua Armada
            <ArrowRight size={20} aria-hidden="true" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CarList;
