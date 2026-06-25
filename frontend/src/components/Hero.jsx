import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ArrowUp } from 'lucide-react';
import heroHomeDesktop from '../assets/hero-home-desktop.jpeg';
import heroHomeMobile from '../assets/hero-home-mobile.jpeg';
import Button from './ui/Button';
import { getWhatsAppUrl } from '../utils/whatsapp';

const Hero = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const heroWhatsappUrl = getWhatsAppUrl(
    'Halo Rent & Go, saya ingin menyewa mobil. Mohon bantu saya memilih armada yang tersedia.',
  );

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
          transition: { staggerChildren: shouldReduceMotion ? 0 : 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: shouldReduceMotion ? 0 : -24 },
    show: {
      opacity: 1,
      x: 0,
      transition: { duration: shouldReduceMotion ? 0 : 0.6, ease: 'easeOut' },
    },
  };

  return (
    <section className="relative flex h-[32rem] min-h-0 items-start overflow-hidden bg-slate-950 md:h-auto md:min-h-[calc(100svh-4rem)] lg:min-h-[90vh] lg:items-center">
      <picture className="absolute inset-0 block">
        <source media="(max-width: 767px)" srcSet={heroHomeMobile} />
        <img
          src={heroHomeDesktop}
          alt="Rent & Go - Satu Tempat untuk Semua Kebutuhan Perjalananmu"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="h-full w-full object-cover object-center"
        />
      </picture>
      
      {/* Gradient Overlay for Text Readability */}
      <div className="absolute inset-0 z-10 bg-linear-to-b from-slate-950/95 via-slate-900/70 to-slate-950/15 md:bg-linear-to-r md:from-slate-950/95 md:via-slate-900/80 md:to-transparent/10" />

      {/* Content Container */}
      <div className="relative z-20 mx-auto w-full max-w-7xl px-5 pt-8 pb-4 md:px-6 md:pt-20 md:pb-12 lg:px-8 lg:py-0">
        <motion.div 
          className="max-w-2xl"
          variants={containerVariants}
          initial={shouldReduceMotion ? false : 'hidden'}
          animate="show"
        >
          {/* Kicker */}
          <motion.div variants={itemVariants} className="mb-2.5 md:mb-6">
            <span className="inline-block rounded-full bg-white px-3 py-1 text-[0.6875rem] font-bold tracking-widest text-slate-900 uppercase shadow-sm md:px-4 md:py-1.5 md:text-sm">
              Rent & Go
            </span>
          </motion.div>
          
          {/* Main Headline */}
          <motion.h1 
            variants={itemVariants} 
            className="mb-2.5 text-[clamp(1.875rem,8.3vw,2.25rem)] leading-[1.06] font-extrabold text-white md:mb-6 md:text-5xl md:leading-tight lg:text-6xl"
          >
            Satu Tempat untuk Semua Kebutuhan Perjalananmu.
          </motion.h1>
          
          {/* Subtitle */}
          <motion.p 
            variants={itemVariants} 
            className="mb-4 max-w-[21rem] text-sm leading-[1.45] font-light text-slate-300 md:mb-10 md:max-w-xl md:text-xl md:leading-relaxed"
          >
            Nikmati perjalanan lebih nyaman dengan pilihan armada mobil premium terbaru.
            Proses cepat, harga transparan, dan layanan terbaik untuk setiap perjalanan Anda.
          </motion.p>
          
          {/* Action Buttons */}
          <motion.div variants={itemVariants} className="grid w-full max-w-[25rem] grid-cols-2 gap-3 md:flex md:max-w-none md:flex-row md:gap-4">
            <Button
              href={heroWhatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
              size="sm"
              className="group min-w-0 md:min-h-12 md:px-8 md:py-3.5 md:text-lg"
            >
              <span className="whitespace-nowrap">Sewa Sekarang</span>
              <ArrowRight size={16} className="shrink-0 transition-transform group-hover:translate-x-1 md:h-5 md:w-5" />
            </Button>
            <Button
              to="/armada"
              variant="outline"
              size="sm"
              className="min-w-0 border-white/30 text-white backdrop-blur-sm hover:border-white hover:bg-white/10 md:min-h-12 md:px-8 md:py-3.5 md:text-lg"
            >
              Lihat Armada
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll to Top Button */}
      <div 
        className={`fixed bottom-8 right-8 z-50 transition-opacity duration-300 ${showScrollTop ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
        <button 
          type="button"
          onClick={scrollToTop}
          aria-label="Kembali ke atas"
          className="rounded-full border border-white/10 bg-slate-900 p-3 text-white shadow-2xl transition-colors duration-200 hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 sm:p-4"
        >
          <ArrowUp size={24} />
        </button>
      </div>
    </section>
  );
};

export default Hero;
