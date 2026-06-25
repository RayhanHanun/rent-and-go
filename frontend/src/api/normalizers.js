import carPlaceholder from '../assets/car-placeholder.svg';
import { resolveImageUrl } from './imageUrls';
import { getServiceHeroImage } from '../utils/serviceHeroImages';

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
  const images = (Array.isArray(car.images) ? car.images : [])
    .map((image) => ({
      id: image.id,
      src: resolveImageUrl(image.image_url || image.src || image.url || image.image_path, ''),
      alt: image.alt || image.alt_text || `${car.name} Rent & Go`,
      angle: image.angle,
      isPrimary: Boolean(image.is_primary ?? image.isPrimary),
      sortOrder: image.sort_order ?? image.sortOrder ?? 0,
    }))
    .filter((image) => Boolean(image.src));

  const primaryImage = images.find((image) => image.isPrimary);
  const primaryImageUrl = resolveImageUrl(car.primary_image_url || car.primaryImageUrl || '');
  const mainImage = primaryImageUrl
    ? {
        src: primaryImageUrl,
        alt: car.primary_image_alt || `${car.name} Rent & Go`,
        isPrimary: true,
        sortOrder: -1,
      }
    : primaryImage || images[0];

  const orderedImages = mainImage
    ? [
        mainImage,
        ...images.filter((image) => image.src !== mainImage.src),
      ]
    : images;

  const fallbackImages = orderedImages.length > 0
    ? orderedImages
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
    image: primaryImageUrl || primaryImage?.src || images[0]?.src || carPlaceholder,
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

export const normalizeService = (service) => {
  const serviceImage = getServiceHeroImage(service.slug || service.title);

  return {
    ...service,
    title: service.title,
    shortTitle: service.shortTitle || service.title,
    description: service.description || service.short_description || '',
    heroDescription: service.heroDescription || service.description || service.short_description || '',
    heroImage: serviceImage,
    image: serviceImage,
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
  };
};
