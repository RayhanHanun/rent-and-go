import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Plus, Star, Trash2, UploadCloud } from 'lucide-react';
import { AdminCrudList } from '../components/AdminCrud';
import AdminPageHeader from '../components/AdminPageHeader';
import StatusBadge from '../components/StatusBadge';
import SafeImage from '../../components/ui/SafeImage';
import { carsApi } from '../../api/carsApi';
import { categoriesApi } from '../../api/categoriesApi';
import { getImageUrl } from '../../api/imageUrls';
import { formatCurrency, formatDate } from '../utils/formatters';

const imageAngles = ['Depan', 'Samping', 'Belakang', 'Interior', 'Dashboard', 'Bagasi', 'Lainnya'];
const acceptedImageTypes = ['image/jpeg', 'image/png', 'image/webp'];
const maxImageSize = 2 * 1024 * 1024;

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
};

const getImageSrc = (image) => getImageUrl(image);

const normalizeAdminImages = (images = []) =>
  (Array.isArray(images) ? images : []).map((image) => ({
    ...image,
    image_url: getImageSrc(image),
    is_primary: Boolean(image.is_primary),
  }));

const getPrimaryImage = (item) =>
  getImageSrc(item.images?.find((image) => image.is_primary)) ||
  getImageSrc(item.images?.[0]);

const toEditForm = (item) => ({
  category_id: item.category_id || '',
  name: item.name || '',
  slug: item.slug || '',
  transmission: item.transmission || 'Automatic',
  price_per_day: item.price_per_day || '',
  price_label: item.price_label || '/hari',
  seats: item.seats || '',
  fuel_type: item.fuel_type || 'Bensin',
  rating: item.rating || '4.8',
  short_description: item.short_description || '',
  description: item.description || '',
  features: Array.isArray(item.features) ? item.features.join(', ') : item.features || '',
  is_featured: Boolean(item.is_featured),
  is_active: item.is_active !== false,
});

const toCarPayload = (form) => ({
  ...form,
  category_id: form.category_id || '',
  features: Array.isArray(form.features) ? form.features.join(', ') : form.features,
  is_featured: Boolean(form.is_featured),
  is_active: Boolean(form.is_active),
});

const appendCarFields = (data, form) => {
  const payload = toCarPayload(form);

  Object.entries(payload).forEach(([key, value]) => {
    if (value === undefined || value === null) return;
    data.append(key, typeof value === 'boolean' ? (value ? '1' : '0') : value);
  });
};

const validateImageFile = (file) => {
  if (!file) return '';
  if (!acceptedImageTypes.includes(file.type)) {
    return 'Format gambar harus jpg, jpeg, png, atau webp.';
  }
  if (file.size > maxImageSize) {
    return 'Ukuran gambar maksimal 2 MB.';
  }
  return '';
};

