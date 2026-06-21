import { useEffect, useMemo, useState } from 'react';
import { AdminCrudForm, AdminCrudList } from '../components/AdminCrud';
import StatusBadge from '../components/StatusBadge';
import { carUnitsApi } from '../../api/carUnitsApi';
import { maintenanceApi } from '../../api/maintenanceApi';
import { formatCurrency, formatDate } from '../utils/formatters';

const statusOptions = [
  { value: 'scheduled', label: 'Dijadwalkan' },
  { value: 'in_progress', label: 'Berjalan' },
  { value: 'completed', label: 'Selesai' },
];

const initialForm = {
  car_unit_id: '',
  maintenance_type: '',
  description: '',
  start_date: '',
  end_date: '',
  cost: '',
  status: 'scheduled',
  notes: '',
};

const AdminMaintenance = ({ mode = 'list' }) => {
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
      { name: 'car_unit_id', label: 'Unit Mobil', type: 'select', options: unitOptions, required: true },
      { name: 'maintenance_type', label: 'Jenis Maintenance', required: true },
      { name: 'description', label: 'Deskripsi', type: 'textarea', full: true },
      { name: 'start_date', label: 'Tanggal Mulai', type: 'datetime-local', required: true },
      { name: 'end_date', label: 'Tanggal Selesai', type: 'datetime-local' },
      { name: 'cost', label: 'Biaya', type: 'number' },
      { name: 'status', label: 'Status', type: 'select', options: statusOptions, required: true },
      { name: 'notes', label: 'Catatan', type: 'textarea', full: true },
    ],
    [unitOptions],
  );

  const columns = useMemo(
    () => [
      { label: 'No', render: (_item, index) => index + 1 },
      { label: 'Unit Mobil', render: (item) => `${item.car_unit?.plate_number || '-'} - ${item.car_unit?.car?.name || '-'}` },
      { label: 'Jenis Maintenance', accessor: 'maintenance_type' },
      { label: 'Tanggal Mulai', render: (item) => formatDate(item.start_date) },
      { label: 'Tanggal Selesai', render: (item) => formatDate(item.end_date) },
      { label: 'Biaya', render: (item) => formatCurrency(item.cost) },
      { label: 'Status', render: (item) => <StatusBadge value={item.status} /> },
    ],
    [],
  );

  if (mode !== 'list') {
    return (
      <AdminCrudForm
        mode={mode}
        title={mode === 'edit' ? 'Edit Maintenance' : 'Tambah Maintenance'}
        description={mode === 'edit' ? 'Perbarui catatan perawatan unit kendaraan.' : 'Tambahkan jadwal atau catatan maintenance unit.'}
        api={maintenanceApi}
        fields={fields}
        initialForm={initialForm}
        backTo="/admin/maintenance"
        submitLabel={mode === 'edit' ? 'Simpan Perubahan' : 'Simpan Maintenance'}
      />
    );
  }

  return (
    <AdminCrudList
      title="Daftar Maintenance"
      description="Jadwalkan servis, catat biaya, dan pantau status perawatan unit armada."
      api={maintenanceApi}
      columns={columns}
      basePath="/admin/maintenance"
      createLabel="Tambah Maintenance"
      searchPlaceholder="Cari maintenance..."
      searchKeys={['maintenance_type', 'car_unit.plate_number', 'car_unit.car.name', 'status']}
    />
  );
};

export default AdminMaintenance;
