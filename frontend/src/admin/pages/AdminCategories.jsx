import { useMemo } from 'react';
import { AdminCrudForm, AdminCrudList } from '../components/AdminCrud';
import StatusBadge from '../components/StatusBadge';
import { categoriesApi } from '../../api/categoriesApi';
import { formatDate } from '../utils/formatters';

const initialForm = {
  name: '',
  slug: '',
  description: '',
  is_active: true,
};

const fields = [
  { name: 'name', label: 'Nama Kategori', required: true },
  { name: 'slug', label: 'Slug' },
  { name: 'description', label: 'Deskripsi', type: 'textarea', full: true },
  { name: 'is_active', label: 'Status Aktif', type: 'checkbox' },
];

const AdminCategories = ({ mode = 'list' }) => {
  const columns = useMemo(
    () => [
      { label: 'No', render: (_item, index) => index + 1 },
      { label: 'Nama Kategori', accessor: 'name' },
      { label: 'Slug', accessor: 'slug' },
      { label: 'Deskripsi', render: (item) => item.description || '-' },
      { label: 'Status', render: (item) => <StatusBadge value={item.is_active ? 'active' : 'inactive'} /> },
      { label: 'Dibuat', render: (item) => formatDate(item.created_at) },
      { label: 'Diperbarui', render: (item) => formatDate(item.updated_at) },
    ],
    [],
  );

  if (mode !== 'list') {
    return (
      <AdminCrudForm
        mode={mode}
        title={mode === 'edit' ? 'Edit Kategori' : 'Tambah Kategori'}
        description={mode === 'edit' ? 'Perbarui kategori armada yang tampil di katalog.' : 'Tambahkan kategori armada baru untuk katalog Rent & Go.'}
        api={categoriesApi}
        fields={fields}
        initialForm={initialForm}
        backTo="/admin/categories"
        submitLabel={mode === 'edit' ? 'Simpan Perubahan' : 'Simpan Kategori'}
      />
    );
  }

  return (
    <AdminCrudList
      title="Daftar Kategori"
      description="Kelola kategori katalog seperti City Car, MPV, SUV, Premium, dan Microbus."
      api={categoriesApi}
      columns={columns}
      basePath="/admin/categories"
      createLabel="Tambah Kategori"
      searchPlaceholder="Cari kategori..."
      searchKeys={['name', 'slug', 'description']}
    />
  );
};

export default AdminCategories;
