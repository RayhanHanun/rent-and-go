export const summaryStats = {
  total_cars: 6,
  total_units: 15,
  available_units: 10,
  rented_units: 3,
  scheduled_units: 2,
  maintenance_units: 1,
  late_units: 1,
  inactive_units: 1,
  active_rentals: 4,
  unread_messages: 1,
  estimated_monthly_revenue: 8430000,
  total_rentals_this_month: 28,
  finished_rentals: 18,
  late_rentals: 1,
  maintenance_cost_this_month: 650000,
  active_services: 4,
};

export const monthlyRentals = [
  { month: 'Jul', total: 8 },
  { month: 'Agu', total: 10 },
  { month: 'Sep', total: 9 },
  { month: 'Okt', total: 13 },
  { month: 'Nov', total: 15 },
  { month: 'Des', total: 18 },
  { month: 'Jan', total: 14 },
  { month: 'Feb', total: 17 },
  { month: 'Mar', total: 21 },
  { month: 'Apr', total: 19 },
  { month: 'Mei', total: 24 },
  { month: 'Jun', total: 28 },
];

export const monthlyRevenue = [
  { month: 'Jul', total: 2400000 },
  { month: 'Agu', total: 3150000 },
  { month: 'Sep', total: 2875000 },
  { month: 'Okt', total: 4250000 },
  { month: 'Nov', total: 4800000 },
  { month: 'Des', total: 6200000 },
  { month: 'Jan', total: 4500000 },
  { month: 'Feb', total: 5100000 },
  { month: 'Mar', total: 6850000 },
  { month: 'Apr', total: 6300000 },
  { month: 'Mei', total: 7750000 },
  { month: 'Jun', total: 8430000 },
];

export const fleetStatus = [
  { status: 'available', total: 7 },
  { status: 'rented', total: 3 },
  { status: 'scheduled', total: 2 },
  { status: 'maintenance', total: 1 },
  { status: 'late', total: 1 },
  { status: 'inactive', total: 1 },
];

export const maintenanceCost = [
  { month: 'Jan', total: 450000 },
  { month: 'Feb', total: 300000 },
  { month: 'Mar', total: 750000 },
  { month: 'Apr', total: 500000 },
  { month: 'Mei', total: 1200000 },
  { month: 'Jun', total: 650000 },
];

export const recentActivities = [
  {
    id: 1,
    type: 'rental',
    title: 'Penyewaan baru dibuat',
    description: 'Toyota Avanza AB 1234 CD disewa oleh Budi Santoso.',
    time: '10 menit lalu',
    status: 'scheduled',
  },
  {
    id: 2,
    type: 'maintenance',
    title: 'Unit masuk maintenance',
    description: 'Honda HR-V AB 5678 EF masuk jadwal servis rutin.',
    time: '35 menit lalu',
    status: 'maintenance',
  },
  {
    id: 3,
    type: 'message',
    title: 'Pesan baru dari pelanggan',
    description: 'Calon pelanggan bertanya tentang sewa Hiace untuk wisata.',
    time: '1 jam lalu',
    status: 'new',
  },
  {
    id: 4,
    type: 'payment',
    title: 'DP diterima',
    description: 'Pembayaran DP untuk Toyota Hiace berhasil dicatat.',
    time: '2 jam lalu',
    status: 'dp',
  },
  {
    id: 5,
    type: 'unit',
    title: 'Unit selesai disewa',
    description: 'Toyota Alphard AB 9999 ZZ telah selesai disewa.',
    time: 'Kemarin',
    status: 'finished',
  },
  {
    id: 6,
    type: 'unit',
    title: 'Unit tersedia kembali',
    description: 'Daihatsu Agya AB 2233 KL tersedia kembali untuk booking.',
    time: 'Kemarin',
    status: 'available',
  },
];

export const adminStatsFallback = {
  stats: summaryStats,
  charts: {
    monthly_rentals: monthlyRentals,
    monthly_revenue: monthlyRevenue,
    fleet_status: fleetStatus,
    maintenance_cost: maintenanceCost,
    recent_activities: recentActivities,
  },
};
