import { useEffect, useMemo, useState } from 'react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {
  Activity,
  CalendarCheck,
  Car,
  CircleDollarSign,
  Mail,
  MessageSquareText,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';
import { dashboardApi } from '../../api/dashboardApi';
import { adminStatsFallback } from '../../data/adminStats';
import AdminPageHeader from '../components/AdminPageHeader';
import ChartCard from '../components/ChartCard';
import StatsCard from '../components/StatsCard';
import StatusBadge from '../components/StatusBadge';
import { formatCurrency, formatDate } from '../utils/formatters';

const chartColors = {
  available: '#059669',
  rented: '#1d4ed8',
  maintenance: '#d97706',
  inactive: '#64748b',
  late: '#e11d48',
  scheduled: '#f59e0b',
};

const statusLabels = {
  available: 'Tersedia',
  rented: 'Disewa',
  maintenance: 'Maintenance',
  inactive: 'Nonaktif',
  late: 'Terlambat',
  scheduled: 'Dijadwalkan',
};

const normalizeMonth = (month) => {
  if (!month) return '-';
  const monthMap = {
    '01': 'Jan',
    '02': 'Feb',
    '03': 'Mar',
    '04': 'Apr',
    '05': 'Mei',
    '06': 'Jun',
    '07': 'Jul',
    '08': 'Agu',
    '09': 'Sep',
    10: 'Okt',
    11: 'Nov',
    12: 'Des',
  };
  const value = String(month);
  const parts = value.split('-');

  return monthMap[parts.at(-1)] || value;
};

const normalizeSeries = (items = []) =>
  items.map((item) => ({
    ...item,
    monthLabel: normalizeMonth(item.month),
    total: Number(item.total || 0),
  }));

const usableArray = (apiItems, fallbackItems, minimumLength = 1) =>
  Array.isArray(apiItems) && apiItems.length >= minimumLength ? apiItems : fallbackItems;

