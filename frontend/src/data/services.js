import { getServiceHeroImage } from '../utils/serviceHeroImages';

export const services = [
  {
    slug: 'lepas-kunci',
    title: 'Sewa Mobil Lepas Kunci',
    shortTitle: 'Kebebasan Lepas Kunci',
    description:
      'Pilih kendaraan sesuai kebutuhan Anda dan nikmati perjalanan dengan lebih leluasa. Proses pemesanan cepat dan harga transparan.',
    heroDescription:
      'Nikmati perjalanan lebih nyaman dengan armada terawat, proses cepat, dan harga transparan untuk setiap perjalanan Anda.',
    heroImage: getServiceHeroImage('lepas-kunci'),
    image: getServiceHeroImage('lepas-kunci'),
    imageAlt: 'Layanan sewa mobil lepas kunci Rent & Go',
    icon: 'key',
    benefits: [
      {
        icon: 'shield',
        title: 'Privasi Terjaga',
        description: 'Nikmati perjalanan bersama orang terdekat dengan lebih leluasa.',
      },
      {
        icon: 'clock',
        title: 'Waktu Fleksibel',
        description: 'Atur jadwal perjalanan sesuai waktu yang Anda butuhkan.',
      },
      {
        icon: 'sparkles',
        title: 'Unit Terawat',
        description: 'Setiap kendaraan diperiksa dan dibersihkan sebelum digunakan.',
      },
    ],
    vehicleSlugs: ['toyota-agya', 'toyota-avanza', 'honda-hrv'],
    vehicleHeading: 'Pilihan Armada Lepas Kunci',
    vehicleDescription:
      'Pilih kendaraan yang terawat dan sesuai dengan kebutuhan perjalanan Anda.',
    ctaLabel: 'Konsultasi Sewa Lepas Kunci',
    whatsappMessage:
      'Halo Rent & Go, saya ingin berkonsultasi tentang layanan sewa mobil lepas kunci.',
  },
  {
    slug: 'dengan-pengemudi',
    title: 'Sewa Mobil dengan Pengemudi',
    shortTitle: 'Perjalanan Nyaman dengan Pengemudi',
    description:
      'Nikmati perjalanan yang lebih tenang bersama pengemudi berpengalaman untuk kebutuhan dalam maupun luar kota.',
    heroDescription:
      'Layanan kendaraan dan pengemudi berpengalaman untuk perjalanan yang nyaman, aman, dan tepat waktu.',
    heroImage: getServiceHeroImage('driver'),
    image: getServiceHeroImage('driver'),
    imageAlt: 'Layanan sewa mobil dengan pengemudi Rent & Go',
    icon: 'userCheck',
    benefits: [
      {
        icon: 'userCheck',
        title: 'Pengemudi Berpengalaman',
        description: 'Perjalanan Anda didampingi pengemudi yang profesional.',
      },
      {
        icon: 'mapPin',
        title: 'Perjalanan Lebih Praktis',
        description: 'Anda tidak perlu memikirkan navigasi, parkir, dan rute.',
      },
      {
        icon: 'shield',
        title: 'Aman dan Nyaman',
        description: 'Armada terawat dan layanan disesuaikan dengan kebutuhan Anda.',
      },
    ],
    vehicleSlugs: ['toyota-avanza', 'innova-zenix', 'toyota-alphard'],
    vehicleHeading: 'Pilihan Armada dengan Pengemudi',
    vehicleDescription:
      'Tentukan armada yang sesuai untuk perjalanan bisnis, keluarga, atau acara khusus.',
    ctaLabel: 'Konsultasi dengan Pengemudi',
    whatsappMessage:
      'Halo Rent & Go, saya ingin berkonsultasi tentang layanan mobil dengan pengemudi.',
  },
  {
    slug: 'paket-tour',
    title: 'Layanan Paket Tour Wisata',
    shortTitle: 'Paket Tour untuk Perjalanan Anda',
    description:
      'Rencanakan perjalanan wisata keluarga atau rombongan dengan kendaraan dan layanan yang tersedia dalam satu tempat.',
    heroDescription:
      'Konsultasikan tujuan, durasi, dan kebutuhan rombongan Anda bersama tim Rent & Go.',
    heroImage: getServiceHeroImage('paket-tour'),
    image: getServiceHeroImage('paket-tour'),
    imageAlt: 'Layanan paket tour wisata Rent & Go',
    icon: 'map',
    benefits: [
      {
        icon: 'map',
        title: 'Rute Fleksibel',
        description: 'Destinasi dan jadwal dapat disesuaikan dengan rencana perjalanan.',
      },
      {
        icon: 'navigation',
        title: 'Pendamping Perjalanan',
        description: 'Pengemudi membantu perjalanan wisata tetap nyaman dan terarah.',
      },
      {
        icon: 'tag',
        title: 'Harga Transparan',
        description: 'Rincian layanan dijelaskan sebelum perjalanan dimulai.',
      },
    ],
    vehicleSlugs: ['toyota-avanza', 'innova-zenix', 'toyota-hiace'],
    vehicleHeading: 'Pilihan Armada Paket Tour',
    vehicleDescription:
      'Armada tersedia untuk perjalanan pribadi, keluarga, hingga rombongan.',
    ctaLabel: 'Konsultasi Paket Tour',
    whatsappMessage:
      'Halo Rent & Go, saya ingin berkonsultasi tentang layanan paket tour wisata.',
  },
  {
    slug: 'bandara',
    title: 'Layanan Antar-Jemput Bandara',
    shortTitle: 'Antar-Jemput Bandara Tanpa Ribet',
    description:
      'Atur perjalanan dari atau menuju bandara dengan kendaraan yang nyaman dan jadwal penjemputan yang jelas.',
    heroDescription:
      'Proses cepat, harga transparan, dan layanan tepat waktu untuk perjalanan dari atau menuju bandara.',
    heroImage: getServiceHeroImage('bandara'),
    image: getServiceHeroImage('bandara'),
    imageAlt: 'Layanan antar-jemput bandara Rent & Go',
    icon: 'plane',
    benefits: [
      {
        icon: 'clock',
        title: 'Penjemputan Tepat Waktu',
        description: 'Jadwal penjemputan disesuaikan dengan kebutuhan perjalanan Anda.',
      },
      {
        icon: 'briefcase',
        title: 'Bantuan Bagasi',
        description: 'Perjalanan lebih praktis dengan ruang bagasi sesuai kebutuhan.',
      },
      {
        icon: 'plane',
        title: 'Jadwal Fleksibel',
        description: 'Tim kami membantu menyesuaikan perubahan jadwal penerbangan.',
      },
    ],
    vehicleSlugs: ['toyota-avanza', 'innova-zenix', 'toyota-hiace'],
    vehicleHeading: 'Pilihan Armada Bandara',
    vehicleDescription:
      'Pilih armada untuk perjalanan pribadi, keluarga, atau rombongan.',
    ctaLabel: 'Reservasi Antar-Jemput Bandara',
    whatsappMessage:
      'Halo Rent & Go, saya ingin berkonsultasi tentang layanan antar-jemput bandara.',
  },
];

const serviceSlugAliases = {
  driver: 'dengan-pengemudi',
};

export const getServiceBySlug = (slug) => {
  const resolvedSlug = serviceSlugAliases[slug] || slug;

  return services.find((service) => service.slug === resolvedSlug);
};
