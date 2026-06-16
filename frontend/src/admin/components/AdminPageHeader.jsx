const AdminPageHeader = ({ title, description, children }) => (
  <div className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
    <div>
      <p className="mb-1.5 text-xs font-bold uppercase tracking-[0.22em] text-slate-500">
        Admin Rent & Go
      </p>
      <h1 className="text-2xl font-extrabold text-slate-950 md:text-3xl">{title}</h1>
      {description && (
        <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-slate-600">{description}</p>
      )}
    </div>
    {children}
  </div>
);

export default AdminPageHeader;
