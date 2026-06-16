const SectionHeader = ({
  title,
  description,
  align = 'center',
  className = '',
}) => (
  <div
    className={`${align === 'left' ? 'text-left' : 'text-center mx-auto'} max-w-3xl ${className}`}
  >
    <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">{title}</h2>
    {description && (
      <p className="mt-4 text-base leading-relaxed text-slate-500 sm:text-lg">
        {description}
      </p>
    )}
  </div>
);

export default SectionHeader;
