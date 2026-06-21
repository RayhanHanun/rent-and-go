import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import AdminLayout from './admin/components/AdminLayout';
import ProtectedRoute from './admin/components/ProtectedRoute';
import './index.css';

const Beranda = lazy(() => import('./pages/Beranda'));
const Armada = lazy(() => import('./pages/Armada'));
const Layanan = lazy(() => import('./pages/Layanan'));
const ServiceDetail = lazy(() => import('./pages/ServiceDetail'));
const Kontak = lazy(() => import('./pages/Kontak'));
const DetailArmada = lazy(() => import('./pages/DetailArmada'));
const NotFound = lazy(() => import('./pages/NotFound'));
const AdminLogin = lazy(() => import('./admin/pages/AdminLogin'));
const AdminDashboard = lazy(() => import('./admin/pages/AdminDashboard'));
const AdminCars = lazy(() => import('./admin/pages/AdminCars'));
const AdminCategories = lazy(() => import('./admin/pages/AdminCategories'));
const AdminUnits = lazy(() => import('./admin/pages/AdminUnits'));
const AdminRentals = lazy(() => import('./admin/pages/AdminRentals'));
const AdminTracking = lazy(() => import('./admin/pages/AdminTracking'));
const AdminMaintenance = lazy(() => import('./admin/pages/AdminMaintenance'));
const AdminMessages = lazy(() => import('./admin/pages/AdminMessages'));
const AdminMessageDetail = lazy(() =>
  import('./admin/pages/AdminMessages').then((module) => ({ default: module.AdminMessageDetail })),
);
const AdminServices = lazy(() => import('./admin/pages/AdminServices'));
const AdminReports = lazy(() => import('./admin/pages/AdminReports'));
const AdminSettings = lazy(() => import('./admin/pages/AdminSettings'));

const PageLoading = () => (
  <div className="flex min-h-[55vh] items-center justify-center bg-slate-50 px-4 py-16 text-center">
    <div>
      <div className="mx-auto mb-4 h-10 w-10 animate-pulse rounded-full bg-slate-200" aria-hidden="true" />
      <p className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500">Memuat halaman...</p>
    </div>
  </div>
);

function App() {
  const { pathname } = useLocation();
  const isAdminArea = pathname.startsWith('/admin');

  return (
    <MotionConfig reducedMotion="user">
      <div className="flex min-h-screen flex-col bg-white font-sans selection:bg-slate-300 selection:text-slate-950">
        <ScrollToTop />
        {!isAdminArea && <Navbar />}
        <main className="grow">
          <Suspense fallback={<PageLoading />}>
            <Routes>
              <Route path="/" element={<Beranda />} />
              <Route path="/armada" element={<Armada />} />
              <Route path="/armada/:slug" element={<DetailArmada />} />
              <Route path="/layanan" element={<Layanan />} />
              <Route path="/layanan/:slug" element={<ServiceDetail />} />
              <Route path="/kontak" element={<Kontak />} />
              <Route path="/fleet" element={<Navigate to="/armada" replace />} />
              <Route path="/services" element={<Navigate to="/layanan" replace />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<ProtectedRoute />}>
                <Route element={<AdminLayout />}>
                  <Route index element={<Navigate to="dashboard" replace />} />
                  <Route path="dashboard" element={<AdminDashboard />} />
                  <Route path="cars" element={<AdminCars />} />
                  <Route path="cars/tambah" element={<AdminCars mode="create" />} />
                  <Route path="cars/edit/:id" element={<AdminCars mode="edit" />} />
                  <Route path="armada" element={<Navigate to="/admin/cars" replace />} />
                  <Route path="armada/tambah" element={<AdminCars mode="create" />} />
                  <Route path="armada/edit/:id" element={<AdminCars mode="edit" />} />
                  <Route path="categories" element={<AdminCategories />} />
                  <Route path="categories/tambah" element={<AdminCategories mode="create" />} />
                  <Route path="categories/edit/:id" element={<AdminCategories mode="edit" />} />
                  <Route path="kategori" element={<Navigate to="/admin/categories" replace />} />
                  <Route path="kategori/tambah" element={<AdminCategories mode="create" />} />
                  <Route path="kategori/edit/:id" element={<AdminCategories mode="edit" />} />
                  <Route path="units" element={<AdminUnits />} />
                  <Route path="units/tambah" element={<AdminUnits mode="create" />} />
                  <Route path="units/edit/:id" element={<AdminUnits mode="edit" />} />
                  <Route path="unit" element={<Navigate to="/admin/units" replace />} />
                  <Route path="unit/tambah" element={<AdminUnits mode="create" />} />
                  <Route path="unit/edit/:id" element={<AdminUnits mode="edit" />} />
                  <Route path="stok-mobil" element={<Navigate to="/admin/units" replace />} />
                  <Route path="stok-mobil/tambah" element={<AdminUnits mode="create" />} />
                  <Route path="stok-mobil/edit/:id" element={<AdminUnits mode="edit" />} />
                  <Route path="rentals" element={<AdminRentals />} />
                  <Route path="rentals/tambah" element={<AdminRentals mode="create" />} />
                  <Route path="rentals/edit/:id" element={<AdminRentals mode="edit" />} />
                  <Route path="rental" element={<Navigate to="/admin/rentals" replace />} />
                  <Route path="rental/tambah" element={<AdminRentals mode="create" />} />
                  <Route path="rental/edit/:id" element={<AdminRentals mode="edit" />} />
                  <Route path="penyewaan" element={<Navigate to="/admin/rentals" replace />} />
                  <Route path="penyewaan/tambah" element={<AdminRentals mode="create" />} />
                  <Route path="penyewaan/edit/:id" element={<AdminRentals mode="edit" />} />
                  <Route path="tracking" element={<AdminTracking />} />
                  <Route path="maintenance" element={<AdminMaintenance />} />
                  <Route path="maintenance/tambah" element={<AdminMaintenance mode="create" />} />
                  <Route path="maintenance/edit/:id" element={<AdminMaintenance mode="edit" />} />
                  <Route path="messages" element={<AdminMessages />} />
                  <Route path="messages/:id" element={<AdminMessageDetail />} />
                  <Route path="pesan" element={<Navigate to="/admin/messages" replace />} />
                  <Route path="pesan/:id" element={<AdminMessageDetail />} />
                  <Route path="services" element={<AdminServices />} />
                  <Route path="services/tambah" element={<AdminServices mode="create" />} />
                  <Route path="services/edit/:id" element={<AdminServices mode="edit" />} />
                  <Route path="layanan" element={<Navigate to="/admin/services" replace />} />
                  <Route path="layanan/tambah" element={<AdminServices mode="create" />} />
                  <Route path="layanan/edit/:id" element={<AdminServices mode="edit" />} />
                  <Route path="laporan" element={<AdminReports />} />
                  <Route path="reports" element={<AdminReports />} />
                  <Route path="pengaturan" element={<AdminSettings />} />
                  <Route path="settings" element={<AdminSettings />} />
                  <Route path="*" element={<NotFound />} />
                </Route>
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        {!isAdminArea && <Footer />}
      </div>
    </MotionConfig>
  );
}

export default App;
