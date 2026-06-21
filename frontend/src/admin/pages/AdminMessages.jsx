import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import { messagesApi } from '../../api/messagesApi';
import AdminPageHeader from '../components/AdminPageHeader';
import StatusBadge from '../components/StatusBadge';
import { formatDate } from '../utils/formatters';

const statuses = ['new', 'read', 'processing', 'done'];

const actionButtonClass =
  'inline-flex min-h-9 items-center justify-center rounded-lg border px-3 py-2 text-xs font-bold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2';

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const loadMessages = useCallback(async () => {
    setIsLoading(true);
    setError('');

    try {
      const response = await messagesApi.list({ per_page: 100 });
      setMessages(response.data || []);
    } catch (loadError) {
      setError(loadError.response?.data?.message || 'Pesan belum berhasil dimuat.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    let isActive = true;

    queueMicrotask(() => {
      if (isActive) {
        loadMessages();
      }
    });

    return () => {
      isActive = false;
    };
  }, [loadMessages]);

  const filteredMessages = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return messages;

    return messages.filter((item) =>
      [item.name, item.email, item.phone, item.subject, item.status]
        .some((value) => String(value || '').toLowerCase().includes(query)),
    );
  }, [messages, search]);

  const updateStatus = async (id, status) => {
    await messagesApi.updateStatus(id, status);
    setMessage('Status pesan berhasil diperbarui.');
    await loadMessages();
  };

  const remove = async (id) => {
    if (!window.confirm('Hapus pesan ini?')) return;

    await messagesApi.remove(id);
    setMessage('Pesan berhasil dihapus.');
    await loadMessages();
  };

  return (
    <div>
      <AdminPageHeader
        title="Daftar Pesan"
        description="Kelola pesan yang dikirim dari form kontak website publik."
      />

      <section className="mb-5 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
        <label className="block">
          <span className="sr-only">Cari pesan</span>
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Cari pesan..."
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
                <th className="px-5 py-4 text-left font-extrabold text-slate-700">No</th>
                <th className="px-5 py-4 text-left font-extrabold text-slate-700">Nama Pengirim</th>
                <th className="px-5 py-4 text-left font-extrabold text-slate-700">Email</th>
                <th className="px-5 py-4 text-left font-extrabold text-slate-700">Nomor HP</th>
                <th className="px-5 py-4 text-left font-extrabold text-slate-700">Subjek</th>
                <th className="px-5 py-4 text-left font-extrabold text-slate-700">Status</th>
                <th className="px-5 py-4 text-left font-extrabold text-slate-700">Tanggal Masuk</th>
                <th className="px-5 py-4 text-right font-extrabold text-slate-700">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr>
                  <td colSpan={8} className="px-5 py-8 text-center text-slate-500">Memuat pesan...</td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={8} className="px-5 py-8 text-center text-rose-600">{error}</td>
                </tr>
              ) : filteredMessages.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-5 py-8 text-center text-slate-500">Belum ada pesan yang cocok.</td>
                </tr>
              ) : (
                filteredMessages.map((item, index) => (
                  <tr key={item.id} className="hover:bg-slate-50/70">
                    <td className="px-5 py-4 align-top text-slate-700">{index + 1}</td>
                    <td className="px-5 py-4 align-top font-extrabold text-slate-950">{item.name}</td>
                    <td className="px-5 py-4 align-top text-slate-600">{item.email || '-'}</td>
                    <td className="px-5 py-4 align-top text-slate-600">{item.phone || '-'}</td>
                    <td className="px-5 py-4 align-top text-slate-600">{item.subject || '-'}</td>
                    <td className="px-5 py-4 align-top">
                      <div className="space-y-2">
                        <StatusBadge value={item.status} />
                        <select
                          value={item.status}
                          onChange={(event) => updateStatus(item.id, event.target.value)}
                          aria-label={`Ubah status pesan dari ${item.name}`}
                          className="block rounded-lg border border-slate-200 px-2 py-1 text-xs font-semibold focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                        >
                          {statuses.map((status) => (
                            <option key={status} value={status}>{status}</option>
                          ))}
                        </select>
                      </div>
                    </td>
                    <td className="px-5 py-4 align-top text-slate-600">{formatDate(item.created_at)}</td>
                    <td className="px-5 py-4 text-right align-top">
                      <div className="flex justify-end gap-2">
                        <Link
                          to={`/admin/messages/${item.id}`}
                          className={`${actionButtonClass} border-slate-200 text-slate-700 hover:border-slate-900 hover:text-slate-900`}
                        >
                          Detail
                        </Link>
                        <button
                          type="button"
                          onClick={() => remove(item.id)}
                          className={`${actionButtonClass} border-rose-200 text-rose-700 hover:bg-rose-50`}
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

export const AdminMessageDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  useEffect(() => {
    let isActive = true;

    queueMicrotask(() => {
      if (isActive) {
        setIsLoading(true);
        setError('');
      }
    });

    messagesApi
      .detail(id)
      .then((response) => {
        if (isActive) {
          setMessage(response.data);
        }
      })
      .catch((loadError) => {
        if (isActive) {
          setError(loadError.response?.data?.message || 'Pesan tidak ditemukan.');
        }
      })
      .finally(() => {
        if (isActive) {
          setIsLoading(false);
        }
      });

    return () => {
      isActive = false;
    };
  }, [id]);

  const updateStatus = async (status) => {
    await messagesApi.updateStatus(id, status);
    setMessage((current) => ({ ...current, status }));
    setNotice('Status pesan berhasil diperbarui.');
  };

  const remove = async () => {
    if (!window.confirm('Hapus pesan ini?')) return;
    await messagesApi.remove(id);
    navigate('/admin/messages', { replace: true });
  };

  return (
    <div>
      <AdminPageHeader
        title="Detail Pesan"
        description="Lihat detail pesan pelanggan dan perbarui status tindak lanjut."
      >
        <Link
          to="/admin/messages"
          className="inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-slate-700 transition-colors duration-200 hover:border-slate-900 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
        >
          Kembali ke Daftar
        </Link>
      </AdminPageHeader>

      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
        {isLoading ? (
          <p className="py-10 text-center text-sm font-semibold text-slate-500">Memuat pesan...</p>
        ) : error ? (
          <p className="py-10 text-center text-sm font-semibold text-rose-700">{error}</p>
        ) : (
          <div className="space-y-6">
            {notice && <p className="rounded-xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">{notice}</p>}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <InfoBlock label="Nama" value={message.name} />
              <InfoBlock label="Email" value={message.email || '-'} />
              <InfoBlock label="Nomor HP" value={message.phone || '-'} />
              <InfoBlock label="Subjek" value={message.subject || '-'} />
              <InfoBlock label="Tanggal Masuk" value={formatDate(message.created_at)} />
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Status</p>
                <div className="flex flex-wrap items-center gap-3">
                  <StatusBadge value={message.status} />
                  <select
                    value={message.status}
                    onChange={(event) => updateStatus(event.target.value)}
                    aria-label="Ubah status pesan"
                    className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                  >
                    {statuses.map((status) => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Isi Pesan</p>
              <p className="whitespace-pre-line leading-relaxed text-slate-700">{message.message}</p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                to="/admin/messages"
                className="inline-flex min-h-11 items-center justify-center rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-bold text-white transition-colors duration-200 hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
              >
                Kembali
              </Link>
              <button
                type="button"
                onClick={remove}
                className="inline-flex min-h-11 items-center justify-center rounded-xl border border-rose-200 px-5 py-2.5 text-sm font-bold text-rose-700 transition-colors duration-200 hover:bg-rose-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-700 focus-visible:ring-offset-2"
              >
                Hapus Pesan
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

const InfoBlock = ({ label, value }) => (
  <div className="rounded-2xl bg-slate-50 p-4">
    <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-slate-400">{label}</p>
    <p className="font-semibold text-slate-800">{value}</p>
  </div>
);

export default AdminMessages;
