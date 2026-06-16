import carPlaceholder from '../assets/car-placeholder.svg';

const createFallbackImages = (name) => [
  {
    src: carPlaceholder,
    alt: `${name} tampak depan Rent & Go`,
  },
  {
    src: carPlaceholder,
    alt: `${name} tampak samping Rent & Go`,
  },
  {
    src: carPlaceholder,
    alt: `${name} bagian interior Rent & Go`,
  },
  {
    src: carPlaceholder,
    alt: `${name} tampak belakang Rent & Go`,
  },
];

export const cars = [
  {
    id: 1,
    slug: 'toyota-agya',
    name: 'Toyota Agya',
    category: 'City Car',
    transmission: 'Automatic',
    price: 250000,
    priceLabel: 'Rp 250.000',
    rating: 4.9,
    image: carPlaceholder,
    imageAlt: 'Toyota Agya Rent & Go',
    images: createFallbackImages('Toyota Agya'),
    seats: 4,
    luggage: 1,
    fuel: 'Bensin',
    description:
      'Toyota Agya cocok untuk mobilitas dalam kota. Ukurannya ringkas, mudah dikendarai, dan nyaman untuk perjalanan harian.',
    features: ['AC', 'Audio', 'Airbag', 'Unit terawat'],
    featured: true,
    whatsappMessage:
      'Halo Rent & Go, saya ingin menyewa Toyota Agya. Apakah unit tersedia?',
  },
  {
    id: 2,
    slug: 'toyota-avanza',
    name: 'Toyota Avanza',
    category: 'MPV',
    transmission: 'AT / MT',
    price: 300000,
    priceLabel: 'Rp 300.000',
    rating: 4.8,
    image: carPlaceholder,
    imageAlt: 'Toyota Avanza Rent & Go',
    images: createFallbackImages('Toyota Avanza'),
    seats: 7,
    luggage: 2,
    fuel: 'Bensin',
    description:
      'Toyota Avanza menawarkan kabin lega dan fleksibel untuk perjalanan keluarga, kegiatan bisnis, maupun perjalanan luar kota.',
    features: ['AC', 'Audio', 'Kabin lega', 'Unit terawat'],
    featured: true,
    whatsappMessage:
      'Halo Rent & Go, saya ingin menyewa Toyota Avanza. Apakah unit tersedia?',
  },
  {
    id: 3,
    slug: 'honda-hrv',
    name: 'Honda HR-V',
    category: 'SUV',
    transmission: 'Automatic',
    price: 450000,
    priceLabel: 'Rp 450.000',
    rating: 4.8,
    image: carPlaceholder,
    imageAlt: 'Honda HR-V Rent & Go',
    images: createFallbackImages('Honda HR-V'),
    seats: 5,
    luggage: 3,
    fuel: 'Bensin',
    description:
      'Honda HR-V memadukan kenyamanan, posisi berkendara tinggi, dan ruang bagasi yang praktis untuk perjalanan dalam maupun luar kota.',
    features: ['AC digital', 'Audio', 'Kamera parkir', 'Unit terawat'],
    featured: true,
    whatsappMessage:
      'Halo Rent & Go, saya ingin menyewa Honda HR-V. Apakah unit tersedia?',
  },
  {
    id: 4,
    slug: 'innova-zenix',
    name: 'Innova Zenix',
    category: 'Premium',
    transmission: 'Automatic',
    price: 600000,
    priceLabel: 'Rp 600.000',
    rating: 4.9,
    image: carPlaceholder,
    imageAlt: 'Innova Zenix Rent & Go',
    images: createFallbackImages('Innova Zenix'),
    seats: 7,
    luggage: 3,
    fuel: 'Hybrid',
    description:
      'Innova Zenix memberikan kabin premium, kenyamanan tinggi, dan efisiensi yang cocok untuk perjalanan bisnis maupun keluarga.',
    features: ['AC digital', 'Captain seat', 'Hybrid', 'Kabin premium'],
    featured: false,
    whatsappMessage:
      'Halo Rent & Go, saya ingin menyewa Innova Zenix. Apakah unit tersedia?',
  },
  {
    id: 5,
    slug: 'toyota-alphard',
    name: 'Toyota Alphard',
    category: 'Premium',
    transmission: 'Automatic',
    price: 1500000,
    priceLabel: 'Rp 1.500.000',
    rating: 5,
    image: carPlaceholder,
    imageAlt: 'Toyota Alphard Rent & Go',
    images: createFallbackImages('Toyota Alphard'),
    seats: 7,
    luggage: 4,
    fuel: 'Bensin',
    description:
      'Toyota Alphard menghadirkan kenyamanan kelas premium untuk perjalanan eksekutif, acara khusus, dan kebutuhan transportasi VIP.',
    features: ['Captain seat', 'Dual AC', 'Power door', 'Kabin premium'],
    featured: false,
    whatsappMessage:
      'Halo Rent & Go, saya ingin menyewa Toyota Alphard. Apakah unit tersedia?',
  },
  {
    id: 6,
    slug: 'toyota-hiace',
    name: 'Toyota Hiace',
    category: 'Microbus',
    transmission: 'Manual',
    price: 900000,
    priceLabel: 'Rp 900.000',
    rating: 4.9,
    image: carPlaceholder,
    imageAlt: 'Toyota Hiace Rent & Go',
    images: createFallbackImages('Toyota Hiace'),
    seats: 14,
    luggage: 5,
    fuel: 'Diesel',
    description:
      'Toyota Hiace cocok untuk perjalanan rombongan dengan kabin luas, susunan kursi nyaman, dan kapasitas bagasi yang memadai.',
    features: ['AC kabin', 'Audio', 'Kabin luas', 'Bagasi rombongan'],
    featured: false,
    whatsappMessage:
      'Halo Rent & Go, saya ingin menyewa Toyota Hiace. Apakah unit tersedia?',
  },
];

export const featuredCars = cars.filter((car) => car.featured);

export const carCategories = [
  'Semua',
  ...new Set(cars.map((car) => car.category)),
];

export const getCarBySlug = (slug) =>
  cars.find((car) => car.slug === slug);
