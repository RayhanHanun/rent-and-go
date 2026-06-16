import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Button from './ui/Button';
import {
  GENERAL_WHATSAPP_MESSAGE,
  getWhatsAppUrl,
} from '../utils/whatsapp';

const NAV_ITEMS = [
  {
    label: 'Beranda',
    to: '/',
    isActive: (pathname) => pathname === '/',
  },
  {
    label: 'Armada',
    to: '/armada',
    isActive: (pathname) => pathname === '/armada' || pathname.startsWith('/armada/'),
  },
  {
    label: 'Layanan',
    to: '/layanan',
    isActive: (pathname) => pathname === '/layanan' || pathname.startsWith('/layanan/'),
  },
  {
    label: 'Kontak',
    to: '/kontak',
    isActive: (pathname) => pathname === '/kontak',
  },
];

const WhatsAppIcon = () => (
  <svg
    viewBox="0 0 16 16"
    className="size-[18px] shrink-0 fill-current"
    aria-hidden="true"
  >
    <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93a7.898 7.898 0 0 0-2.327-5.607ZM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.25a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592Zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.066-.315-.099-.445.099-.133.197-.514.646-.627.775-.116.133-.232.15-.43.05-.197-.099-.836-.308-1.592-.984-.59-.525-.986-1.174-1.099-1.372.116-.198.216-.33.314-.463.099-.13.133-.232.199-.364.066-.133.033-.248-.017-.347-.05-.099-.445-1.075-.61-1.47-.16-.389-.323-.335-.445-.34-.116-.007-.248-.007-.381-.007a.729.729 0 0 0-.527.248c-.182.198-.693.678-.693 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.463.164-.86.115-.943-.05-.082-.182-.132-.38-.23Z" />
  </svg>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();
  const mobileNavigationRef = useRef(null);
  const whatsappUrl = getWhatsAppUrl(GENERAL_WHATSAPP_MESSAGE);

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    const handlePointerDown = (event) => {
      if (
        mobileNavigationRef.current &&
        !mobileNavigationRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('pointerdown', handlePointerDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [isOpen]);

  return (
    <nav
      ref={mobileNavigationRef}
      className="sticky top-0 z-50 border-b border-slate-100 bg-white/80 shadow-sm backdrop-blur-md"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 w-full">
          
          {/* 1. BAGIAN KIRI: Logo */}
          <div className="flex-1 flex justify-start">
            <Link
              to="/"
              className="rounded-sm text-xl font-bold text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
            >
              Rent <span className="text-slate-900">&</span> Go
            </Link>
          </div>
          
          {/* 2. BAGIAN TENGAH: Navigasi (Tepat di Tengah) */}
          <div className="hidden md:flex items-center justify-center space-x-8">
            {NAV_ITEMS.map((item) => {
              const active = item.isActive(pathname);

              return (
                <Link
                  key={item.label}
                  to={item.to}
                  aria-current={active ? 'page' : undefined}
                  className={`group relative rounded-sm transition-colors duration-200 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-4 ${
                    active ? 'font-semibold text-slate-900' : 'font-medium text-slate-600'
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-slate-900 transition-all duration-300 ${
                      active ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </Link>
              );
            })}
          </div>

          {/* 3. BAGIAN KANAN: Tombol CTA */}
          <div className="flex-1 flex items-center justify-end space-x-4">
            <div className="hidden md:flex items-center">
              <Button
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="whatsapp"
                size="md"
              >
                <WhatsAppIcon />
                Hubungi Kami
              </Button>
            </div>

            {/* Menu Mobile Button (Muncul saat layar kecil) */}
            <div className="flex items-center md:hidden">
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                aria-label={isOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
                aria-expanded={isOpen}
                aria-controls="mobile-navigation"
                className="rounded-lg p-2 text-slate-600 transition-colors duration-200 hover:bg-slate-50 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

        </div>
      </div>
      
      {/* Mobile menu (Dropdown) */}
      {isOpen && (
        <div
          id="mobile-navigation"
          className="space-y-1 border-t border-slate-100 bg-white px-4 pb-6 pt-2 shadow-lg md:hidden"
        >
          {NAV_ITEMS.map((item) => {
            const active = item.isActive(pathname);

            return (
              <Link
                key={item.label}
                to={item.to}
                aria-current={active ? 'page' : undefined}
                className={`block rounded-md border-l-2 px-3 py-3 text-base transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 ${
                  active
                    ? 'border-slate-900 bg-slate-50 font-semibold text-slate-900'
                    : 'border-transparent font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            );
          })}
          <div className="mt-4 border-t border-slate-100 pt-4">
            <Button
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="whatsapp"
              size="lg"
              className="w-full"
              onClick={() => setIsOpen(false)}
            >
              <WhatsAppIcon />
              Hubungi Kami
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
