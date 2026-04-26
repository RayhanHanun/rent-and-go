import React from 'react';
import { Send, MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white py-20 pb-10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16 border-b border-white/10 pb-16">
          
          {/* Brand Info */}
          <div className="lg:col-span-1">
            <h3 className="text-3xl font-extrabold mb-6 tracking-tight text-white drop-shadow-sm">Rent & Go</h3>
            <p className="text-slate-400 mb-8 max-w-sm leading-relaxed text-sm">
              Solusi mobilitas premium Anda. Membawa pengalaman berkendara mewah dengan proses yang cepat dan transparan.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-6 border-b-2 border-white/10 inline-block pb-1 text-white">Quick Links</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li><a href="#" className="hover:text-slate-300 transition-colors flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-slate-400"></div> Fleet & Pricing</a></li>
              <li><a href="#" className="hover:text-slate-300 transition-colors flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-slate-400"></div> Locations</a></li>
              <li><a href="#" className="hover:text-slate-300 transition-colors flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-slate-400"></div> Partnership</a></li>
              <li><a href="#" className="hover:text-slate-300 transition-colors flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-slate-400"></div> FAQ & Support</a></li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h4 className="font-semibold text-lg mb-6 border-b-2 border-white/10 inline-block pb-1 text-white">Hubungi Kami</h4>
            <ul className="space-y-5 text-slate-400 text-sm">
              <li className="flex items-start gap-4">
                <Phone size={20} className="text-slate-400 mt-0.5 group-hover:text-slate-300" />
                <span>+62 812-3456-7890<br/>Senin-Minggu (24 Jam)</span>
              </li>
              <li className="flex items-start gap-4">
                <Mail size={20} className="text-slate-400 mt-0.5 group-hover:text-slate-300" />
                <a href="mailto:hello@rentandgo.com" className="hover:text-slate-300 transition-colors">hello@rentandgo.com</a>
              </li>
              <li className="flex items-start gap-4">
                <MapPin size={24} className="text-slate-400 shrink-0 mt-0.5 max-w-10 group-hover:text-slate-300" />
                <span className="leading-snug">Jl. Sudirman No. 123,<br/>Jakarta Selatan, Indonesia</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold text-lg mb-6 border-b-2 border-white/10 inline-block pb-1 text-white">Newsletter</h4>
            <p className="text-slate-400 text-sm mb-6 leading-relaxed">
              Daftarkan email Anda untuk mendapatkan penawaran eksklusif dan info armada terbaru kami.
            </p>
            <form className="flex border border-white/10 rounded-lg overflow-hidden bg-white/5 focus-within:bg-white/10 transition-colors backdrop-blur-sm">
              <input 
                type="email" 
                placeholder="Alamat email Anda" 
                className="bg-transparent text-white placeholder-slate-400 px-4 py-3 outline-none w-full text-sm"
              />
              <button type="submit" className="bg-slate-800 text-white px-5 hover:bg-slate-700 transition-colors flex items-center">
                <Send size={18} />
              </button>
            </form>
          </div>
          
        </div>

        {/* Bottom Bar */}
        <div className="text-center text-slate-400 text-sm">
          <p>© 2024 Rent & Go, Premium Mobility Solutions</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
