import { motion, useReducedMotion } from 'framer-motion';

const ChartCard = ({ title, description, children, className = '' }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.section
      initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.35 }}
      className={`rounded-3xl border border-slate-200 bg-white p-4 shadow-[0_18px_42px_-30px_rgba(15,23,42,0.45)] md:p-5 ${className}`}
    >
      <div className="mb-3">
        <h2 className="text-lg font-extrabold text-slate-950">{title}</h2>
        {description && <p className="mt-1 text-xs leading-relaxed text-slate-500 md:text-sm">{description}</p>}
      </div>
      {children}
    </motion.section>
  );
};

export default ChartCard;
