import { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { authApi } from '../../api/authApi';
import { getAdminToken, setAdminSession } from '../../api/authStorage';

const AdminLogin = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  if (getAdminToken()) {
    return <Navigate to="/admin" replace />;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await authApi.login(form);
      setAdminSession(response.data);
      navigate(location.state?.from?.pathname || '/admin', { replace: true });
    } catch (loginError) {
      setError(loginError.response?.data?.message || 'Login belum berhasil.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-12">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white p-8 shadow-2xl">
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-slate-500">
          Admin Dashboard
        </p>
        <h1 className="mb-2 text-3xl font-extrabold text-slate-950">Masuk Rent & Go</h1>
        <p className="mb-8 text-sm leading-relaxed text-slate-500">
          Masuk untuk mengelola armada, rental, layanan, laporan, dan operasional Rent & Go.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <label className="block">
            <span className="mb-2 block text-sm font-bold text-slate-700">Email</span>
            <input
              type="email"
              value={form.email}
              onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
              required
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-bold text-slate-700">Password</span>
            <input
              type="password"
              value={form.password}
              onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
              required
            />
          </label>

          {error && (
            <p className="rounded-xl bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-slate-900 px-5 py-3 font-bold text-white transition-colors duration-200 hover:bg-slate-800 disabled:opacity-60"
          >
            {isLoading ? 'Memproses...' : 'Masuk Dashboard'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
