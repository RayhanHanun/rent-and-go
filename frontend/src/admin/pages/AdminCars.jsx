import { useEffect, useState } from 'react';
import CrudPage from '../components/CrudPage';
import StatusBadge from '../components/StatusBadge';
import { carsApi } from '../../api/carsApi';
import { categoriesApi } from '../../api/categoriesApi';
import { formatCurrency } from '../utils/formatters';

const initialForm = {
  category_id: '',
  name: '',
  slug: '',
  transmission: 'Automatic',
  price_per_day: '',
  price_label: '/hari',
  seats: '',
  fuel_type: 'Bensin',
  rating: '4.8',
  short_description: '',
  description: '',
  features: '',
  is_featured: false,
  is_active: true,
  images: null,
};

const AdminCars = () => {
  const [categoryOptions, setCategoryOptions] = useState([]);

  useEffect(() => {
    let isMounted = true;
    categoriesApi.list({ per_page: 100 }).then((response) => {
      if (isMounted) {
        setCategoryOptions((response.data || []).map((item) => ({ value: item.id, label: item.name })));
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <CrudPage
      title="Manajemen Armada"
      description="Kelola data mobil, harga, spesifikasi, status tampil, dan foto armada."
      api={carsApi}
      initialForm={initialForm}
      fields={[
        { name: 'category_id', label: 'Kategori', type: 'select', options: categoryOptions },
        { name: 'name', label: 'Nama Mobil', required: true },
        { name: 'slug', label: 'Slug' },
        { name: 'transmission', label: 'Transmisi' },
        { name: 'price_per_day', label: 'Harga per Hari', type: 'number', required: true },
        { name: 'price_label', label: 'Label Harga' },
        { name: 'seats', label: 'Jumlah Kursi', type: 'number' },
        { name: 'fuel_type', label: 'Bahan Bakar' },
        { name: 'rating', label: 'Rating', type: 'number' },
        { name: 'short_description', label: 'Deskripsi Pendek', type: 'textarea', full: true },
        { name: 'description', label: 'Deskripsi Detail', type: 'textarea', full: true },
        { name: 'features', label: 'Fitur (pisahkan dengan koma)', type: 'textarea', full: true },
        { name: 'images', label: 'Foto Armada', type: 'multifile', full: true },
        { name: 'is_featured', label: 'Featured di Beranda', type: 'checkbox' },
        { name: 'is_active', label: 'Aktif', type: 'checkbox' },
      ]}
      normalizeBeforeSubmit={(form) => ({
        ...form,
        features: Array.isArray(form.features) ? form.features.join(', ') : form.features,
      })}
      columns={[
        { label: 'Mobil', accessor: 'name' },
        { label: 'Kategori', accessor: 'category.name' },
        { label: 'Harga', render: (item) => formatCurrency(item.price_per_day) },
        { label: 'Featured', render: (item) => <StatusBadge value={item.is_featured ? 'active' : 'inactive'} /> },
        { label: 'Status', render: (item) => <StatusBadge value={item.is_active ? 'active' : 'inactive'} /> },
      ]}
    />
  );
};

export default AdminCars;
