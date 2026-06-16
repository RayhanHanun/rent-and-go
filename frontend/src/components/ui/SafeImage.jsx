import fallbackImage from '../../assets/car-placeholder.svg';

const SafeImage = ({ fallbackSrc = fallbackImage, onError, ...props }) => {
  const handleError = (event) => {
    if (event.currentTarget.src !== new URL(fallbackSrc, window.location.href).href) {
      event.currentTarget.src = fallbackSrc;
    }
    onError?.(event);
  };

  return <img {...props} onError={handleError} />;
};

export default SafeImage;
