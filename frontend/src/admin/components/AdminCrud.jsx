import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Plus, Search } from 'lucide-react';
import AdminPageHeader from './AdminPageHeader';
import { getNestedValue } from '../utils/formatters';

const defaultGetId = (item) => item.id;

const hasFileValue = (fields, form) =>
  fields.some((field) => {
    const value = form[field.name];
    return ['file', 'multifile'].includes(field.type) && value && value.length !== 0;
  });

const toPayload = (fields, form) => {
  if (!hasFileValue(fields, form)) {
    return form;
  }

  const data = new FormData();
  fields.forEach((field) => {
    const value = form[field.name];

    if (field.type === 'multifile') {
      Array.from(value || []).forEach((file) => data.append(`${field.name}[]`, file));
      return;
    }

    if (field.type === 'file') {
      if (value?.[0]) data.append(field.name, value[0]);
      return;
    }

    if (field.type === 'checkbox') {
      data.append(field.name, value ? '1' : '0');
      return;
    }

    if (value !== undefined && value !== null) {
      data.append(field.name, value);
    }
  });

  return data;
};

const normalizeInputValue = (field, value, fallback) => {
  if (value === undefined || value === null) return fallback ?? '';
  if (field.type === 'date') return String(value).slice(0, 10);
  if (field.type === 'datetime-local') return String(value).slice(0, 16);
  return value;
};

const readFieldValue = (item, field, initialForm) => {
  if (['file', 'multifile'].includes(field.type)) return initialForm[field.name];

  const value = field.readFrom
    ? getNestedValue(item, field.readFrom)
    : item[field.name];

  return normalizeInputValue(field, value, initialForm[field.name]);
};

const buildEditForm = (fields, initialForm, item) => {
  const nextForm = { ...initialForm };

  fields.forEach((field) => {
    nextForm[field.name] = readFieldValue(item, field, initialForm);
  });

  return nextForm;
};

const getSearchText = (item, key) => {
  if (typeof key === 'function') return key(item);
  return getNestedValue(item, key);
};

const actionButtonClass =
  'inline-flex min-h-9 items-center justify-center rounded-lg border px-3 py-2 text-xs font-bold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2';

