import { useEffect, useMemo, useState } from 'react';
import { AdminCrudForm, AdminCrudList } from '../components/AdminCrud';
import StatusBadge from '../components/StatusBadge';
import { carUnitsApi } from '../../api/carUnitsApi';
import { rentalsApi } from '../../api/rentalsApi';
import { formatCurrency, formatDate } from '../utils/formatters';

const rentalStatuses = [
  { value: 'scheduled', label: 'Dijadwalkan' },
  { value: 'rented', label: 'Sedang Disewa' },
  { value: 'finished', label: 'Selesai' },
  { value: 'cancelled', label: 'Dibatalkan' },
  { value: 'late', label: 'Terlambat Kembali' },
];

const paymentStatuses = [
  { value: 'unpaid', label: 'Belum Bayar' },
  { value: 'dp', label: 'DP' },
  { value: 'paid', label: 'Lunas' },
];

const initialForm = {
  rental_code: '',
  car_unit_id: '',
  renter_name: '',
  renter_phone: '',
  renter_email: '',
  renter_address: '',
  start_date: '',
  end_date: '',
  duration_days: '',
  price_per_day: '',
  total_amount: '',
  down_payment: '',
  remaining_payment: '',
  payment_status: 'unpaid',
  rental_status: 'scheduled',
  notes: '',
};

const AdminRentals = ({ mode = 'list' }) => {
  const [unitOptions, setUnitOptions] = useState([]);

  useEffect(() => {
    let isMounted = true;

    carUnitsApi
      .list({ per_page: 100 })
      .then((response) => {
        if (isMounted) {
          setUnitOptions((response.data || []).map((item) => ({
            value: item.id,
            label: `${item.plate_number} - ${item.car?.name || 'Unit'}`,
          })));
        }
      })
      .catch(() => {
        if (isMounted) {
          setUnitOptions([]);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const fields = useMemo(
    () => [
      { name: 'rental_code', label: 'Kode Rental' },
      { name: 'renter_name', label: 'Nama Penyewa', required: true },
      { name: 'renter_phone', label: 'Nomor HP', required: true },
      { name: 'renter_email', label: 'Email Opsional' },
      { name: 'renter_address', label: 'Alamat Opsional', type: 'textarea', full: true },
      { name: 'car_unit_id', label: 'Unit Mobil', type: 'select', options: unitOptions, required: true },
      { name: 'start_date', label: 'Tanggal Mulai', type: 'datetime-local', required: true },
      { name: 'end_date', label: 'Tanggal Selesai', type: 'datetime-local', required: true },
      { name: 'price_per_day', label: 'Harga per Hari', type: 'number' },
      { name: 'total_amount', label: 'Total Biaya', type: 'number' },
      { name: 'down_payment', label: 'DP', type: 'number' },
      { name: 'remaining_payment', label: 'Sisa Pembayaran', type: 'number' },
      { name: 'payment_status', label: 'Status Pembayaran', type: 'select', options: paymentStatuses, required: true },
      { name: 'rental_status', label: 'Status Rental', type: 'select', options: rentalStatuses, required: true },
      { name: 'notes', label: 'Catatan', type: 'textarea', full: true },
    ],
    [unitOptions],
  );

  const columns = useMemo(
    () => [
      { label: 'Kode Rental', accessor: 'rental_code' },
      { label: 'Penyewa', accessor: 'renter_name' },
      { label: 'No HP', accessor: 'renter_phone' },
      { label: 'Mobil/Unit', render: (item) => `${item.car_unit?.plate_number || '-'} - ${item.car_unit?.car?.name || '-'}` },
      { label: 'Tanggal Mulai', render: (item) => formatDate(item.start_date) },
      { label: 'Tanggal Selesai', render: (item) => formatDate(item.end_date) },
      { label: 'Total Biaya', render: (item) => formatCurrency(item.total_amount) },
      { label: 'Status Pembayaran', render: (item) => <StatusBadge value={item.payment_status} /> },
      { label: 'Status Rental', render: (item) => <StatusBadge value={item.rental_status} /> },
    ],
    [],
  );

  if (mode !== 'list') {
    return (
      <AdminCrudForm
        mode={mode}
        title={mode === 'edit' ? 'Edit Rental' : 'Tambah Rental'}
        description={mode === 'edit' ? 'Perbarui data penyewaan yang dicatat oleh admin.' : 'Catat penyewaan manual dari dashboard admin.'}
        api={rentalsApi}
        fields={fields}
        initialForm={initialForm}
        backTo="/admin/rentals"
        submitLabel={mode === 'edit' ? 'Simpan Perubahan' : 'Simpan Rental'}
      />
    );
  }

  return (
    <AdminCrudList
      title="Daftar Rental"
      description="Catat booking, penyewa, durasi, nominal, status rental, dan status pembayaran."
      api={rentalsApi}
      columns={columns}
      basePath="/admin/rentals"
      createLabel="Tambah Rental"
      searchPlaceholder="Cari rental..."
      searchKeys={['rental_code', 'renter_name', 'renter_phone', 'car_unit.plate_number', 'car_unit.car.name']}
    />
  );
};

export default AdminRentals;
