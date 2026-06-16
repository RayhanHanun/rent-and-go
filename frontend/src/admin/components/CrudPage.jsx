import { useCallback, useEffect, useMemo, useState } from 'react';
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

const CrudPage = ({
  title,
  description,
  api,
  fields,
  columns,
  initialForm,
  normalizeBeforeSubmit = (value) => value,
  getId = defaultGetId,
}) => {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editing, setEditing] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');

  const visibleFields = useMemo(() => fields.filter((field) => !field.hidden), [fields]);

  const loadItems = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await api.list({ per_page: 100 });
      setItems(response.data || []);
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

  const resetForm = () => {
    setForm(initialForm);
    setEditing(null);
    setMessage('');
  };

  const handleChange = (field, event) => {
    const { type, checked, value, files } = event.target;
    const nextValue = field.type === 'file' || field.type === 'multifile'
      ? files
      : type === 'checkbox'
        ? checked
        : value;

    setForm((current) => ({ ...current, [field.name]: nextValue }));
  };

  const handleEdit = (item) => {
    const nextForm = { ...initialForm };
    fields.forEach((field) => {
      if (['file', 'multifile'].includes(field.type)) return;
      nextForm[field.name] = field.readFrom
        ? getNestedValue(item, field.readFrom)
        : item[field.name] ?? initialForm[field.name];
    });

    setEditing(item);
    setForm(nextForm);
    setMessage('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSaving(true);
    setMessage('');

    try {
      const normalized = normalizeBeforeSubmit(form);
      const payload = toPayload(fields, normalized);

      if (editing) {
        await api.update(getId(editing), payload);
        setMessage('Data berhasil diperbarui.');
      } else {
        await api.create(payload);
        setMessage('Data berhasil dibuat.');
      }

      resetForm();
      await loadItems();
    } catch (error) {
      setMessage(error.response?.data?.message || 'Data belum berhasil disimpan.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (item) => {
    if (!window.confirm('Hapus data ini?')) return;

    await api.remove(getId(item));
    await loadItems();
  };

  return (
    <div>
      <AdminPageHeader title={title} description={description} />

      <section className="mb-8 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
        <h2 className="mb-5 text-xl font-extrabold text-slate-950">
          {editing ? 'Edit Data' : 'Tambah Data'}
        </h2>
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
                <input
                  type="checkbox"
                  checked={Boolean(form[field.name])}
                  onChange={(event) => handleChange(field, event)}
                  className="h-5 w-5 rounded border-slate-300 text-slate-900 focus:ring-slate-900"
                />
              ) : (
                <input
                  type={field.type || 'text'}
                  value={['file', 'multifile'].includes(field.type) ? undefined : form[field.name] || ''}
                  multiple={field.type === 'multifile'}
                  required={field.required && !editing}
                  onChange={(event) => handleChange(field, event)}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
              )}
            </label>
          ))}

          <div className="flex flex-col gap-3 md:col-span-2 sm:flex-row">
            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex min-h-11 items-center justify-center rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-bold text-white transition-colors duration-200 hover:bg-slate-800 disabled:opacity-60"
            >
              {isSaving ? 'Menyimpan...' : editing ? 'Simpan Perubahan' : 'Tambah Data'}
            </button>
            {editing && (
              <button
                type="button"
                onClick={resetForm}
                className="inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-bold text-slate-700 transition-colors duration-200 hover:border-slate-900 hover:text-slate-900"
              >
                Batal Edit
              </button>
            )}
          </div>
          {message && <p className="text-sm font-semibold text-slate-600 md:col-span-2">{message}</p>}
        </form>
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
              ) : items.length === 0 ? (
                <tr>
                  <td colSpan={columns.length + 1} className="px-5 py-8 text-center text-slate-500">
                    Belum ada data.
                  </td>
                </tr>
              ) : (
                items.map((item) => (
                  <tr key={getId(item)} className="hover:bg-slate-50/70">
                    {columns.map((column) => (
                      <td key={column.label} className="px-5 py-4 align-top text-slate-700">
                        {column.render
                          ? column.render(item)
                          : getNestedValue(item, column.accessor) || '-'}
                      </td>
                    ))}
                    <td className="px-5 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => handleEdit(item)}
                          className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold text-slate-700 hover:border-slate-900 hover:text-slate-900"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(item)}
                          className="rounded-lg border border-rose-200 px-3 py-2 text-xs font-bold text-rose-700 hover:bg-rose-50"
                        >
                          Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default CrudPage;
