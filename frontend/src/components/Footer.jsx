import React from 'react';
import { Send, MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-blue-600 text-white py-20 pb-10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16 border-b border-blue-500/50 pb-16">
          
          {/* Brand Info */}
          <div className="lg:col-span-1">
            <h3 className="text-3xl font-extrabold mb-6 tracking-tight text-white drop-shadow-sm">Rent & Go</h3>
            <p className="text-blue-100 mb-8 max-w-sm leading-relaxed text-sm">
              Solusi mobilitas premium Anda. Membawa pengalaman berkendara mewah dengan proses yang cepat dan transparan.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-6 border-b-2 border-blue-400 inline-block pb-1">Quick Links</h4>
            <ul className="space-y-4 text-blue-100/90 text-sm">
              <li><a href="#" className="hover:text-white transition-colors flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-300"></div> Fleet & Pricing</a></li>
              <li><a href="#" className="hover:text-white transition-colors flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-300"></div> Locations</a></li>
              <li><a href="#" className="hover:text-white transition-colors flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-300"></div> Partnership</a></li>
              <li><a href="#" className="hover:text-white transition-colors flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-300"></div> FAQ & Support</a></li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h4 className="font-semibold text-lg mb-6 border-b-2 border-blue-400 inline-block pb-1">Hubungi Kami</h4>
            <ul className="space-y-5 text-blue-100/90 text-sm">
              <li className="flex items-start gap-4">
                <Phone size={20} className="text-blue-300 mt-0.5" />
                <span>+62 812-3456-7890<br/>Senin-Minggu (24 Jam)</span>
              </li>
              <li className="flex items-start gap-4">
                <Mail size={20} className="text-blue-300 mt-0.5" />
                <a href="mailto:hello@rentandgo.com" className="hover:text-white">hello@rentandgo.com</a>
              </li>
              <li className="flex items-start gap-4">
                <MapPin size={24} className="text-blue-300 shrink-0 mt-0.5 max-w-10" />
                <span className="leading-snug">Jl. Sudirman No. 123,<br/>Jakarta Selatan, Indonesia</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold text-lg mb-6 border-b-2 border-blue-400 inline-block pb-1">Newsletter</h4>
            <p className="text-blue-100/90 text-sm mb-6 leading-relaxed">
              Daftarkan email Anda untuk mendapatkan penawaran eksklusif dan info armada terbaru kami.
            </p>
            <form className="flex border border-blue-400 rounded-lg overflow-hidden bg-white/10 focus-within:bg-white/20 transition-colors backdrop-blur-sm">
              <input 
                type="email" 
                placeholder="Alamat email Anda" 
                className="bg-transparent text-white placeholder-blue-200 px-4 py-3 outline-none w-full text-sm"
              />
              <button type="submit" className="bg-blue-800 text-white px-5 hover:bg-blue-900 transition-colors flex items-center">
                <Send size={18} />
              </button>
            </form>
          </div>
          
        </div>

        {/* Bottom Bar */}
        <div className="text-center text-blue-200/80 text-sm">
          <p>© 2024 Rent & Go, Premium Mobility Solutions</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
