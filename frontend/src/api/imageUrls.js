const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api';

const getApiOrigin = () => {
  try {
    return new URL(apiBaseUrl, globalThis.location?.origin || 'http://localhost').origin;
  } catch {
    return 'http://127.0.0.1:8000';
  }
};

export const resolveImageUrl = (value, fallback = '') => {
  if (!value) return fallback;

  if (/^(blob:|data:|https?:\/\/)/i.test(value)) {
    return value;
  }

  if (value.startsWith('//')) {
    return `${globalThis.location?.protocol || 'http:'}${value}`;
  }

  if (value.startsWith('/storage/')) {
    return `${getApiOrigin()}${value}`;
  }

  if (value.startsWith('storage/')) {
    return `${getApiOrigin()}/${value}`;
  }

  return value;
};

export const getImageUrl = (image, fallback = '') =>
  resolveImageUrl(image?.image_url || image?.src || image?.url || image?.image_path, fallback);
