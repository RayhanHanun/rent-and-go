import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';
import { services } from '../data/services';

const footerLinkClass =
  'rounded-sm transition-colors duration-200 hover:text-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white py-20 pb-10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16 border-b border-white/10 pb-16">
          {/* Brand Info */}
          <div className="lg:col-span-1">
            <h3 className="text-3xl font-extrabold mb-6 tracking-tight text-white drop-shadow-sm">
              Rent & Go
            </h3>
            <p className="text-slate-400 mb-8 max-w-sm leading-relaxed text-sm">
              Nikmati perjalanan lebih nyaman dengan pilihan armada mobil
              premium terbaru.
            </p>
          </div>

          {/* Main Navigation */}
          <div>
            <h4 className="font-semibold text-lg mb-6 border-b-2 border-white/10 inline-block pb-1 text-white">
              Menu Utama
            </h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li>
                <Link to="/" className={footerLinkClass}>
                  Beranda
                </Link>
              </li>
              <li>
                <Link
                  to="/armada"
                  className={footerLinkClass}
                >
                  Armada
                </Link>
              </li>
              <li>
                <Link
                  to="/layanan"
                  className={footerLinkClass}
                >
                  Layanan
                </Link>
              </li>
              <li>
                <Link
                  to="/kontak"
                  className={footerLinkClass}
                >
                  Kontak
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-lg mb-6 border-b-2 border-white/10 inline-block pb-1 text-white">
              Layanan
            </h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    to={`/layanan/${service.slug}`}
                    className={footerLinkClass}
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h4 className="font-semibold text-lg mb-6 border-b-2 border-white/10 inline-block pb-1 text-white">
              Hubungi Kami
            </h4>
            <ul className="space-y-5 text-slate-400 text-sm">
              <li className="flex items-start gap-4">
                <Phone size={20} className="text-slate-400 shrink-0 mt-0.5" />
                <a
                  href="tel:+628812704174"
                  className={footerLinkClass}
                >
                  +62 881-2704-174
                  <br />
                  Layanan online 24/7
                  <br />
                  Garasi 07.00-22.00 WIB
                </a>
              </li>
              <li className="flex items-start gap-4">
                <Mail size={20} className="text-slate-400 shrink-0 mt-0.5" />
                <a
                  href="mailto:rentalmobilngo@gmail.com"
                  className={`${footerLinkClass} break-all`}
                >
                  rentalmobilngo@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-4">
                <MapPin size={24} className="text-slate-400 shrink-0 mt-0.5" />
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Jl.%20Ring%20Road%20Utara%2C%20Ngringin%2C%20Condongcatur%2C%20Kec.%20Depok%2C%20Kabupaten%20Sleman%2C%20Daerah%20Istimewa%20Yogyakarta%2055281"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${footerLinkClass} leading-relaxed`}
                >
                  Jl. Ring Road Utara, Ngringin, Condongcatur, Kec. Depok,
                  Kabupaten Sleman, Daerah Istimewa Yogyakarta 55281
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="text-center text-slate-400 text-sm">
          <p>&copy; 2026 Rent & Go. Semua hak dilindungi.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
