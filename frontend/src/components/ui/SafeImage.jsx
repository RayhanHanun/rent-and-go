import { useEffect, useState } from 'react';

const isPlaceholderImage = (src) => !src || String(src).includes('car-placeholder');

const getInitialStatus = (src) => (isPlaceholderImage(src) ? 'error' : 'loading');

const SafeImage = ({ onError, onLoad, className = '', src, alt = '', fallbackLabel = 'Gambar belum tersedia', ...props }) => {
  const [status, setStatus] = useState(() => getInitialStatus(src));

  useEffect(() => {
    let isMounted = true;

    Promise.resolve().then(() => {
      if (isMounted) {
        setStatus(getInitialStatus(src));
      }
    });

    return () => {
      isMounted = false;
    };
  }, [src]);

  const handleLoad = (event) => {
    setStatus('loaded');
    onLoad?.(event);
  };

  const handleError = (event) => {
    setStatus('error');
    onError?.(event);
  };

  return (
    <span className="relative block h-full w-full overflow-hidden">
      {status !== 'error' && src && (
        <img
          {...props}
          src={src}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          className={`${className} ${status === 'loaded' ? 'opacity-100' : 'opacity-0'}`}
        />
      )}

      {status === 'loading' && (
        <span
          className="absolute inset-0 animate-pulse bg-linear-to-r from-slate-100 via-slate-200 to-slate-100"
          aria-hidden="true"
        />
      )}

      {status === 'error' && (
        <span
          className="flex h-full w-full items-center justify-center bg-linear-to-br from-slate-100 to-slate-200 px-4 text-center text-xs font-bold text-slate-500"
          role={alt ? 'img' : undefined}
          aria-label={alt || undefined}
        >
          {fallbackLabel}
        </span>
      )}
    </span>
  );
};

export default SafeImage;
