const toneMap = {
  available: 'bg-emerald-50 text-emerald-700 ring-emerald-100',
  paid: 'bg-emerald-50 text-emerald-700 ring-emerald-100',
  finished: 'bg-emerald-50 text-emerald-700 ring-emerald-100',
  online: 'bg-emerald-50 text-emerald-700 ring-emerald-100',
  active: 'bg-emerald-50 text-emerald-700 ring-emerald-100',
  rented: 'bg-blue-50 text-blue-700 ring-blue-100',
  scheduled: 'bg-amber-50 text-amber-700 ring-amber-100',
  dp: 'bg-amber-50 text-amber-700 ring-amber-100',
  processing: 'bg-amber-50 text-amber-700 ring-amber-100',
  new: 'bg-blue-50 text-blue-700 ring-blue-100',
  read: 'bg-slate-50 text-slate-700 ring-slate-200',
  maintenance: 'bg-orange-50 text-orange-700 ring-orange-100',
  in_progress: 'bg-orange-50 text-orange-700 ring-orange-100',
  late: 'bg-rose-50 text-rose-700 ring-rose-100',
  unpaid: 'bg-rose-50 text-rose-700 ring-rose-100',
  cancelled: 'bg-rose-50 text-rose-700 ring-rose-100',
  inactive: 'bg-slate-100 text-slate-600 ring-slate-200',
  offline: 'bg-slate-100 text-slate-600 ring-slate-200',
  done: 'bg-emerald-50 text-emerald-700 ring-emerald-100',
  completed: 'bg-emerald-50 text-emerald-700 ring-emerald-100',
};

const labels = {
  available: 'Tersedia',
  scheduled: 'Dijadwalkan',
  rented: 'Disewa',
  late: 'Terlambat',
  maintenance: 'Maintenance',
  inactive: 'Nonaktif',
  unpaid: 'Belum Bayar',
  dp: 'DP',
  paid: 'Lunas',
  finished: 'Selesai',
  cancelled: 'Dibatalkan',
  new: 'Baru',
  read: 'Dibaca',
  processing: 'Diproses',
  done: 'Selesai',
  in_progress: 'Berjalan',
  completed: 'Selesai',
  online: 'Online',
  offline: 'Offline',
  active: 'Aktif',
};

const StatusBadge = ({ value }) => (
  <span
    className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ring-1 ${
      toneMap[value] || 'bg-slate-50 text-slate-700 ring-slate-200'
    }`}
  >
    {labels[value] || value || '-'}
  </span>
);

export default StatusBadge;
