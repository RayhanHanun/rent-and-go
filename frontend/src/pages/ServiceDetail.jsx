import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Briefcase,
  Clock,
  Key,
  Map,
  MapPin,
  MessageCircle,
  Navigation,
  Plane,
  ShieldCheck,
  Sparkles,
  Tag,
  UserCheck,
} from 'lucide-react';
import { useParams } from 'react-router-dom';
import CarCard from '../components/CarCard';
import Button from '../components/ui/Button';
import { cars as localCars } from '../data/cars';
import { carsApi } from '../api/carsApi';
import { normalizeCar, normalizeService } from '../api/normalizers';
import { getServiceBySlug } from '../data/services';
import { servicesApi } from '../api/servicesApi';
import { getWhatsAppUrl } from '../utils/whatsapp';

const icons = {
  briefcase: Briefcase,
  clock: Clock,
  key: Key,
  map: Map,
  mapPin: MapPin,
  navigation: Navigation,
  plane: Plane,
  shield: ShieldCheck,
  sparkles: Sparkles,
  tag: Tag,
  userCheck: UserCheck,
};

const ServiceDetail = () => {
  const { slug } = useParams();
  const [service, setService] = useState(() => getServiceBySlug(slug));
  const [cars, setCars] = useState(localCars);
  const [isLoading, setIsLoading] = useState(true);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    let isMounted = true;

    queueMicrotask(() => {
      if (isMounted) {
        setIsLoading(true);
      }
    });

    Promise.all([servicesApi.publicDetail(slug), carsApi.publicList()])
      .then(([serviceResponse, carsResponse]) => {
        if (!isMounted) return;

        setService(serviceResponse.data ? normalizeService(serviceResponse.data) : null);
        setCars(Array.isArray(carsResponse.data) ? carsResponse.data.map(normalizeCar) : localCars);
      })
      .catch(() => {
        if (isMounted) {
          setService(getServiceBySlug(slug) || null);
          setCars(localCars);
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
  }, [slug]);

  if (isLoading) {
    return (
      <section className="flex min-h-[65vh] items-center bg-slate-50 px-4 py-20 text-center">
        <div className="mx-auto max-w-xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
            Memuat layanan...
          </p>
        </div>
      </section>
    );
  }

  if (!service) {
    return (
      <section className="flex min-h-[65vh] items-center bg-slate-50 px-4 py-20 text-center">
        <div className="mx-auto max-w-xl">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-slate-500">
            Layanan tidak ditemukan
          </p>
          <h1 className="mb-4 text-4xl font-extrabold text-slate-900">
            Halaman layanan yang Anda cari tidak tersedia.
          </h1>
          <Button to="/layanan" size="lg">
            Kembali ke Layanan
          </Button>
        </div>
      </section>
    );
  }

  const serviceCars = service.vehicleSlugs
    .map((carSlug) => cars.find((car) => car.slug === carSlug))
    .filter(Boolean);

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="relative flex min-h-[50vh] items-center justify-center overflow-hidden bg-slate-950">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${service.image})` }}
        />
        <div className="absolute inset-0 bg-linear-to-b from-slate-950/65 via-slate-900/75 to-slate-950/95" />
        <div className="relative z-10 mx-auto mt-6 max-w-3xl px-4 text-center">
          <motion.h1
            initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.5 }}
            className="mb-6 text-4xl font-extrabold text-white drop-shadow-lg md:text-5xl lg:text-6xl"
          >
            {service.title}
          </motion.h1>
          <motion.p
            initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.5,
              delay: shouldReduceMotion ? 0 : 0.1,
            }}
            className="text-lg font-light leading-relaxed text-slate-300 md:text-xl"
          >
            {service.heroDescription}
          </motion.p>
        </div>
      </section>

      <section className="relative z-20 -mt-8 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {service.benefits.map((benefit, index) => {
              const Icon = icons[benefit.icon];

              return (
                <motion.article
                  key={benefit.title}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: shouldReduceMotion ? 0 : 0.4,
                    delay: shouldReduceMotion ? 0 : index * 0.06,
                  }}
                  className="rounded-2xl border border-slate-100 bg-white p-8 shadow-[0_16px_36px_-20px_rgba(15,23,42,0.28)]"
                >
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-slate-50 text-slate-900">
                    <Icon size={28} aria-hidden="true" />
                  </div>
                  <h2 className="mb-3 text-xl font-bold text-slate-900">
                    {benefit.title}
                  </h2>
                  <p className="leading-relaxed text-slate-500">
                    {benefit.description}
                  </p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="pb-20 pt-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 border-l-4 border-slate-900 pl-4">
            <h2 className="mb-3 text-3xl font-bold text-slate-900">
              {service.vehicleHeading}
            </h2>
            <p className="max-w-2xl text-slate-500">
              {service.vehicleDescription}
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {serviceCars.map((car) => (
              <CarCard key={car.slug} car={car} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-slate-100 bg-white py-20">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="mb-5 text-3xl font-bold text-slate-900">
            Konsultasikan Kebutuhan Perjalanan Anda
          </h2>
          <p className="mx-auto mb-8 max-w-xl leading-relaxed text-slate-500">
            Tim Rent & Go siap membantu memilih kendaraan dan layanan yang sesuai.
          </p>
          <Button
            href={getWhatsAppUrl(service.whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            size="lg"
          >
            <MessageCircle size={21} aria-hidden="true" />
            {service.ctaLabel}
          </Button>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetail;
