import carPlaceholder from '../assets/car-placeholder.svg';
import heroImage from '../assets/hero-mobil.jpeg';

export const formatRupiah = (value) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(Number(value || 0));

const normalizeCategoryName = (category) => {
  if (!category) return 'Lainnya';
  if (typeof category === 'string') return category;
  return category.name || 'Lainnya';
};

export const normalizeCar = (car) => {
  const categoryName = normalizeCategoryName(car.category);
  const images = (car.images || [])
    .map((image) => ({
      src: image.src || image.image_url || carPlaceholder,
      alt: image.alt || image.alt_text || `${car.name} Rent & Go`,
    }))
    .filter(Boolean);

  const fallbackImages = images.length > 0
    ? images
    : [
        { src: carPlaceholder, alt: `${car.name} tampak depan Rent & Go` },
        { src: carPlaceholder, alt: `${car.name} tampak samping Rent & Go` },
      ];

  return {
    id: car.id,
    slug: car.slug,
    name: car.name,
    category: categoryName,
    categorySlug: car.category?.slug,
    transmission: car.transmission || '-',
    price: Number(car.price_per_day ?? car.price ?? 0),
    priceLabel: car.priceLabel || formatRupiah(car.price_per_day ?? car.price),
    rating: Number(car.rating || 0),
    image: fallbackImages[0]?.src || carPlaceholder,
    imageAlt: fallbackImages[0]?.alt || `${car.name} Rent & Go`,
    images: fallbackImages,
    seats: car.seats || '-',
    luggage: car.luggage || 2,
    fuel: car.fuel_type || car.fuel || '-',
    description: car.description || car.short_description || '',
    features: car.features || [],
    featured: Boolean(car.is_featured ?? car.featured),
    availableUnitsCount: car.available_units_count ?? 0,
    whatsappMessage:
      car.whatsappMessage ||
      `Halo Rent & Go, saya ingin menyewa ${car.name}. Apakah unit tersedia?`,
  };
};

export const normalizeCategory = (category) => {
  if (typeof category === 'string') {
    return { id: category, name: category, slug: category.toLowerCase().replace(/\s+/g, '-') };
  }

  return category;
};

export const normalizeService = (service) => ({
  ...service,
  title: service.title,
  shortTitle: service.shortTitle || service.title,
  description: service.description || service.short_description || '',
  heroDescription: service.heroDescription || service.description || service.short_description || '',
  image: service.image || service.image_url || heroImage,
  imageAlt: service.imageAlt || `${service.title} Rent & Go`,
  benefits: service.benefits || [
    {
      icon: service.icon || 'shield',
      title: 'Layanan Terarah',
      description: service.short_description || 'Tim Rent & Go membantu menyesuaikan layanan dengan kebutuhan perjalanan Anda.',
    },
    {
      icon: 'clock',
      title: 'Proses Praktis',
      description: 'Konsultasi dan pemesanan dapat dilakukan dengan cepat melalui WhatsApp.',
    },
    {
      icon: 'sparkles',
      title: 'Armada Terawat',
      description: 'Kendaraan diperiksa sebelum digunakan agar perjalanan tetap nyaman.',
    },
  ],
  vehicleSlugs: service.vehicleSlugs || ['toyota-avanza', 'honda-hrv', 'innova-zenix'],
  vehicleHeading: service.vehicleHeading || 'Pilihan Armada Terkait',
  vehicleDescription: service.vehicleDescription || 'Pilih armada yang sesuai dengan kebutuhan perjalanan Anda.',
  ctaLabel: service.ctaLabel || 'Konsultasi Layanan',
  whatsappMessage:
    service.whatsappMessage ||
    `Halo Rent & Go, saya ingin berkonsultasi tentang ${service.title}.`,
});
