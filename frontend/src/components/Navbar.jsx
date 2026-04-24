import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 w-full">
          
          {/* 1. BAGIAN KIRI: Logo */}
          <div className="flex-1 flex justify-start">
            <Link to="/" className="font-bold text-xl text-black">
              Rent <span className="text-blue-600">&</span> Go
            </Link>
          </div>
          
          {/* 2. BAGIAN TENGAH: Navigasi (Tepat di Tengah) */}
          <div className="hidden md:flex items-center justify-center space-x-8">
            <Link to="/" className="relative group text-slate-600 hover:text-blue-600 font-medium transition-colors">
              Beranda
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link to="/fleet" className="relative group text-slate-600 hover:text-blue-600 font-medium transition-colors">
              Armada
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link to="/services" className="relative group text-slate-600 hover:text-blue-600 font-medium transition-colors">
              Layanan
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link to="/kontak" className="relative group text-slate-600 hover:text-blue-600 font-medium transition-colors">
              Kontak
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </div>

          {/* 3. BAGIAN KANAN: Tombol & Auth */}
          <div className="flex-1 flex items-center justify-end space-x-4">
            <div className="hidden md:flex items-center space-x-4">
              <Link to="/signin" className="text-slate-600 hover:text-slate-900 font-medium px-3 py-2">
                Masuk
              </Link>
              <Link to="/fleet" className="bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors shadow-sm shadow-blue-500/20">
                Sewa Sekarang
              </Link>
            </div>

            {/* Menu Mobile Button (Muncul saat layar kecil) */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-slate-600 hover:text-slate-900 focus:outline-none p-2 rounded-lg hover:bg-slate-50 transition-colors"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

        </div>
      </div>
      
      {/* Mobile menu (Dropdown) */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 px-4 pt-2 pb-6 space-y-1 shadow-lg">
          <Link to="/" className="block px-3 py-3 text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-50 rounded-md" onClick={() => setIsOpen(false)}>Beranda</Link>
          <Link to="/fleet" className="block px-3 py-3 text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-50 rounded-md" onClick={() => setIsOpen(false)}>Armada</Link>
          <Link to="/services" className="block px-3 py-3 text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-50 rounded-md" onClick={() => setIsOpen(false)}>Layanan</Link>
          <Link to="/kontak" className="block px-3 py-3 text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-50 rounded-md" onClick={() => setIsOpen(false)}>Kontak</Link>
          <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col space-y-2">
            <Link to="/signin" className="w-full text-center text-slate-600 hover:text-slate-900 font-medium px-3 py-3" onClick={() => setIsOpen(false)}>Masuk</Link>
            <Link to="/fleet" className="w-full text-center bg-blue-600 text-white px-4 py-3 rounded-md font-bold hover:bg-blue-700 transition-colors" onClick={() => setIsOpen(false)}>Sewa Sekarang</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;