const ActivityIcon = ({ status }) => {
  const icons = {
    rented: Car,
    scheduled: CalendarCheck,
    new: Mail,
    completed: ShieldCheck,
    dp: CircleDollarSign,
  };
  const Icon = icons[status] || Activity;

  return (
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
      <Icon size={18} aria-hidden="true" />
    </div>
  );
};

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState(adminStatsFallback);
  const [source, setSource] = useState('fallback');

  useEffect(() => {
    let isMounted = true;

    Promise.all([dashboardApi.stats(), dashboardApi.charts()])
      .then(([statsResponse, chartsResponse]) => {
        if (!isMounted) return;
        const apiCharts = chartsResponse.data || {};

        setDashboardData({
          stats: { ...adminStatsFallback.stats, ...statsResponse.data },
          charts: {
            ...adminStatsFallback.charts,
            ...apiCharts,
            monthly_rentals: usableArray(apiCharts.monthly_rentals, adminStatsFallback.charts.monthly_rentals, 12),
            monthly_revenue: usableArray(apiCharts.monthly_revenue, adminStatsFallback.charts.monthly_revenue, 12),
            fleet_status: usableArray(apiCharts.fleet_status, adminStatsFallback.charts.fleet_status, 3),
            maintenance_cost: usableArray(apiCharts.maintenance_cost, adminStatsFallback.charts.maintenance_cost, 6),
            recent_activities: usableArray(apiCharts.recent_activities, adminStatsFallback.charts.recent_activities, 5),
          },
        });
        setSource('api');
      })
      .catch(() => {
        if (!isMounted) return;
        setDashboardData(adminStatsFallback);
        setSource('fallback');
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const { stats, charts } = dashboardData;
  const rentalsData = useMemo(() => normalizeSeries(charts.monthly_rentals), [charts.monthly_rentals]);
  const revenueData = useMemo(() => normalizeSeries(charts.monthly_revenue), [charts.monthly_revenue]);
  const maintenanceData = useMemo(() => normalizeSeries(charts.maintenance_cost), [charts.maintenance_cost]);
  const fleetData = useMemo(
    () =>
      (charts.fleet_status || []).map((item) => ({
        ...item,
        name: statusLabels[item.status] || item.status,
        total: Number(item.total || 0),
      })),
    [charts.fleet_status],
  );

  const statCards = [
    {
      key: 'estimated_monthly_revenue',
      label: 'Pendapatan Estimasi',
      value: stats.estimated_monthly_revenue,
      description: 'Estimasi pendapatan rental bulan ini.',
      badge: '+12%',
      icon: TrendingUp,
      accent: 'emerald',
      prefix: 'Rp ',
    },
    {
      key: 'active_rentals',
      label: 'Penyewaan Aktif',
      value: stats.active_rentals,
      description: 'Penyewaan berjalan atau sudah terjadwal.',
      badge: `${stats.total_rentals_this_month || stats.active_rentals} bulan ini`,
      icon: Activity,
      accent: 'slate',
    },
    {
      key: 'available_units',
      label: 'Unit Tersedia',
      value: stats.available_units,
      description: 'Unit siap digunakan untuk booking berikutnya.',
      badge: 'Ready',
      icon: ShieldCheck,
      accent: 'blue',
    },
    {
      key: 'unread_messages',
      label: 'Pesan Baru',
      value: stats.unread_messages,
      description: 'Pesan kontak yang perlu ditindaklanjuti.',
      badge: 'Inbox',
      icon: MessageSquareText,
      accent: 'rose',
    },
  ];

  return (
    <div>
      <AdminPageHeader
        title="Dashboard Operasional"
        description="Pantau performa armada, penyewaan, pendapatan, maintenance, dan pesan pelanggan dalam satu layar."
      >
        <div className="rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-600 shadow-sm">
          Data: {source === 'api' ? 'API backend' : 'Mock fallback'}
        </div>
      </AdminPageHeader>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map((card, index) => (
          <StatsCard key={card.key} {...card} delay={index * 0.04} />
        ))}
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-[2fr_1fr]">
        <ChartCard
          title="Penyewaan Bulanan"
          description="Jumlah penyewaan per bulan untuk melihat tren permintaan."
        >
          <div className="h-56 lg:h-60">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={rentalsData} margin={{ top: 6, right: 8, left: -24, bottom: -4 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis dataKey="monthLabel" tickLine={false} axisLine={false} stroke="#64748b" />
                <YAxis allowDecimals={false} tickLine={false} axisLine={false} stroke="#64748b" />
                <Tooltip
                  cursor={{ fill: 'rgba(15, 23, 42, 0.06)' }}
                  contentStyle={{ borderRadius: 16, borderColor: '#e2e8f0' }}
                />
                <Bar dataKey="total" name="Penyewaan" fill="#0f172a" radius={[12, 12, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard
          title="Status Unit Mobil"
          description="Distribusi ketersediaan unit aktif, disewa, maintenance, dan nonaktif."
        >
          <div className="h-56 lg:h-60">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart margin={{ top: -8, right: 0, bottom: -8, left: 0 }}>
                <Pie
                  data={fleetData}
                  dataKey="total"
                  nameKey="name"
                  innerRadius={48}
                  outerRadius={74}
                  paddingAngle={4}
                >
                  {fleetData.map((entry) => (
                    <Cell key={entry.status} fill={chartColors[entry.status] || '#64748b'} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 16, borderColor: '#e2e8f0' }} />
                <Legend verticalAlign="bottom" iconType="circle" wrapperStyle={{ fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-3">
        <ChartCard
          title="Pendapatan Estimasi"
          description="Estimasi pendapatan bulanan berdasarkan rental aktif dan selesai."
          className="xl:col-span-2"
        >
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 8, right: 8, left: -16, bottom: -2 }}>
                <defs>
                  <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0f172a" stopOpacity={0.32} />
                    <stop offset="95%" stopColor="#0f172a" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis dataKey="monthLabel" tickLine={false} axisLine={false} stroke="#64748b" />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  stroke="#64748b"
                  tickFormatter={(value) => `${Number(value) / 1000000} jt`}
                />
                <Tooltip
                  formatter={(value) => [formatCurrency(value), 'Pendapatan']}
                  contentStyle={{ borderRadius: 16, borderColor: '#e2e8f0' }}
                />
                <Area
                  type="monotone"
                  dataKey="total"
                  name="Pendapatan"
                  stroke="#0f172a"
                  strokeWidth={3}
                  fill="url(#revenueGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard
          title="Biaya Maintenance"
          description="Biaya perawatan bulanan agar kontrol operasional tetap jelas."
        >
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={maintenanceData} margin={{ top: 8, right: 8, left: -24, bottom: -2 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis dataKey="monthLabel" tickLine={false} axisLine={false} stroke="#64748b" />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  stroke="#64748b"
                  tickFormatter={(value) => `${Number(value) / 1000000} jt`}
                />
                <Tooltip
                  formatter={(value) => [formatCurrency(value), 'Biaya']}
                  cursor={{ fill: 'rgba(245, 158, 11, 0.08)' }}
                  contentStyle={{ borderRadius: 16, borderColor: '#e2e8f0' }}
                />
                <Bar dataKey="total" name="Biaya" fill="#d97706" radius={[12, 12, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-3">
        <ChartCard
          title="Aktivitas Terbaru"
          description="Update operasional terbaru dari rental, pesan, pembayaran, dan maintenance."
          className="xl:col-span-2"
        >
          <div className="space-y-4">
            {(charts.recent_activities || []).map((activity) => (
              <div
                key={activity.id}
                className="flex gap-4 rounded-2xl border border-slate-100 bg-slate-50/70 p-4"
              >
                <ActivityIcon status={activity.status || activity.rental_status} />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <h3 className="font-extrabold text-slate-950">
                      {activity.title || activity.rental_code || 'Aktivitas rental'}
                    </h3>
                    <StatusBadge value={activity.status || activity.rental_status} />
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">
                    {activity.description ||
                      `${activity.renter_name || 'Pelanggan'} - ${activity.car_unit?.car?.name || 'Armada Rent & Go'}`}
                  </p>
                  <p className="mt-2 text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
                    {activity.time || formatDate(activity.created_at || activity.start_date)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ChartCard>

        <ChartCard
          title="Ringkasan Operasional"
          description="Statistik tambahan dipindahkan dari card utama agar area atas tetap ringkas."
        >
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-slate-50 p-4 text-slate-800">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Total Armada</p>
              <p className="mt-2 text-2xl font-black">{stats.total_cars} model</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4 text-slate-800">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Total Unit</p>
              <p className="mt-2 text-2xl font-black">{stats.total_units} unit</p>
            </div>
            <div className="rounded-2xl bg-blue-50 p-4 text-blue-800">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-400">Sedang Disewa</p>
              <p className="mt-2 text-2xl font-black">{stats.rented_units} unit</p>
            </div>
            <div className="rounded-2xl bg-amber-50 p-4 text-amber-800">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-500">Maintenance</p>
              <p className="mt-2 text-2xl font-black">{stats.maintenance_units} unit</p>
            </div>
            <div className="col-span-2 rounded-2xl bg-slate-100 p-4 text-slate-800">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
                Biaya Maintenance Bulan Ini
              </p>
              <p className="mt-2 text-2xl font-black">{formatCurrency(stats.maintenance_cost_this_month)}</p>
            </div>
            <div className="col-span-2 rounded-2xl bg-emerald-50 p-4 text-emerald-800">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-500">Layanan Aktif</p>
              <p className="mt-2 text-2xl font-black">{stats.active_services} layanan</p>
            </div>
          </div>
        </ChartCard>
      </div>
    </div>
  );
};

export default AdminDashboard;
