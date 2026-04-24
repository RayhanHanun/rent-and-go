import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Fleet from './pages/Fleet';
import SignIn from './pages/SignIn';
import './index.css';

function App() {
  return (
    <div className="min-h-screen font-sans bg-white flex flex-col selection:bg-blue-200 selection:text-blue-900">
      <ScrollToTop />
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/fleet" element={<Fleet />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
