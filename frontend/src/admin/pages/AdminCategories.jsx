import CrudPage from '../components/CrudPage';
import StatusBadge from '../components/StatusBadge';
import { categoriesApi } from '../../api/categoriesApi';

const initialForm = {
  name: '',
  slug: '',
  description: '',
  is_active: true,
};

const AdminCategories = () => (
  <CrudPage
    title="Kategori Armada"
    description="Kelola kategori katalog seperti City Car, MPV, SUV, Premium, dan Microbus."
    api={categoriesApi}
    initialForm={initialForm}
    fields={[
      { name: 'name', label: 'Nama Kategori', required: true },
      { name: 'slug', label: 'Slug' },
      { name: 'description', label: 'Deskripsi', type: 'textarea', full: true },
      { name: 'is_active', label: 'Aktif', type: 'checkbox' },
    ]}
    columns={[
      { label: 'Nama', accessor: 'name' },
      { label: 'Slug', accessor: 'slug' },
      { label: 'Status', render: (item) => <StatusBadge value={item.is_active ? 'active' : 'inactive'} /> },
    ]}
  />
);

export default AdminCategories;
