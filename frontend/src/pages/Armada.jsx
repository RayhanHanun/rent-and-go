import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { cars, carCategories } from '../data/cars';
import CarCard from '../components/CarCard';

const Armada = () => {
  const [activeCategory, setActiveCategory] = useState('Semua');
  const shouldReduceMotion = useReducedMotion();
  const filteredCars =
    activeCategory === 'Semua'
      ? cars
      : cars.filter((car) => car.category === activeCategory);

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="relative flex min-h-[40vh] items-center justify-center overflow-hidden bg-slate-950 px-4 py-20 text-center">
        <div className="absolute inset-0 bg-linear-to-br from-slate-950 via-slate-900 to-slate-700" />
        <div className="relative z-10 mx-auto mt-6 max-w-3xl">
          <motion.h1
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.6 }}
            className="mb-6 text-4xl font-extrabold text-white drop-shadow-lg md:text-5xl lg:text-6xl"
          >
            Armada untuk Setiap Perjalanan
          </motion.h1>
          <motion.p
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.6,
              delay: shouldReduceMotion ? 0 : 0.1,
            }}
            className="text-lg font-light leading-relaxed text-slate-300 md:text-xl"
          >
            Pilih kendaraan terawat dengan informasi harga dan fasilitas yang jelas.
          </motion.p>
        </div>
      </section>

      <section aria-label="Filter kategori armada">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid w-full grid-cols-2 gap-3 rounded-2xl border border-slate-100 bg-white p-2 shadow-[0_16px_36px_-20px_rgba(15,23,42,0.25)] sm:grid-cols-3 lg:flex lg:flex-wrap lg:justify-center">
            {carCategories.map((category) => {
              const isActive = activeCategory === category;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  aria-pressed={isActive}
                  className={`flex min-h-12 w-full items-center justify-center rounded-xl px-4 py-3 text-center text-sm font-bold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 sm:text-base lg:w-auto lg:min-w-36 lg:px-6 ${
                    isActive
                      ? 'bg-slate-900 text-white shadow-md'
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="pb-20 pt-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.25 }}
              className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
            >
              {filteredCars.map((car) => (
                <CarCard key={car.slug} car={car} />
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredCars.length === 0 && (
            <div className="py-20 text-center text-slate-500" role="status">
              Kategori armada ini belum tersedia.
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Armada;
