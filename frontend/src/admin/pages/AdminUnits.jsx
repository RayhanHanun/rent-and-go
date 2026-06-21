import { useEffect, useMemo, useState } from 'react';
import { AdminCrudForm, AdminCrudList } from '../components/AdminCrud';
import StatusBadge from '../components/StatusBadge';
import { carUnitsApi } from '../../api/carUnitsApi';
import { carsApi } from '../../api/carsApi';
import { formatDate } from '../utils/formatters';

const statusOptions = [
  { value: 'available', label: 'Tersedia' },
  { value: 'scheduled', label: 'Dijadwalkan' },
  { value: 'rented', label: 'Sedang Disewa' },
  { value: 'late', label: 'Terlambat Kembali' },
  { value: 'maintenance', label: 'Maintenance' },
  { value: 'inactive', label: 'Nonaktif' },
];

const initialForm = {
  car_id: '',
  plate_number: '',
  color: '',
  year: '',
  mileage: '',
  tax_expired_at: '',
  status: 'available',
  condition_note: '',
};

const AdminUnits = ({ mode = 'list' }) => {
  const [carOptions, setCarOptions] = useState([]);

  useEffect(() => {
    let isMounted = true;

    carsApi
      .list({ per_page: 100 })
      .then((response) => {
        if (isMounted) {
          setCarOptions((response.data || []).map((item) => ({ value: item.id, label: item.name })));
        }
      })
      .catch(() => {
        if (isMounted) {
          setCarOptions([]);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const fields = useMemo(
    () => [
      { name: 'car_id', label: 'Model Mobil', type: 'select', options: carOptions, required: true },
      { name: 'plate_number', label: 'Nomor Plat', required: true },
      { name: 'color', label: 'Warna' },
      { name: 'year', label: 'Tahun', type: 'number' },
      { name: 'mileage', label: 'Kilometer', type: 'number' },
      { name: 'tax_expired_at', label: 'Tanggal Pajak/STNK', type: 'date' },
      { name: 'status', label: 'Status Unit', type: 'select', options: statusOptions, required: true },
      { name: 'condition_note', label: 'Catatan Kondisi', type: 'textarea', full: true },
    ],
    [carOptions],
  );

  const columns = useMemo(
    () => [
      { label: 'No', render: (_item, index) => index + 1 },
      { label: 'Model Mobil', accessor: 'car.name' },
      { label: 'Plat Nomor', accessor: 'plate_number' },
      { label: 'Warna', accessor: 'color' },
      { label: 'Tahun', accessor: 'year' },
      { label: 'Kilometer', render: (item) => Number(item.mileage || 0).toLocaleString('id-ID') },
      { label: 'Status Unit', render: (item) => <StatusBadge value={item.status} /> },
      { label: 'Pajak/STNK', render: (item) => formatDate(item.tax_expired_at) },
    ],
    [],
  );

  if (mode !== 'list') {
    return (
      <AdminCrudForm
        mode={mode}
        title={mode === 'edit' ? 'Edit Unit' : 'Tambah Unit'}
        description={mode === 'edit' ? 'Perbarui data unit kendaraan operasional.' : 'Tambahkan unit kendaraan baru beserta plat dan statusnya.'}
        api={carUnitsApi}
        fields={fields}
        initialForm={initialForm}
        backTo="/admin/units"
        submitLabel={mode === 'edit' ? 'Simpan Perubahan' : 'Simpan Unit'}
      />
    );
  }

  return (
    <AdminCrudList
      title="Daftar Unit Kendaraan"
      description="Kelola plat nomor, warna, tahun, kilometer, pajak, dan status tiap unit kendaraan."
      api={carUnitsApi}
      columns={columns}
      basePath="/admin/units"
      createLabel="Tambah Unit"
      searchPlaceholder="Cari unit..."
      searchKeys={['plate_number', 'car.name', 'color', 'status']}
    />
  );
};

export default AdminUnits;
