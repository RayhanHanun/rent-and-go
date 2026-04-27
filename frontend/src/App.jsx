import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Beranda from './pages/Beranda';
import Armada from './pages/Armada';
import Layanan from './pages/Layanan';
import SignIn from './pages/SignIn';
import LayananLepasKunci from './pages/LayananLepasKunci';
import LayananDenganPengemudi from './pages/LayananDenganPengemudi';
import LayananPaketTour from './pages/LayananPaketTour';
import LayananBandara from './pages/LayananBandara';
import Kontak from './pages/Kontak';
import DetailArmada from './pages/DetailArmada';
import './index.css';

function App() {
  return (
    <div className="min-h-screen font-sans bg-white flex flex-col selection:bg-slate-300 selection:text-slate-950">
      <ScrollToTop />
      <Navbar />
      <main className="grow">
        <Routes>
          <Route path="/" element={<Beranda />} />
          <Route path="/fleet" element={<Armada />} />
          <Route path="/armada/:id" element={<DetailArmada />} />
          <Route path="/services" element={<Layanan />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/layanan/lepas-kunci" element={<LayananLepasKunci />} />
          <Route path="/layanan/dengan-pengemudi" element={<LayananDenganPengemudi />} />
          <Route path="/layanan/paket-tour" element={<LayananPaketTour />} />
          <Route path="/layanan/bandara" element={<LayananBandara />} />
          <Route path="/kontak" element={<Kontak />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
