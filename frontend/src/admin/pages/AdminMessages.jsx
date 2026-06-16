import { useCallback, useEffect, useState } from 'react';
import { messagesApi } from '../../api/messagesApi';
import AdminPageHeader from '../components/AdminPageHeader';
import StatusBadge from '../components/StatusBadge';
import { formatDate } from '../utils/formatters';

const statuses = ['new', 'read', 'processing', 'done'];

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadMessages = useCallback(async () => {
    setIsLoading(true);
    const response = await messagesApi.list({ per_page: 100 });
    setMessages(response.data || []);
    setIsLoading(false);
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

  const updateStatus = async (id, status) => {
    await messagesApi.updateStatus(id, status);
    await loadMessages();
  };

  const remove = async (id) => {
    if (!window.confirm('Hapus pesan ini?')) return;
    await messagesApi.remove(id);
    await loadMessages();
  };

  return (
    <div>
      <AdminPageHeader
        title="Pesan Kontak"
        description="Kelola pesan yang dikirim dari form kontak website publik."
      />

      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-5 py-4 text-left font-extrabold text-slate-700">Pengirim</th>
                <th className="px-5 py-4 text-left font-extrabold text-slate-700">Kontak</th>
                <th className="px-5 py-4 text-left font-extrabold text-slate-700">Pesan</th>
                <th className="px-5 py-4 text-left font-extrabold text-slate-700">Status</th>
                <th className="px-5 py-4 text-left font-extrabold text-slate-700">Tanggal</th>
                <th className="px-5 py-4 text-right font-extrabold text-slate-700">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="px-5 py-8 text-center text-slate-500">Memuat pesan...</td>
                </tr>
              ) : messages.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-8 text-center text-slate-500">Belum ada pesan.</td>
                </tr>
              ) : (
                messages.map((message) => (
                  <tr key={message.id} className="hover:bg-slate-50/70">
                    <td className="px-5 py-4 align-top">
                      <p className="font-extrabold text-slate-950">{message.name}</p>
                      <p className="text-slate-500">{message.subject || '-'}</p>
                    </td>
                    <td className="px-5 py-4 align-top text-slate-600">
                      <p>{message.email || '-'}</p>
                      <p>{message.phone || '-'}</p>
                    </td>
                    <td className="max-w-sm px-5 py-4 align-top text-slate-600">
                      {message.message}
                    </td>
                    <td className="px-5 py-4 align-top">
                      <div className="space-y-2">
                        <StatusBadge value={message.status} />
                        <select
                          value={message.status}
                          onChange={(event) => updateStatus(message.id, event.target.value)}
                          className="block rounded-lg border border-slate-200 px-2 py-1 text-xs font-semibold focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                        >
                          {statuses.map((status) => (
                            <option key={status} value={status}>{status}</option>
                          ))}
                        </select>
                      </div>
                    </td>
                    <td className="px-5 py-4 align-top text-slate-600">{formatDate(message.created_at)}</td>
                    <td className="px-5 py-4 text-right align-top">
                      <button
                        type="button"
                        onClick={() => remove(message.id)}
                        className="rounded-lg border border-rose-200 px-3 py-2 text-xs font-bold text-rose-700 hover:bg-rose-50"
                      >
                        Hapus
                      </button>
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

export default AdminMessages;
