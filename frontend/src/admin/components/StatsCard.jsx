import CountUpModule from 'react-countup';
import { motion, useReducedMotion } from 'framer-motion';

const CountUp = CountUpModule.default || CountUpModule;

const StatsCard = ({
  icon: Icon,
  label,
  value,
  description,
  badge,
  prefix = '',
  suffix = '',
  accent = 'slate',
  delay = 0,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const numericValue = Number(value || 0);
  const accentClasses = {
    slate: 'bg-slate-950 text-white shadow-slate-950/20',
    emerald: 'bg-emerald-600 text-white shadow-emerald-600/20',
    blue: 'bg-blue-700 text-white shadow-blue-700/20',
    amber: 'bg-amber-500 text-white shadow-amber-500/20',
    rose: 'bg-rose-600 text-white shadow-rose-600/20',
  };

  return (
    <motion.article
      initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.35, delay }}
      className="relative min-h-[148px] overflow-hidden rounded-3xl border border-slate-200 bg-white p-4 shadow-[0_18px_42px_-30px_rgba(15,23,42,0.4)]"
    >
      <div className="absolute right-0 top-0 h-20 w-20 translate-x-8 -translate-y-8 rounded-full bg-slate-100/70" />
      <div className="relative flex items-start justify-between gap-4">
        <div className={`flex h-10 w-10 items-center justify-center rounded-2xl shadow-sm ${accentClasses[accent] || accentClasses.slate}`}>
          <Icon size={19} aria-hidden="true" />
        </div>
        {badge && (
          <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-extrabold text-slate-700">
            {badge}
          </span>
        )}
      </div>
      <div className="relative mt-4">
        <p className="text-sm font-bold text-slate-500">{label}</p>
        <p className="mt-1.5 text-2xl font-black tracking-tight text-slate-950 md:text-3xl">
          {prefix}
          {shouldReduceMotion ? (
            numericValue.toLocaleString('id-ID')
          ) : (
            <CountUp end={numericValue} duration={1.1} separator="." />
          )}
          {suffix}
        </p>
        <p className="mt-1.5 text-xs leading-relaxed text-slate-500">{description}</p>
      </div>
    </motion.article>
  );
};

export default StatsCard;
