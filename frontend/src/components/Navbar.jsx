import React from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 w-full">
          <div className="flex-shrink-0 flex items-center">
            <span className="font-bold text-xl text-black">Rent & Go</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#fleet" className="relative group text-slate-600 hover:text-blue-600 font-medium transition-colors">
              Fleet
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#locations" className="relative group text-slate-600 hover:text-blue-600 font-medium transition-colors">
              Locations
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#how-it-works" className="relative group text-slate-600 hover:text-blue-600 font-medium transition-colors">
              How It Works
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#offers" className="relative group text-slate-600 hover:text-blue-600 font-medium transition-colors">
              Offers
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </a>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <button className="text-slate-600 hover:text-slate-900 font-medium px-3 py-2">Sign In</button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors">Sewa Sekarang</button>
          </div>

          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 hover:text-slate-900 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 px-4 pt-2 pb-4 space-y-1 shadow-lg">
          <a href="#fleet" className="block px-3 py-2 text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-50 rounded-md">Fleet</a>
          <a href="#locations" className="block px-3 py-2 text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-50 rounded-md">Locations</a>
          <a href="#how-it-works" className="block px-3 py-2 text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-50 rounded-md">How It Works</a>
          <a href="#offers" className="block px-3 py-2 text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-50 rounded-md">Offers</a>
          <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col space-y-2">
            <button className="w-full text-center text-slate-600 hover:text-slate-900 font-medium px-3 py-2">Sign In</button>
            <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors">Sewa Sekarang</button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
