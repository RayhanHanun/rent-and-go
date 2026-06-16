import { useEffect, useState } from 'react';
import CrudPage from '../components/CrudPage';
import StatusBadge from '../components/StatusBadge';
import { carUnitsApi } from '../../api/carUnitsApi';
import { carsApi } from '../../api/carsApi';

const statusOptions = [
  'available',
  'scheduled',
  'rented',
  'late',
  'maintenance',
  'inactive',
].map((status) => ({ value: status, label: status }));

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

const AdminUnits = () => {
  const [carOptions, setCarOptions] = useState([]);

  useEffect(() => {
    let isMounted = true;
    carsApi.list({ per_page: 100 }).then((response) => {
      if (isMounted) {
        setCarOptions((response.data || []).map((item) => ({ value: item.id, label: item.name })));
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <CrudPage
      title="Unit Armada"
      description="Kelola plat nomor, warna, tahun, kilometer, pajak, dan status tiap unit kendaraan."
      api={carUnitsApi}
      initialForm={initialForm}
      fields={[
        { name: 'car_id', label: 'Mobil', type: 'select', options: carOptions, required: true },
        { name: 'plate_number', label: 'Nomor Plat', required: true },
        { name: 'color', label: 'Warna' },
        { name: 'year', label: 'Tahun', type: 'number' },
        { name: 'mileage', label: 'Kilometer', type: 'number' },
        { name: 'tax_expired_at', label: 'Pajak Berlaku Sampai', type: 'date' },
        { name: 'status', label: 'Status', type: 'select', options: statusOptions, required: true },
        { name: 'condition_note', label: 'Catatan Kondisi', type: 'textarea', full: true },
      ]}
      columns={[
        { label: 'Plat', accessor: 'plate_number' },
        { label: 'Mobil', accessor: 'car.name' },
        { label: 'Warna', accessor: 'color' },
        { label: 'Tahun', accessor: 'year' },
        { label: 'Status', render: (item) => <StatusBadge value={item.status} /> },
      ]}
    />
  );
};

export default AdminUnits;
