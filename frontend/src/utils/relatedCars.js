const serviceCategoryMap = {
  'lepas-kunci': ['city car', 'mpv', 'suv'],
  driver: ['mpv', 'premium', 'microbus'],
  'dengan-pengemudi': ['mpv', 'premium', 'microbus'],
  'paket-tour': ['mpv', 'suv', 'microbus'],
  bandara: ['city car', 'mpv', 'premium'],
  'antar-jemput-bandara': ['city car', 'mpv', 'premium'],
};

const normalizeValue = (value) => String(value || '').trim().toLowerCase();

const getCarCategory = (car) => {
  if (typeof car.category === 'string') {
    return normalizeValue(car.category);
  }

  return normalizeValue(car.category?.name || car.category_name);
};

export const getRelatedCarsByServiceSlug = (serviceSlug, cars, limit = 3) => {
  const availableCars = Array.isArray(cars) ? cars : [];
  const categories = serviceCategoryMap[normalizeValue(serviceSlug)];

  if (!categories) {
    return availableCars.slice(0, limit);
  }

  const selectedCategories = new Set();
  const relatedCars = [];

  for (const car of availableCars) {
    const category = getCarCategory(car);

    if (!categories.includes(category) || selectedCategories.has(category)) {
      continue;
    }

    relatedCars.push(car);
    selectedCategories.add(category);

    if (relatedCars.length === limit) {
      break;
    }
  }

  return relatedCars.length > 0
    ? relatedCars
    : availableCars.slice(0, limit);
};
