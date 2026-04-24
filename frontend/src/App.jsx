import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Beranda from './pages/Beranda';
import Armada from './pages/Armada';
import Layanan from './pages/Layanan';
import SignIn from './pages/SignIn';
import './index.css';

function App() {
  return (
    <div className="min-h-screen font-sans bg-white flex flex-col selection:bg-blue-200 selection:text-blue-900">
      <ScrollToTop />
      <Navbar />
      <main className="grow">
        <Routes>
          <Route path="/" element={<Beranda />} />
          <Route path="/fleet" element={<Armada />} />
          <Route path="/services" element={<Layanan />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
