import heroBandara from '../assets/hero-bandara.jpeg';
import heroDriver from '../assets/hero-driver.jpeg';
import heroLepasKunci from '../assets/hero-lepas-kunci.jpeg';
import heroMobil from '../assets/hero-home-desktop.jpeg';
import heroTour from '../assets/hero-tour.jpeg';

export const defaultServiceHeroImage = heroMobil;

export const getServiceHeroImage = (value = '') => {
  const slug = String(value).toLowerCase();

  if (slug.includes('bandara')) return heroBandara;
  if (slug.includes('driver') || slug.includes('pengemudi')) return heroDriver;
  if (slug.includes('lepas-kunci')) return heroLepasKunci;
  if (slug.includes('tour') || slug.includes('wisata')) return heroTour;

  return defaultServiceHeroImage;
};
