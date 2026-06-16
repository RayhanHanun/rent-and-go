import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Briefcase,
  ChevronRight,
  Fuel,
  MessageCircle,
  Settings,
  ShieldCheck,
  Star,
  Users,
} from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { getCarBySlug } from '../data/cars';
import { carsApi } from '../api/carsApi';
import { normalizeCar } from '../api/normalizers';
import { getWhatsAppUrl } from '../utils/whatsapp';
import Button from '../components/ui/Button';
import SafeImage from '../components/ui/SafeImage';

const DetailArmada = () => {
  const { slug } = useParams();
  const [car, setCar] = useState(() => getCarBySlug(slug));
  const [isLoading, setIsLoading] = useState(true);
  const shouldReduceMotion = useReducedMotion();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    let isMounted = true;

    queueMicrotask(() => {
      if (isMounted) {
        setIsLoading(true);
        setActiveImageIndex(0);
      }
    });

    carsApi
      .publicDetail(slug)
      .then((response) => {
        if (isMounted) {
          setCar(response.data ? normalizeCar(response.data) : null);
        }
      })
      .catch(() => {
        if (isMounted) {
          setCar(getCarBySlug(slug) || null);
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
            Memuat armada...
          </p>
        </div>
      </section>
    );
  }

  if (!car) {
    return (
      <section className="flex min-h-[65vh] items-center bg-slate-50 px-4 py-20 text-center">
        <div className="mx-auto max-w-xl">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-slate-500">
            Armada tidak ditemukan
          </p>
          <h1 className="mb-4 text-4xl font-extrabold text-slate-900">
            Kendaraan yang Anda cari belum tersedia.
          </h1>
          <p className="mb-8 text-slate-600">
            Silakan kembali ke katalog untuk melihat pilihan armada lainnya.
          </p>
          <Button to="/armada" size="lg">
            Kembali ke Armada
          </Button>
        </div>
      </section>
    );
  }

  const specs = [
    { icon: Users, label: 'Tempat Duduk', value: `${car.seats} kursi` },
    { icon: Briefcase, label: 'Bagasi', value: `${car.luggage} bagasi` },
    { icon: Settings, label: 'Transmisi', value: car.transmission },
    { icon: Fuel, label: 'Bahan Bakar', value: car.fuel },
  ];
  const galleryImages =
    car.images?.length > 0
      ? car.images
      : [{ src: car.image, alt: car.imageAlt }];
  const activeImage = galleryImages[activeImageIndex] ?? galleryImages[0];

  return (
    <div className="min-h-screen bg-white">
      <nav
        aria-label="Breadcrumb"
        className="border-b border-slate-200 bg-slate-50 py-4"
      >
        <ol className="mx-auto flex max-w-7xl items-center px-4 text-sm text-slate-500 sm:px-6 lg:px-8">
          <li>
            <Link
              to="/"
              className="rounded-sm transition-colors duration-200 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
            >
              Beranda
            </Link>
          </li>
          <ChevronRight className="mx-2 h-4 w-4" aria-hidden="true" />
          <li>
            <Link
              to="/armada"
              className="rounded-sm transition-colors duration-200 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
            >
              Armada
            </Link>
          </li>
          <ChevronRight className="mx-2 h-4 w-4" aria-hidden="true" />
          <li className="truncate font-medium text-slate-900" aria-current="page">
            {car.name}
          </li>
        </ol>
      </nav>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:px-8">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.45 }}
          className="space-y-4"
        >
          <div className="aspect-4/3 overflow-hidden rounded-2xl border border-slate-100 bg-slate-50">
            <SafeImage
              src={activeImage.src}
              alt={activeImage.alt}
              className="h-full w-full object-cover"
            />
          </div>
          <div
            className="flex gap-3 overflow-x-auto pb-2"
            aria-label={`Galeri foto ${car.name}`}
          >
            {galleryImages.map((image, index) => {
              const isActive = activeImageIndex === index;

              return (
                <button
                  key={`${image.alt}-${index}`}
                  type="button"
                  onClick={() => setActiveImageIndex(index)}
                  aria-label={`Lihat foto ${image.alt}`}
                  aria-current={isActive ? 'true' : undefined}
                  className={`h-20 w-28 shrink-0 overflow-hidden rounded-xl border-2 bg-slate-50 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 sm:h-24 sm:w-32 ${
                    isActive
                      ? 'border-slate-900 ring-4 ring-slate-900/10'
                      : 'border-transparent hover:border-slate-300'
                  }`}
                >
                  <SafeImage
                    src={image.src}
                    alt={image.alt}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </button>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.45,
            delay: shouldReduceMotion ? 0 : 0.1,
          }}
          className="flex flex-col"
        >
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
              {car.category}
            </span>
            <span className="flex items-center gap-1 text-sm font-semibold text-slate-700">
              <Star size={16} className="fill-amber-400 text-amber-400" aria-hidden="true" />
              {car.rating.toFixed(1)}
            </span>
          </div>

          <h1 className="mb-2 text-4xl font-bold text-slate-900">{car.name}</h1>
          <div className="mb-8 flex items-baseline gap-2 border-b border-slate-100 pb-8">
            <span className="text-3xl font-bold text-slate-900">{car.priceLabel}</span>
            <span className="text-slate-500">/ hari</span>
          </div>

          <div className="mb-8 grid grid-cols-2 gap-6">
            {specs.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-50 text-slate-600">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">{label}</p>
                  <p className="font-medium text-slate-900">{value}</p>
                </div>
              </div>
            ))}
          </div>

          <section className="mb-8">
            <h2 className="mb-2 text-lg font-semibold text-slate-900">
              Tentang Kendaraan Ini
            </h2>
            <p className="leading-relaxed text-slate-600">{car.description}</p>
          </section>

          <section className="mb-8">
            <h2 className="mb-3 text-lg font-semibold text-slate-900">Fasilitas</h2>
            <ul className="grid grid-cols-2 gap-3 text-sm text-slate-700">
              {car.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2">
                  <ShieldCheck size={17} className="text-slate-500" aria-hidden="true" />
                  {feature}
                </li>
              ))}
            </ul>
          </section>

          <div className="mt-auto space-y-4">
            <div className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50 p-4">
              <ShieldCheck className="mt-0.5 h-6 w-6 shrink-0 text-slate-700" aria-hidden="true" />
              <p className="text-sm leading-relaxed text-slate-700">
                Armada diperiksa dan dibersihkan sebelum digunakan pelanggan.
              </p>
            </div>
            <Button
              href={getWhatsAppUrl(car.whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              size="lg"
              className="w-full rounded-xl"
            >
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              Sewa Mobil Ini
            </Button>
            <Button
              to="/armada"
              variant="outline"
              size="lg"
              className="w-full rounded-xl"
            >
              Lihat Armada Lainnya
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DetailArmada;
