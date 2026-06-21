const SkeletonBlock = ({ className = '' }) => (
  <div className={`animate-pulse rounded-xl bg-slate-200 ${className}`} aria-hidden="true" />
);

const CarCardSkeleton = () => (
  <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-[0_16px_36px_-20px_rgba(15,23,42,0.18)]">
    <SkeletonBlock className="h-52 rounded-none bg-linear-to-r from-slate-100 via-slate-200 to-slate-100" />

    <div className="flex grow flex-col p-6">
      <div className="mb-3 flex items-start justify-between gap-4">
        <div className="space-y-3">
          <SkeletonBlock className="h-6 w-36" />
          <SkeletonBlock className="h-4 w-24" />
        </div>
        <SkeletonBlock className="h-5 w-12 rounded-full" />
      </div>

      <SkeletonBlock className="mb-5 h-7 w-32" />

      <div className="mb-6 grid grid-cols-4 gap-2 rounded-xl border border-slate-100 bg-slate-50 px-2 py-3">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="flex flex-col items-center gap-2">
            <SkeletonBlock className="h-4 w-4 rounded-full" />
            <SkeletonBlock className="h-3 w-10" />
          </div>
        ))}
      </div>

      <SkeletonBlock className="mt-auto h-11 w-full" />
    </div>
  </article>
);

export default CarCardSkeleton;
