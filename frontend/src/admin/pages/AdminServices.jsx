import { useMemo } from 'react';
import { AdminCrudForm, AdminCrudList } from '../components/AdminCrud';
import StatusBadge from '../components/StatusBadge';
import SafeImage from '../../components/ui/SafeImage';
import { servicesApi } from '../../api/servicesApi';
import { formatDate } from '../utils/formatters';

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

const fields = [
  { name: 'title', label: 'Judul Layanan', required: true },
  { name: 'slug', label: 'Slug' },
  { name: 'short_description', label: 'Deskripsi Singkat', type: 'textarea', full: true },
  { name: 'description', label: 'Deskripsi Detail', type: 'textarea', full: true },
  { name: 'icon', label: 'Icon' },
  { name: 'sort_order', label: 'Urutan Tampil', type: 'number' },
  { name: 'image', label: 'Gambar', type: 'file', full: true },
  { name: 'is_active', label: 'Status Aktif', type: 'checkbox' },
];

const AdminServices = ({ mode = 'list' }) => {
  const columns = useMemo(
    () => [
      {
        label: 'Gambar/Icon',
        render: (item) => (
          <div className="flex items-center gap-3">
            <div className="h-12 w-16 overflow-hidden rounded-xl bg-slate-100">
              {item.image_url ? (
                <SafeImage
                  src={item.image_url}
                  alt={item.title}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-xs font-bold text-slate-400">
                  {item.icon || '-'}
                </div>
              )}
            </div>
          </div>
        ),
      },
      { label: 'Judul Layanan', accessor: 'title' },
      { label: 'Slug', accessor: 'slug' },
      { label: 'Status', render: (item) => <StatusBadge value={item.is_active ? 'active' : 'inactive'} /> },
      { label: 'Urutan', accessor: 'sort_order' },
      { label: 'Diperbarui', render: (item) => formatDate(item.updated_at) },
    ],
    [],
  );

  if (mode !== 'list') {
    return (
      <AdminCrudForm
        mode={mode}
        title={mode === 'edit' ? 'Edit Layanan' : 'Tambah Layanan'}
        description={mode === 'edit' ? 'Perbarui layanan yang tampil di website publik.' : 'Tambahkan layanan perjalanan baru untuk website publik.'}
        api={servicesApi}
        fields={fields}
        initialForm={initialForm}
        backTo="/admin/services"
        submitLabel={mode === 'edit' ? 'Simpan Perubahan' : 'Simpan Layanan'}
      />
    );
  }

  return (
    <AdminCrudList
      title="Daftar Layanan"
      description="Kelola layanan perjalanan yang tampil di website publik."
      api={servicesApi}
      columns={columns}
      basePath="/admin/services"
      createLabel="Tambah Layanan"
      searchPlaceholder="Cari layanan..."
      searchKeys={['title', 'slug', 'short_description', 'icon']}
    />
  );
};

export default AdminServices;
