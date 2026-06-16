import { useEffect, useState } from 'react';
import CrudPage from '../components/CrudPage';
import StatusBadge from '../components/StatusBadge';
import { carUnitsApi } from '../../api/carUnitsApi';
import { maintenanceApi } from '../../api/maintenanceApi';
import { formatCurrency, formatDate } from '../utils/formatters';

const statusOptions = ['scheduled', 'in_progress', 'completed'].map((status) => ({
  value: status,
  label: status,
}));

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

const AdminMaintenance = () => {
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
      title="Maintenance"
      description="Jadwalkan servis, catat biaya, dan pantau status perawatan unit armada."
      api={maintenanceApi}
      initialForm={initialForm}
      fields={[
        { name: 'car_unit_id', label: 'Unit Mobil', type: 'select', options: unitOptions, required: true },
        { name: 'maintenance_type', label: 'Jenis Maintenance', required: true },
        { name: 'description', label: 'Deskripsi', type: 'textarea', full: true },
        { name: 'start_date', label: 'Tanggal Mulai', type: 'datetime-local', required: true },
        { name: 'end_date', label: 'Tanggal Selesai', type: 'datetime-local' },
        { name: 'cost', label: 'Biaya', type: 'number' },
        { name: 'status', label: 'Status', type: 'select', options: statusOptions, required: true },
        { name: 'notes', label: 'Catatan', type: 'textarea', full: true },
      ]}
      columns={[
        { label: 'Unit', render: (item) => `${item.car_unit?.plate_number || '-'} - ${item.car_unit?.car?.name || '-'}` },
        { label: 'Jenis', accessor: 'maintenance_type' },
        { label: 'Mulai', render: (item) => formatDate(item.start_date) },
        { label: 'Biaya', render: (item) => formatCurrency(item.cost) },
        { label: 'Status', render: (item) => <StatusBadge value={item.status} /> },
      ]}
    />
  );
};

export default AdminMaintenance;
