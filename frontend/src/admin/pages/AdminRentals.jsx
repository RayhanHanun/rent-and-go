import { useEffect, useState } from 'react';
import CrudPage from '../components/CrudPage';
import StatusBadge from '../components/StatusBadge';
import { carUnitsApi } from '../../api/carUnitsApi';
import { rentalsApi } from '../../api/rentalsApi';
import { formatCurrency, formatDate } from '../utils/formatters';

const rentalStatuses = ['scheduled', 'rented', 'finished', 'cancelled', 'late'].map((status) => ({
  value: status,
  label: status,
}));
const paymentStatuses = ['unpaid', 'dp', 'paid'].map((status) => ({ value: status, label: status }));

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

const AdminRentals = () => {
  const [unitOptions, setUnitOptions] = useState([]);

  useEffect(() => {
    let isMounted = true;
    carUnitsApi.list({ per_page: 100 }).then((response) => {
      if (isMounted) {
        setUnitOptions((response.data || []).map((item) => ({
          value: item.id,
          label: `${item.plate_number} - ${item.car?.name || 'Unit'}`,
        })));
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <CrudPage
      title="Manajemen Rental"
      description="Catat booking, penyewa, durasi, nominal, status rental, dan status pembayaran."
      api={rentalsApi}
      initialForm={initialForm}
      fields={[
        { name: 'rental_code', label: 'Kode Rental' },
        { name: 'car_unit_id', label: 'Unit Mobil', type: 'select', options: unitOptions, required: true },
        { name: 'renter_name', label: 'Nama Penyewa', required: true },
        { name: 'renter_phone', label: 'Nomor WhatsApp', required: true },
        { name: 'renter_email', label: 'Email' },
        { name: 'renter_address', label: 'Alamat', type: 'textarea', full: true },
        { name: 'start_date', label: 'Tanggal Mulai', type: 'datetime-local', required: true },
        { name: 'end_date', label: 'Tanggal Selesai', type: 'datetime-local', required: true },
        { name: 'duration_days', label: 'Durasi Hari', type: 'number' },
        { name: 'price_per_day', label: 'Harga per Hari', type: 'number' },
        { name: 'total_amount', label: 'Total', type: 'number' },
        { name: 'down_payment', label: 'DP', type: 'number' },
        { name: 'remaining_payment', label: 'Sisa Bayar', type: 'number' },
        { name: 'payment_status', label: 'Status Pembayaran', type: 'select', options: paymentStatuses, required: true },
        { name: 'rental_status', label: 'Status Rental', type: 'select', options: rentalStatuses, required: true },
        { name: 'notes', label: 'Catatan', type: 'textarea', full: true },
      ]}
      columns={[
        { label: 'Kode', accessor: 'rental_code' },
        { label: 'Penyewa', accessor: 'renter_name' },
        { label: 'Unit', render: (item) => `${item.car_unit?.plate_number || '-'} - ${item.car_unit?.car?.name || '-'}` },
        { label: 'Mulai', render: (item) => formatDate(item.start_date) },
        { label: 'Total', render: (item) => formatCurrency(item.total_amount) },
        { label: 'Status', render: (item) => <StatusBadge value={item.rental_status} /> },
        { label: 'Bayar', render: (item) => <StatusBadge value={item.payment_status} /> },
      ]}
    />
  );
};

export default AdminRentals;
