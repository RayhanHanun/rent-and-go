import { useState } from 'react';

const SafeImage = ({
  onError,
  className = '',
  src,
  alt = '',
  fallbackLabel = 'Gambar belum tersedia',
  decoding = 'async',
  ...props
}) => {
  const [failedSrc, setFailedSrc] = useState(null);
  const shouldShowFallback = !src || failedSrc === src;

  const handleError = (event) => {
    setFailedSrc(src);
    onError?.(event);
  };

  if (shouldShowFallback) {
    return (
      <span
        className="flex h-full w-full items-center justify-center bg-linear-to-br from-slate-100 to-slate-200 px-4 text-center text-xs font-bold text-slate-500"
        role={alt ? 'img' : undefined}
        aria-label={alt || undefined}
      >
        {fallbackLabel}
      </span>
    );
  }

  return (
    <img
      {...props}
      src={src}
      alt={alt}
      decoding={decoding}
      onError={handleError}
      className={className}
    />
  );
};

export default SafeImage;