export const AdminCrudList = ({
  title,
  description,
  api,
  columns,
  basePath,
  createLabel,
  searchPlaceholder = 'Cari data...',
  searchKeys = [],
  getId = defaultGetId,
}) => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [search, setSearch] = useState('');

  const loadItems = useCallback(async () => {
    setIsLoading(true);
    setError('');

    try {
      const response = await api.list({ per_page: 100 });
      setItems(response.data || []);
    } catch (loadError) {
      setError(loadError.response?.data?.message || 'Data belum berhasil dimuat.');
    } finally {
      setIsLoading(false);
    }
  }, [api]);

  useEffect(() => {
    let isActive = true;

    queueMicrotask(() => {
      if (isActive) {
        loadItems();
      }
    });

    return () => {
      isActive = false;
    };
  }, [loadItems]);

  const filteredItems = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return items;

    const keys = searchKeys.length > 0 ? searchKeys : columns.map((column) => column.accessor).filter(Boolean);

    return items.filter((item) =>
      keys.some((key) => String(getSearchText(item, key) || '').toLowerCase().includes(query)),
    );
  }, [columns, items, search, searchKeys]);

  const handleDelete = async (item) => {
    if (!window.confirm('Hapus data ini?')) return;

    try {
      await api.remove(getId(item));
      setMessage('Data berhasil dihapus.');
      await loadItems();
    } catch (deleteError) {
      setError(deleteError.response?.data?.message || 'Data belum berhasil dihapus.');
    }
  };

  return (
    <div>
      <AdminPageHeader title={title} description={description}>
        <Link
          to={`${basePath}/tambah`}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-colors duration-200 hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
        >
          <Plus size={17} aria-hidden="true" />
          {createLabel}
        </Link>
      </AdminPageHeader>

      <section className="mb-5 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
        <label className="block">
          <span className="sr-only">{searchPlaceholder}</span>
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={searchPlaceholder}
              className="min-h-11 w-full rounded-2xl border border-slate-200 bg-slate-50 py-2.5 pl-11 pr-4 text-sm font-semibold text-slate-700 outline-none transition-colors duration-200 placeholder:text-slate-400 focus:border-slate-900 focus:bg-white focus:ring-2 focus:ring-slate-900"
            />
          </div>
        </label>
        {(message || error) && (
          <p className={`mt-3 text-sm font-semibold ${error ? 'text-rose-700' : 'text-emerald-700'}`}>
            {error || message}
          </p>
        )}
      </section>

      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-sm">
            <thead className="bg-slate-50">
              <tr>
                {columns.map((column) => (
                  <th key={column.label} className="px-5 py-4 text-left font-extrabold text-slate-700">
                    {column.label}
                  </th>
                ))}
                <th className="px-5 py-4 text-right font-extrabold text-slate-700">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr>
                  <td colSpan={columns.length + 1} className="px-5 py-8 text-center text-slate-500">
                    Memuat data...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={columns.length + 1} className="px-5 py-8 text-center text-rose-600">
                    {error}
                  </td>
                </tr>
              ) : filteredItems.length === 0 ? (
                <tr>
                  <td colSpan={columns.length + 1} className="px-5 py-8 text-center text-slate-500">
                    Tidak ada data yang cocok.
                  </td>
                </tr>
              ) : (
                filteredItems.map((item, index) => {
                  const id = getId(item);

                  return (
                    <tr key={id} className="hover:bg-slate-50/70">
                      {columns.map((column) => (
                        <td key={column.label} className="px-5 py-4 align-top text-slate-700">
                          {column.render
                            ? column.render(item, index)
                            : getNestedValue(item, column.accessor) || '-'}
                        </td>
                      ))}
                      <td className="px-5 py-4 text-right align-top">
                        <div className="flex justify-end gap-2">
                          <Link
                            to={`${basePath}/edit/${id}`}
                            className={`${actionButtonClass} border-slate-200 text-slate-700 hover:border-slate-900 hover:text-slate-900`}
                          >
                            Edit
                          </Link>
                          <button
                            type="button"
                            onClick={() => handleDelete(item)}
                            className={`${actionButtonClass} border-rose-200 text-rose-700 hover:bg-rose-50`}
                          >
                            Hapus
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export const AdminCrudForm = ({
  mode,
  title,
  description,
  api,
  fields,
  initialForm,
  backTo,
  submitLabel,
  normalizeBeforeSubmit = (value) => value,
}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [isLoading, setIsLoading] = useState(mode === 'edit');
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  const visibleFields = useMemo(() => fields.filter((field) => !field.hidden), [fields]);

  useEffect(() => {
    if (mode !== 'edit') {
      return undefined;
    }

    let isActive = true;

    queueMicrotask(() => {
      if (isActive) {
        setIsLoading(true);
        setError('');
      }
    });

    api
      .detail(id)
      .then((response) => {
        if (!isActive) return;
        setForm(buildEditForm(fields, initialForm, response.data || {}));
      })
      .catch((loadError) => {
        if (!isActive) return;
        setError(loadError.response?.data?.message || 'Data tidak ditemukan.');
      })
      .finally(() => {
        if (isActive) {
          setIsLoading(false);
        }
      });

    return () => {
      isActive = false;
    };
  }, [api, fields, id, initialForm, mode]);

  const handleChange = (field, event) => {
    const { type, checked, value, files } = event.target;
    const nextValue = field.type === 'file' || field.type === 'multifile'
      ? files
      : type === 'checkbox'
        ? checked
        : value;

    setForm((current) => ({ ...current, [field.name]: nextValue }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSaving(true);
    setError('');

    try {
      const normalized = normalizeBeforeSubmit(form);
      const payload = toPayload(fields, normalized);

      if (mode === 'edit') {
        await api.update(id, payload);
      } else {
        await api.create(payload);
      }

      navigate(backTo, { replace: true });
    } catch (submitError) {
      setError(submitError.response?.data?.message || 'Data belum berhasil disimpan.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div>
      <AdminPageHeader title={title} description={description}>
        <Link
          to={backTo}
          className="inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-slate-700 transition-colors duration-200 hover:border-slate-900 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
        >
          Kembali ke Daftar
        </Link>
      </AdminPageHeader>

      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
        {isLoading ? (
          <p className="py-10 text-center text-sm font-semibold text-slate-500">Memuat data...</p>
        ) : error && mode === 'edit' ? (
          <p className="py-10 text-center text-sm font-semibold text-rose-700">{error}</p>
        ) : (
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {visibleFields.map((field) => (
              <label key={field.name} className={field.full ? 'md:col-span-2' : ''}>
                <span className="mb-2 block text-sm font-bold text-slate-700">{field.label}</span>
                {field.type === 'textarea' ? (
                  <textarea
                    rows={4}
                    value={form[field.name] || ''}
                    required={field.required}
                    onChange={(event) => handleChange(field, event)}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                ) : field.type === 'select' ? (
                  <select
                    value={form[field.name] ?? ''}
                    required={field.required}
                    onChange={(event) => handleChange(field, event)}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                  >
                    <option value="">Pilih {field.label}</option>
                    {(field.options || []).map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                ) : field.type === 'checkbox' ? (
                  <div className="flex min-h-12 items-center gap-3 rounded-xl border border-slate-200 px-4 py-3">
                    <input
                      type="checkbox"
                      checked={Boolean(form[field.name])}
                      onChange={(event) => handleChange(field, event)}
                      className="h-5 w-5 rounded border-slate-300 text-slate-900 focus:ring-slate-900"
                    />
                    <span className="text-sm font-semibold text-slate-600">Aktifkan opsi ini</span>
                  </div>
                ) : (
                  <input
                    type={field.type || 'text'}
                    value={['file', 'multifile'].includes(field.type) ? undefined : form[field.name] || ''}
                    multiple={field.type === 'multifile'}
                    required={field.required && (mode !== 'edit' || !['file', 'multifile'].includes(field.type))}
                    onChange={(event) => handleChange(field, event)}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                )}
              </label>
            ))}

            {error && <p className="text-sm font-semibold text-rose-700 md:col-span-2">{error}</p>}

            <div className="flex flex-col gap-3 md:col-span-2 sm:flex-row">
              <button
                type="submit"
                disabled={isSaving}
                className="inline-flex min-h-11 items-center justify-center rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-bold text-white transition-colors duration-200 hover:bg-slate-800 disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
              >
                {isSaving ? 'Menyimpan...' : submitLabel}
              </button>
              <Link
                to={backTo}
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
