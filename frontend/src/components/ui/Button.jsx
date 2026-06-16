import { Link } from 'react-router-dom';

const variants = {
  primary:
    'border border-slate-900 bg-slate-900 text-white shadow-sm shadow-slate-900/20 hover:bg-slate-800',
  secondary:
    'border border-white bg-white text-slate-900 shadow-lg hover:bg-slate-100',
  outline:
    'border border-slate-300 bg-transparent text-slate-900 hover:border-slate-900 hover:bg-slate-50',
  whatsapp:
    'border border-slate-900 bg-slate-900 text-white shadow-sm shadow-slate-900/20 hover:bg-slate-800',
};

const sizes = {
  sm: 'min-h-10 px-4 py-2 text-sm',
  md: 'min-h-11 px-5 py-2.5 text-sm',
  lg: 'min-h-12 px-7 py-3.5 text-base',
};

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  to,
  href,
  type = 'button',
  ...props
}) => {
  const classes = [
    'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    variants[variant],
    sizes[size],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  );
};

export default Button;
