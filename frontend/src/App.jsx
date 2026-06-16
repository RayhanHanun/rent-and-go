import { Navigate, Route, Routes } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Beranda from './pages/Beranda';
import Armada from './pages/Armada';
import Layanan from './pages/Layanan';
import ServiceDetail from './pages/ServiceDetail';
import Kontak from './pages/Kontak';
import DetailArmada from './pages/DetailArmada';
import NotFound from './pages/NotFound';
import './index.css';

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="flex min-h-screen flex-col bg-white font-sans selection:bg-slate-300 selection:text-slate-950">
        <ScrollToTop />
        <Navbar />
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
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </MotionConfig>
  );
}

export default App;
