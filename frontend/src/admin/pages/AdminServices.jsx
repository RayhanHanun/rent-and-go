import CrudPage from '../components/CrudPage';
import StatusBadge from '../components/StatusBadge';
import { servicesApi } from '../../api/servicesApi';

const initialForm = {
  title: '',
  slug: '',
  short_description: '',
  description: '',
  icon: 'key',
  sort_order: 0,
  is_active: true,
  image: null,
};

const AdminServices = () => (
  <CrudPage
    title="Layanan"
    description="Kelola layanan perjalanan yang tampil di website publik."
    api={servicesApi}
    initialForm={initialForm}
    fields={[
      { name: 'title', label: 'Judul Layanan', required: true },
      { name: 'slug', label: 'Slug' },
      { name: 'short_description', label: 'Deskripsi Pendek', type: 'textarea', full: true },
      { name: 'description', label: 'Deskripsi Detail', type: 'textarea', full: true },
      { name: 'icon', label: 'Ikon' },
      { name: 'sort_order', label: 'Urutan', type: 'number' },
      { name: 'image', label: 'Gambar Layanan', type: 'file', full: true },
      { name: 'is_active', label: 'Aktif', type: 'checkbox' },
    ]}
    columns={[
      { label: 'Judul', accessor: 'title' },
      { label: 'Slug', accessor: 'slug' },
      { label: 'Urutan', accessor: 'sort_order' },
      { label: 'Status', render: (item) => <StatusBadge value={item.is_active ? 'active' : 'inactive'} /> },
    ]}
  />
);

export default AdminServices;