const createPreviewId = () => {
  if (globalThis.crypto?.randomUUID) {
    return globalThis.crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

const createGalleryItem = () => ({
  id: createPreviewId(),
  file: null,
  preview: '',
  angle: 'Depan',
  altText: '',
});

const appendCreateImage = (data, index, file, angle, altText) => {
  data.append('images[]', file);
  data.append(`image_angles[${index}]`, angle);
  data.append(`image_alts[${index}]`, altText);
};

const buildImagePayload = ({ file, angle, altText, isPrimary, sortOrder }) => {
  const data = new FormData();
  data.append('image', file);
  data.append('angle', angle || 'Lainnya');
  data.append('alt_text', altText || '');
  data.append('is_primary', isPrimary ? '1' : '0');
  data.append('sort_order', String(sortOrder || 0));

  return data;
};

const AdminCars = ({ mode = 'list' }) => {
  const [categoryOptions, setCategoryOptions] = useState([]);

  useEffect(() => {
    let isMounted = true;

    categoriesApi
      .list({ per_page: 100 })
      .then((response) => {
        if (isMounted) {
          setCategoryOptions((response.data || []).map((item) => ({ value: item.id, label: item.name })));
        }
      })
      .catch(() => {
        if (isMounted) {
          setCategoryOptions([]);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const columns = useMemo(
    () => [
      {
        label: 'Foto',
        render: (item) => (
          <div className="h-14 w-20 overflow-hidden rounded-xl bg-slate-100">
            {getPrimaryImage(item) ? (
              <SafeImage
                src={getPrimaryImage(item)}
                alt={item.name}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-xs font-bold text-slate-400">-</div>
            )}
          </div>
        ),
      },
      { label: 'Nama Armada', accessor: 'name' },
      { label: 'Kategori', accessor: 'category.name' },
      { label: 'Harga', render: (item) => formatCurrency(item.price_per_day) },
      { label: 'Transmisi', accessor: 'transmission' },
      { label: 'Status', render: (item) => <StatusBadge value={item.is_active ? 'active' : 'inactive'} /> },
      { label: 'Featured', render: (item) => <StatusBadge value={item.is_featured ? 'active' : 'inactive'} /> },
      { label: 'Diperbarui', render: (item) => formatDate(item.updated_at) },
    ],
    [],
  );

  if (mode !== 'list') {
    return <AdminCarForm mode={mode} categoryOptions={categoryOptions} />;
  }

  return (
    <AdminCrudList
      title="Daftar Armada"
      description="Kelola semua model kendaraan yang tampil di website Rent & Go."
      api={carsApi}
      columns={columns}
      basePath="/admin/cars"
      createLabel="Tambah Armada"
      searchPlaceholder="Cari armada..."
      searchKeys={['name', 'category.name', 'transmission', 'price_label']}
    />
  );
};

const AdminCarForm = ({ mode, categoryOptions }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [existingImages, setExistingImages] = useState([]);
  const [mainImageFile, setMainImageFile] = useState(null);
  const [mainImagePreview, setMainImagePreview] = useState('');
  const [mainImageName, setMainImageName] = useState('');
  const [galleryItems, setGalleryItems] = useState([createGalleryItem()]);
  const [isLoading, setIsLoading] = useState(mode === 'edit');
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const previewUrlsRef = useRef(new Set());

  const galleryImages = useMemo(
    () =>
      [...existingImages].sort((a, b) => {
        if (a.is_primary !== b.is_primary) {
          return a.is_primary ? -1 : 1;
        }

        return (a.sort_order ?? 0) - (b.sort_order ?? 0);
      }),
    [existingImages],
  );
  const primaryImage = galleryImages.find((image) => image.is_primary) || galleryImages[0];

  const applyCarDetail = useCallback((car) => {
    setForm(toEditForm(car));
    setExistingImages(normalizeAdminImages(car.images || []));
  }, []);

  const fetchCarDetail = useCallback(async () => {
    const response = await carsApi.detail(id);
    const car = response.data || {};
    applyCarDetail(car);

    return car;
  }, [applyCarDetail, id]);

  useEffect(() => {
    if (mode !== 'edit') return undefined;

    let isActive = true;

    Promise.resolve().then(() => {
      if (isActive) {
        setIsLoading(true);
        setError('');
      }
    });

    carsApi
      .detail(id)
      .then((response) => {
        if (!isActive) return;
        applyCarDetail(response.data || {});
      })
      .catch((loadError) => {
        if (!isActive) return;
        setError(loadError.response?.data?.message || 'Armada tidak ditemukan.');
      })
      .finally(() => {
        if (isActive) {
          setIsLoading(false);
        }
      });

    return () => {
      isActive = false;
    };
  }, [applyCarDetail, id, mode]);

  useEffect(
    () => () => {
      previewUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
      previewUrlsRef.current.clear();
    },
    [],
  );

  const createPreviewUrl = (file) => {
    const url = URL.createObjectURL(file);
    previewUrlsRef.current.add(url);
    return url;
  };

  const revokePreviewUrl = (url) => {
    if (!url?.startsWith('blob:')) return;

    URL.revokeObjectURL(url);
    previewUrlsRef.current.delete(url);
  };

  const handleFieldChange = (event) => {
    const { name, type, checked, value } = event.target;
    setForm((current) => ({ ...current, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleMainImageChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const validationMessage = validateImageFile(file);
    if (validationMessage) {
      setError(validationMessage);
      event.target.value = '';
      return;
    }

    revokePreviewUrl(mainImagePreview);

    setError('');
    setMainImageFile(file);
    setMainImageName(file.name);
    setMainImagePreview(createPreviewUrl(file));
  };

  const addGalleryItem = () => {
    setGalleryItems((current) => [...current, createGalleryItem()]);
  };

  const updateGalleryItem = (itemId, updates) => {
    setGalleryItems((current) => current.map((item) => (item.id === itemId ? { ...item, ...updates } : item)));
  };

  const handleGalleryFileChange = (itemId, event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const validationMessage = validateImageFile(file);
    if (validationMessage) {
      setError(validationMessage);
      event.target.value = '';
      return;
    }

    const currentItem = galleryItems.find((item) => item.id === itemId);
    revokePreviewUrl(currentItem?.preview);

    setError('');
    updateGalleryItem(itemId, {
      file,
      preview: createPreviewUrl(file),
    });
  };

  const removeGalleryItem = (itemId) => {
    setGalleryItems((current) => {
      const item = current.find((galleryItem) => galleryItem.id === itemId);
      revokePreviewUrl(item?.preview);

      const nextItems = current.filter((galleryItem) => galleryItem.id !== itemId);
      return nextItems.length > 0 ? nextItems : [createGalleryItem()];
    });
  };

  const uploadAdditionalImages = async (carId) => {
    const uploads = [];

    if (mainImageFile) {
      uploads.push(
        carsApi.uploadImage(
          carId,
          buildImagePayload({
            file: mainImageFile,
            angle: 'Utama',
            altText: `${form.name || 'Armada'} Rent & Go`,
            isPrimary: true,
            sortOrder: 0,
          }),
        ),
      );
    }

    galleryItems
      .filter((item) => item.file)
      .forEach((item, index) => {
        uploads.push(
          carsApi.uploadImage(
            carId,
            buildImagePayload({
              file: item.file,
              angle: item.angle,
              altText: item.altText || `${form.name || 'Armada'} ${item.angle}`,
              isPrimary: false,
              sortOrder: index + 1,
            }),
          ),
        );
      });

    await Promise.all(uploads);
  };

  const buildCreatePayload = () => {
    const data = new FormData();
    appendCarFields(data, form);

    let imageIndex = 0;
    if (mainImageFile) {
      appendCreateImage(data, imageIndex, mainImageFile, 'Utama', `${form.name || 'Armada'} Rent & Go`);
      imageIndex += 1;
    }

    galleryItems
      .filter((item) => item.file)
      .forEach((item) => {
        appendCreateImage(data, imageIndex, item.file, item.angle, item.altText || `${form.name || 'Armada'} ${item.angle}`);
        imageIndex += 1;
      });

    return data;
  };

  const handleDeleteExistingImage = async (imageId) => {
    if (!window.confirm('Hapus foto ini dari galeri armada?')) return;

    try {
      setError('');
      setNotice('');
      await carsApi.deleteImage(imageId);
      await fetchCarDetail();
      setNotice('Foto galeri berhasil dihapus.');
    } catch (deleteError) {
      setError(deleteError.response?.data?.message || 'Foto galeri belum berhasil dihapus.');
    }
  };

  const handleSetPrimaryImage = async (imageId) => {
    try {
      setError('');
      setNotice('');
      await carsApi.setPrimaryImage(imageId);
      await fetchCarDetail();
      setNotice('Foto utama berhasil diperbarui.');
    } catch (primaryError) {
      setError(primaryError.response?.data?.message || 'Foto utama belum berhasil diperbarui.');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSaving(true);
    setError('');
    setNotice('');

    try {
      if (mode === 'edit') {
        await carsApi.update(id, toCarPayload(form));
        await uploadAdditionalImages(id);
      } else {
        await carsApi.create(buildCreatePayload());
      }

      navigate('/admin/cars', { replace: true });
    } catch (submitError) {
      setError(submitError.response?.data?.message || 'Armada belum berhasil disimpan.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div>
      <AdminPageHeader
        title={mode === 'edit' ? 'Edit Armada' : 'Tambah Armada'}
        description={mode === 'edit' ? 'Perbarui informasi kendaraan, foto utama, dan galeri armada.' : 'Tambahkan model kendaraan baru beserta foto utama dan galeri per angle.'}
      >
        <Link
          to="/admin/cars"
          className="inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-slate-700 transition-colors duration-200 hover:border-slate-900 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
        >
          Kembali ke Daftar
        </Link>
      </AdminPageHeader>

      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
        {isLoading ? (
          <p className="py-10 text-center text-sm font-semibold text-slate-500">Memuat data armada...</p>
        ) : error && mode === 'edit' && !form.name ? (
          <p className="py-10 text-center text-sm font-semibold text-rose-700">{error}</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            {(error || notice) && (
              <p className={`rounded-xl px-4 py-3 text-sm font-semibold ${error ? 'bg-rose-50 text-rose-700' : 'bg-emerald-50 text-emerald-700'}`}>
                {error || notice}
              </p>
            )}

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormInput label="Nama Mobil" name="name" value={form.name} onChange={handleFieldChange} required />
              <FormSelect label="Kategori" name="category_id" value={form.category_id} onChange={handleFieldChange} options={categoryOptions} />
              <FormInput label="Slug" name="slug" value={form.slug} onChange={handleFieldChange} />
              <FormInput label="Transmisi" name="transmission" value={form.transmission} onChange={handleFieldChange} />
              <FormInput label="Harga Sewa" name="price_per_day" type="number" min="0" value={form.price_per_day} onChange={handleFieldChange} required />
              <FormInput label="Label Harga" name="price_label" value={form.price_label} onChange={handleFieldChange} />
              <FormInput label="Jumlah Kursi" name="seats" type="number" min="1" value={form.seats} onChange={handleFieldChange} />
              <FormInput label="Bahan Bakar" name="fuel_type" value={form.fuel_type} onChange={handleFieldChange} />
              <FormInput label="Rating" name="rating" type="number" min="0" max="5" step="0.1" value={form.rating} onChange={handleFieldChange} />
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <CheckboxField label="Featured di Beranda" name="is_featured" checked={form.is_featured} onChange={handleFieldChange} />
                <CheckboxField label="Aktif" name="is_active" checked={form.is_active} onChange={handleFieldChange} />
              </div>
              <FormTextarea label="Deskripsi Singkat" name="short_description" value={form.short_description} onChange={handleFieldChange} />
              <FormTextarea label="Deskripsi Detail" name="description" value={form.description} onChange={handleFieldChange} />
              <FormTextarea label="Fitur (pisahkan dengan koma)" name="features" value={form.features} onChange={handleFieldChange} />
            </div>

            <section className="rounded-3xl border border-slate-200 bg-slate-50/70 p-4 md:p-5">
              <div className="mb-4">
                <h2 className="text-xl font-extrabold text-slate-950">Foto Utama</h2>
                <p className="mt-1 text-sm leading-relaxed text-slate-500">
                  Gunakan foto utama yang akan tampil di kartu armada dan halaman katalog.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_280px]">
                <label className="flex min-h-52 cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-300 bg-white p-6 text-center transition-colors duration-200 hover:border-slate-900 focus-within:border-slate-900">
                  <UploadCloud className="mb-3 h-9 w-9 text-slate-400" aria-hidden="true" />
                  <span className="text-sm font-extrabold text-slate-900">Pilih Foto Utama</span>
                  <span className="mt-1 text-xs leading-relaxed text-slate-500">
                    JPG, JPEG, PNG, atau WEBP. Maksimal 2 MB.
                  </span>
                  {mainImageName && <span className="mt-3 text-xs font-bold text-slate-700">{mainImageName}</span>}
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleMainImageChange}
                    className="sr-only"
                  />
                </label>

                <ImagePreview
                  title={mainImagePreview ? 'Preview Foto Baru' : 'Foto Utama Saat Ini'}
                  src={mainImagePreview || getImageSrc(primaryImage)}
                  alt={form.name || 'Foto utama armada'}
                />
              </div>
            </section>

            {mode === 'edit' && galleryImages.length > 0 && (
              <section className="rounded-3xl border border-slate-200 bg-white p-4 md:p-5">
                <div className="mb-4">
                  <h2 className="text-xl font-extrabold text-slate-950">Galeri Tersimpan</h2>
                  <p className="mt-1 text-sm leading-relaxed text-slate-500">
                    Foto lama tetap tersimpan. Anda bisa menghapus foto angle atau menjadikannya foto utama.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {galleryImages.map((image) => {
                    const imageSrc = getImageSrc(image);

                    return (
                      <article key={image.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
                        <div className="relative aspect-video bg-slate-100">
                          {imageSrc ? (
                            <SafeImage
                              src={imageSrc}
                              alt={image.alt_text || form.name}
                              loading="lazy"
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center px-5 text-center text-xs font-bold text-slate-400">
                              Foto belum tersedia.
                            </div>
                          )}
                          {image.is_primary && (
                            <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-slate-950 px-3 py-1 text-xs font-bold text-white shadow-sm">
                              <Star size={13} aria-hidden="true" />
                              Foto Utama
                            </span>
                          )}
                        </div>
                        <div className="space-y-3 p-4">
                          <div>
                            <p className="text-sm font-extrabold text-slate-900">{image.angle || 'Lainnya'}</p>
                            <p className="mt-1 text-xs text-slate-500">{image.alt_text || `${form.name} Rent & Go`}</p>
                          </div>
                          <div className="flex flex-col gap-2 sm:flex-row">
                            {image.is_primary ? (
                              <span className="inline-flex min-h-10 flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-100 px-3 py-2 text-xs font-bold text-slate-600">
                                <Star size={14} aria-hidden="true" />
                                Aktif sebagai utama
                              </span>
                            ) : (
                              <button
                                type="button"
                                onClick={() => handleSetPrimaryImage(image.id)}
                                className="inline-flex min-h-10 flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 transition-colors hover:border-slate-900 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
                              >
                                <Star size={14} aria-hidden="true" />
                                Jadikan Utama
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={() => handleDeleteExistingImage(image.id)}
                              className="inline-flex min-h-10 flex-1 items-center justify-center gap-2 rounded-xl border border-rose-200 bg-white px-3 py-2 text-xs font-bold text-rose-700 transition-colors hover:bg-rose-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-700 focus-visible:ring-offset-2"
                            >
                              <Trash2 size={14} aria-hidden="true" />
                              Hapus
                            </button>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </section>
            )}

            <section className="rounded-3xl border border-slate-200 bg-slate-50/70 p-4 md:p-5">
              <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-xl font-extrabold text-slate-950">Galeri Foto Armada</h2>
                  <p className="mt-1 text-sm leading-relaxed text-slate-500">
                    Tambahkan foto per angle untuk halaman detail armada.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={addGalleryItem}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-bold text-white transition-colors duration-200 hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
                >
                  <Plus size={17} aria-hidden="true" />
                  Tambah Foto Angle
                </button>
              </div>

              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
                {galleryItems.map((item, index) => (
                  <article key={item.id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                    <div className="mb-4 flex items-center justify-between gap-3">
                      <h3 className="text-sm font-extrabold text-slate-900">Foto Angle {index + 1}</h3>
                      <button
                        type="button"
                        onClick={() => removeGalleryItem(item.id)}
                        className="rounded-lg p-2 text-rose-600 transition-colors hover:bg-rose-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-700"
                        aria-label={`Hapus foto angle ${index + 1}`}
                      >
                        <Trash2 size={17} aria-hidden="true" />
                      </button>
                    </div>

                    <label className="mb-4 flex aspect-video cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 text-center transition-colors hover:border-slate-900">
                      {item.preview ? (
                        <SafeImage
                          src={item.preview}
                          alt={item.altText || `Preview foto ${item.angle}`}
                          className="h-full w-full rounded-2xl object-cover"
                        />
                      ) : (
                        <span className="px-4 text-xs font-bold text-slate-500">
                          Upload gambar angle
                        </span>
                      )}
                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        onChange={(event) => handleGalleryFileChange(item.id, event)}
                        className="sr-only"
                      />
                    </label>

                    <div className="space-y-3">
                      <label className="block">
                        <span className="mb-2 block text-sm font-bold text-slate-700">Angle</span>
                        <select
                          value={item.angle}
                          onChange={(event) => updateGalleryItem(item.id, { angle: event.target.value })}
                          className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                        >
                          {imageAngles.map((angle) => (
                            <option key={angle} value={angle}>{angle}</option>
                          ))}
                        </select>
                      </label>

                      <label className="block">
                        <span className="mb-2 block text-sm font-bold text-slate-700">Alt Text</span>
                        <input
                          type="text"
                          value={item.altText}
                          onChange={(event) => updateGalleryItem(item.id, { altText: event.target.value })}
                          placeholder={`${form.name || 'Toyota Agya'} tampak ${item.angle.toLowerCase()}`}
                          className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                        />
                      </label>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="submit"
                disabled={isSaving}
                className="inline-flex min-h-11 items-center justify-center rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-bold text-white transition-colors duration-200 hover:bg-slate-800 disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
              >
                {isSaving ? 'Menyimpan...' : mode === 'edit' ? 'Simpan Perubahan' : 'Simpan Armada'}
              </button>
              <Link
                to="/admin/cars"
                className="inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-bold text-slate-700 transition-colors duration-200 hover:border-slate-900 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
              >
                Batal
              </Link>
            </div>
          </form>
        )}
      </section>
    </div>
  );
};

const FormInput = ({ label, ...props }) => (
  <label className="block">
    <span className="mb-2 block text-sm font-bold text-slate-700">{label}</span>
    <input
      {...props}
      className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
    />
  </label>
);

const FormTextarea = ({ label, ...props }) => (
  <label className="block md:col-span-2">
    <span className="mb-2 block text-sm font-bold text-slate-700">{label}</span>
    <textarea
      {...props}
      rows={4}
      className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
    />
  </label>
);

const FormSelect = ({ label, options, ...props }) => (
  <label className="block">
    <span className="mb-2 block text-sm font-bold text-slate-700">{label}</span>
    <select
      {...props}
      className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
    >
      <option value="">Pilih {label}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>{option.label}</option>
      ))}
    </select>
  </label>
);

const CheckboxField = ({ label, checked, onChange, name }) => (
  <label className="flex min-h-12 items-center gap-3 rounded-xl border border-slate-200 px-4 py-3">
    <input
      type="checkbox"
      name={name}
      checked={checked}
      onChange={onChange}
      className="h-5 w-5 rounded border-slate-300 text-slate-900 focus:ring-slate-900"
    />
    <span className="text-sm font-bold text-slate-700">{label}</span>
  </label>
);

const ImagePreview = ({ title, src, alt }) => (
  <div className="rounded-3xl border border-slate-200 bg-white p-3">
    <p className="mb-3 text-sm font-extrabold text-slate-900">{title}</p>
    <div className="aspect-video overflow-hidden rounded-2xl bg-slate-100">
      {src ? (
        <SafeImage src={src} alt={alt} className="h-full w-full object-cover" />
      ) : (
        <div className="flex h-full items-center justify-center px-6 text-center text-xs font-bold text-slate-400">
          Belum ada foto utama.
        </div>
      )}
    </div>
  </div>
);

export default AdminCars;
