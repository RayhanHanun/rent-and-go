import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import AdminLayout from './admin/components/AdminLayout';
import ProtectedRoute from './admin/components/ProtectedRoute';
import Beranda from './pages/Beranda';
import Armada from './pages/Armada';
import Layanan from './pages/Layanan';
import ServiceDetail from './pages/ServiceDetail';
import Kontak from './pages/Kontak';
import DetailArmada from './pages/DetailArmada';
import NotFound from './pages/NotFound';
import AdminLogin from './admin/pages/AdminLogin';
import AdminDashboard from './admin/pages/AdminDashboard';
import AdminCars from './admin/pages/AdminCars';
import AdminCategories from './admin/pages/AdminCategories';
import AdminUnits from './admin/pages/AdminUnits';
import AdminRentals from './admin/pages/AdminRentals';
import AdminTracking from './admin/pages/AdminTracking';
import AdminMaintenance from './admin/pages/AdminMaintenance';
import AdminMessages from './admin/pages/AdminMessages';
import AdminServices from './admin/pages/AdminServices';
import AdminReports from './admin/pages/AdminReports';
import AdminSettings from './admin/pages/AdminSettings';
import './index.css';

function App() {
  const { pathname } = useLocation();
  const isAdminArea = pathname.startsWith('/admin');

  return (
    <MotionConfig reducedMotion="user">
      <div className="flex min-h-screen flex-col bg-white font-sans selection:bg-slate-300 selection:text-slate-950">
        <ScrollToTop />
        {!isAdminArea && <Navbar />}
        <main className="grow">
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
                <Route path="armada" element={<AdminCars />} />
                <Route path="cars" element={<AdminCars />} />
                <Route path="kategori" element={<AdminCategories />} />
                <Route path="categories" element={<AdminCategories />} />
                <Route path="unit" element={<AdminUnits />} />
                <Route path="units" element={<AdminUnits />} />
                <Route path="stok-mobil" element={<AdminUnits />} />
                <Route path="rental" element={<AdminRentals />} />
                <Route path="rentals" element={<AdminRentals />} />
                <Route path="penyewaan" element={<AdminRentals />} />
                <Route path="tracking" element={<AdminTracking />} />
                <Route path="maintenance" element={<AdminMaintenance />} />
                <Route path="pesan" element={<AdminMessages />} />
                <Route path="messages" element={<AdminMessages />} />
                <Route path="layanan" element={<AdminServices />} />
                <Route path="services" element={<AdminServices />} />
                <Route path="laporan" element={<AdminReports />} />
                <Route path="reports" element={<AdminReports />} />
                <Route path="pengaturan" element={<AdminSettings />} />
                <Route path="settings" element={<AdminSettings />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        {!isAdminArea && <Footer />}
      </div>
    </MotionConfig>
  );
}

export default App;
