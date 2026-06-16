import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  BarChart3,
  Car,
  ClipboardList,
  FolderKanban,
  LayoutDashboard,
  LogOut,
  Mail,
  Menu,
  MessageSquare,
  Settings,
  Tag,
  Wrench,
  X,
} from 'lucide-react';
import { authApi } from '../../api/authApi';
import { clearAdminSession, getAdminUser } from '../../api/authStorage';

const navItems = [
  { label: 'Dashboard', to: '/admin/dashboard', icon: LayoutDashboard, end: true },
  { label: 'Rental', to: '/admin/rental', icon: ClipboardList },
  { label: 'Armada', to: '/admin/armada', icon: Car },
  { label: 'Kategori', to: '/admin/kategori', icon: Tag },
  { label: 'Unit', to: '/admin/unit', icon: FolderKanban },
  { label: 'Tracking', to: '/admin/tracking', icon: BarChart3 },
  { label: 'Maintenance', to: '/admin/maintenance', icon: Wrench },
  { label: 'Pesan', to: '/admin/pesan', icon: Mail },
  { label: 'Layanan', to: '/admin/layanan', icon: MessageSquare },
  { label: 'Laporan', to: '/admin/laporan', icon: BarChart3 },
  { label: 'Pengaturan', to: '/admin/pengaturan', icon: Settings },
];

const AdminLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const user = getAdminUser();

  const logout = async () => {
    try {
      await authApi.logout();
    } catch {
      // Token may already be expired; clearing local session is enough.
    } finally {
      clearAdminSession();
      navigate('/admin/login', { replace: true });
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 transform border-r border-slate-200 bg-slate-950 text-white transition-transform duration-200 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-white/10 px-5">
          <div>
            <p className="text-lg font-extrabold">Rent & Go</p>
            <p className="text-xs text-slate-400">Admin Dashboard</p>
          </div>
          <button
            type="button"
            className="rounded-lg p-2 text-slate-300 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white lg:hidden"
            aria-label="Tutup menu admin"
            onClick={() => setIsOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        <nav className="space-y-1 px-3 py-5">
          {navItems.map(({ label, to, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                  isActive
                    ? 'bg-white text-slate-950'
                    : 'text-slate-300 hover:bg-white/10 hover:text-white'
                }`
              }
            >
              <Icon size={18} aria-hidden="true" />
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>

      {isOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-slate-950/50 lg:hidden"
          aria-label="Tutup overlay menu admin"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div className="lg:pl-72">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white/85 px-4 backdrop-blur md:px-8">
          <button
            type="button"
            className="rounded-lg p-2 text-slate-700 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 lg:hidden"
            aria-label="Buka menu admin"
            aria-expanded={isOpen}
            onClick={() => setIsOpen(true)}
          >
            <Menu size={22} />
          </button>
          <div className="hidden lg:block">
            <p className="text-sm text-slate-500">Masuk sebagai</p>
            <p className="font-bold">{user?.name || 'Admin'}</p>
          </div>
          <button
            type="button"
            onClick={logout}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition-colors duration-200 hover:border-slate-900 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
          >
            <LogOut size={16} aria-hidden="true" />
            Keluar
          </button>
        </header>

        <main className="px-4 py-5 md:px-6 lg:px-8 lg:py-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
