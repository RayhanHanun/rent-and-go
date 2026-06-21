import { Briefcase, ChevronRight, Fuel, Settings, Star, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from './ui/Button';
import SafeImage from './ui/SafeImage';

const CarCard = ({ car }) => (
  <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-[0_16px_36px_-20px_rgba(15,23,42,0.28)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_45px_-22px_rgba(15,23,42,0.38)]">
    <Link
      to={`/armada/${car.slug}`}
      className="relative block h-52 overflow-hidden bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-slate-900"
      aria-label={`Lihat detail ${car.name}`}
    >
      <SafeImage
        src={car.image}
        alt={car.imageAlt}
        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
      />
      <span className="absolute right-4 top-4 rounded-lg bg-white/95 px-3 py-1.5 text-xs font-bold text-slate-900 shadow-sm backdrop-blur-sm">
        {car.category}
      </span>
    </Link>

    <div className="flex grow flex-col p-6">
      <div className="mb-2 flex items-start justify-between gap-4">
        <Link
          to={`/armada/${car.slug}`}
          className="rounded-sm text-xl font-bold text-slate-900 transition-colors duration-200 hover:text-slate-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
        >
          {car.name}
        </Link>
        <span className="flex shrink-0 items-center gap-1 text-sm font-semibold text-slate-700">
          <Star size={16} className="fill-amber-400 text-amber-400" aria-hidden="true" />
          {car.rating.toFixed(1)}
        </span>
      </div>

      <p className="mb-5 text-xl font-extrabold text-slate-900">
        {car.priceLabel}
        <span className="text-sm font-normal text-slate-500"> / hari</span>
      </p>

      <div className="mb-6 grid grid-cols-4 rounded-xl border border-slate-100 bg-slate-50 px-2 py-3 text-center">
        <div className="flex flex-col items-center gap-1 border-r border-slate-200 text-slate-600">
          <Users size={16} className="text-slate-400" aria-hidden="true" />
          <span className="text-[10px] font-medium">{car.seats} kursi</span>
        </div>
        <div className="flex flex-col items-center gap-1 border-r border-slate-200 text-slate-600">
          <Settings size={16} className="text-slate-400" aria-hidden="true" />
          <span className="text-[10px] font-medium">{car.transmission}</span>
        </div>
        <div className="flex flex-col items-center gap-1 border-r border-slate-200 text-slate-600">
          <Briefcase size={16} className="text-slate-400" aria-hidden="true" />
          <span className="text-[10px] font-medium">{car.luggage} bagasi</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-slate-600">
          <Fuel size={16} className="text-slate-400" aria-hidden="true" />
          <span className="text-[10px] font-medium">{car.fuel}</span>
        </div>
      </div>

      <div className="mt-auto">
        <Button
          to={`/armada/${car.slug}`}
          size="md"
          className="w-full rounded-xl"
        >
          Lihat Detail
          <ChevronRight size={16} aria-hidden="true" />
        </Button>
      </div>
    </div>
  </article>
);

export default CarCard;
