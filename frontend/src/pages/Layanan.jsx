import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronRight, Key, Map, Plane, UserCheck } from 'lucide-react';
import { services } from '../data/services';
import Button from '../components/ui/Button';
import SafeImage from '../components/ui/SafeImage';
import SectionHeader from '../components/ui/SectionHeader';

const serviceIcons = {
  key: Key,
  userCheck: UserCheck,
  map: Map,
  plane: Plane,
};

const Layanan = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const currentService = services[currentSlide];

  useEffect(() => {
    if (shouldReduceMotion) return undefined;

    const timer = window.setInterval(() => {
      setCurrentSlide((previous) => (previous + 1) % services.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, [shouldReduceMotion]);

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="relative h-[70vh] min-h-[32rem] w-full overflow-hidden bg-slate-950">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentService.slug}
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.6 }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${currentService.image})` }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 z-10 bg-linear-to-b from-slate-950/45 via-slate-900/65 to-slate-950/95" />

        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-4 pt-12 text-center sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={`text-${currentService.slug}`}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? undefined : { opacity: 0, y: -12 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.4 }}
              className="max-w-4xl"
            >
              <h1 className="mb-6 text-4xl font-extrabold leading-tight text-white drop-shadow-xl md:text-5xl lg:text-6xl">
                {currentService.shortTitle}
              </h1>
              <p className="mx-auto max-w-2xl text-lg font-light text-slate-200 drop-shadow-md md:text-xl">
                {currentService.heroDescription}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="absolute bottom-12 flex gap-3" aria-label="Pilih slide layanan">
            {services.map((service, index) => (
              <button
                key={service.slug}
                type="button"
                onClick={() => setCurrentSlide(index)}
                className={`h-2.5 rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 ${
                  currentSlide === index
                    ? 'w-8 bg-white'
                    : 'w-2.5 bg-white/40 hover:bg-white/70'
                }`}
                aria-label={`Tampilkan layanan ${service.title}`}
                aria-current={currentSlide === index ? 'true' : undefined}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Layanan Perjalanan Rent & Go"
            description="Temukan kendaraan dan layanan perjalanan Anda dalam satu tempat, dengan proses yang jelas dan mudah."
            className="mb-16"
          />

          <div className="flex flex-col gap-12">
            {services.map((service, index) => {
              const Icon = serviceIcons[service.icon];

              return (
                <motion.article
                  key={service.slug}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{
                    duration: shouldReduceMotion ? 0 : 0.4,
                    delay: shouldReduceMotion ? 0 : index * 0.05,
                  }}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-[0_16px_36px_-20px_rgba(15,23,42,0.28)] md:flex-row"
                >
                  <div className="relative h-64 overflow-hidden md:h-auto md:w-5/12">
                    <SafeImage
                      src={service.image}
                      alt={service.imageAlt}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                    <div className="absolute left-4 top-4 z-20 rounded-xl bg-white/90 p-3 text-slate-900 shadow-lg backdrop-blur-sm">
                      <Icon size={24} aria-hidden="true" />
                    </div>
                  </div>

                  <div className="flex flex-col justify-center p-8 md:w-7/12 lg:p-12">
                    <h2 className="mb-4 text-2xl font-bold text-slate-900 lg:text-3xl">
                      {service.title}
                    </h2>
                    <p className="mb-8 leading-relaxed text-slate-500">
                      {service.description}
                    </p>
                    <Button
                      to={`/layanan/${service.slug}`}
                      className="w-fit rounded-xl"
                    >
                      Pelajari Lebih Lanjut
                      <ChevronRight size={18} aria-hidden="true" />
                    </Button>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Layanan;
