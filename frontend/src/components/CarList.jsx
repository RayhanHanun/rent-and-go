import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { carsApi } from '../api/carsApi';
import { normalizeCar } from '../api/normalizers';
import CarCard from './CarCard';
import CarCardSkeleton from './CarCardSkeleton';
import Button from './ui/Button';
import SectionHeader from './ui/SectionHeader';

const CarList = () => {
  const shouldReduceMotion = useReducedMotion();
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasLoadError, setHasLoadError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    Promise.resolve().then(() => {
      if (isMounted) {
        setIsLoading(true);
        setHasLoadError(false);
      }
    });

    carsApi
      .publicFeatured()
      .then((response) => {
        if (isMounted && Array.isArray(response.data) && response.data.length > 0) {
          setItems(response.data.map(normalizeCar));
          setHasLoadError(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setItems([]);
          setHasLoadError(true);
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Armada Pilihan untuk Perjalanan Anda"
          description="Temukan pilihan kendaraan terawat yang nyaman, fleksibel, dan siap menemani kebutuhan perjalanan Anda."
          className="mb-12"
        />

        {isLoading ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3" aria-label="Memuat armada pilihan">
            {Array.from({ length: 3 }).map((_, index) => (
              <CarCardSkeleton key={index} />
            ))}
          </div>
        ) : hasLoadError ? (
          <div className="rounded-2xl border border-slate-100 bg-slate-50 px-6 py-12 text-center text-slate-500" role="status">
            Armada pilihan belum bisa dimuat saat ini.
          </div>
        ) : (
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
            {items.map((car) => (
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
        )}

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
