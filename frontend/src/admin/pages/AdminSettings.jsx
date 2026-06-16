import { useEffect, useState } from 'react';
import { settingsApi } from '../../api/settingsApi';
import AdminPageHeader from '../components/AdminPageHeader';

const defaultSettings = [
  { key: 'site_name', label: 'Nama Website', value: 'Rent & Go', type: 'text' },
  { key: 'whatsapp_number', label: 'Nomor WhatsApp', value: '628812704174', type: 'text' },
  { key: 'email', label: 'Email', value: 'rentalmobilngo@gmail.com', type: 'text' },
  { key: 'address', label: 'Alamat', value: '', type: 'textarea' },
  { key: 'operating_hours', label: 'Jam Operasional', value: '', type: 'textarea' },
  { key: 'google_maps_url', label: 'Google Maps URL', value: '', type: 'text' },
  { key: 'instagram_url', label: 'Instagram URL', value: '', type: 'text' },
  { key: 'tiktok_url', label: 'TikTok URL', value: '', type: 'text' },
  { key: 'footer_description', label: 'Deskripsi Footer', value: '', type: 'textarea' },
];

const AdminSettings = () => {
  const [settings, setSettings] = useState(defaultSettings);
  const [message, setMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    let isMounted = true;

    settingsApi.list().then((response) => {
      if (!isMounted) return;

      const values = new Map((response.data || []).map((item) => [item.key, item]));
      setSettings(defaultSettings.map((setting) => ({
        ...setting,
        value: values.get(setting.key)?.value ?? setting.value,
        type: values.get(setting.key)?.type ?? setting.type,
      })));
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const updateValue = (key, value) => {
    setSettings((current) =>
      current.map((setting) => (setting.key === key ? { ...setting, value } : setting)),
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSaving(true);
    setMessage('');

    try {
      await settingsApi.update(settings.map(({ key, value, type }) => ({ key, value, type })));
      setMessage('Pengaturan berhasil disimpan.');
    } catch {
      setMessage('Pengaturan belum berhasil disimpan.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div>
      <AdminPageHeader
        title="Pengaturan Website"
        description="Kelola data kontak, WhatsApp, alamat, jam operasional, dan teks footer website publik."
      />

      <form onSubmit={handleSubmit} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {settings.map((setting) => (
            <label key={setting.key} className={setting.type === 'textarea' ? 'md:col-span-2' : ''}>
              <span className="mb-2 block text-sm font-bold text-slate-700">{setting.label}</span>
              {setting.type === 'textarea' ? (
                <textarea
                  rows={4}
                  value={setting.value || ''}
                  onChange={(event) => updateValue(setting.key, event.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
              ) : (
                <input
                  value={setting.value || ''}
                  onChange={(event) => updateValue(setting.key, event.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
              )}
            </label>
          ))}
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <button
            type="submit"
            disabled={isSaving}
            className="inline-flex min-h-11 items-center justify-center rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-bold text-white transition-colors duration-200 hover:bg-slate-800 disabled:opacity-60"
          >
            {isSaving ? 'Menyimpan...' : 'Simpan Pengaturan'}
          </button>
          {message && <p className="text-sm font-semibold text-slate-600">{message}</p>}
        </div>
      </form>
    </div>
  );
};

export default AdminSettings;
