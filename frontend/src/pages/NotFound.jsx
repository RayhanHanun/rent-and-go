import Button from '../components/ui/Button';

const NotFound = () => (
  <section className="flex min-h-[65vh] items-center bg-slate-50 px-4 py-20 text-center">
    <div className="mx-auto max-w-xl">
      <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-slate-500">
        Error 404
      </p>
      <h1 className="mb-4 text-4xl font-extrabold text-slate-900 sm:text-5xl">
        Halaman Tidak Ditemukan
      </h1>
      <p className="mb-8 leading-relaxed text-slate-600">
        Alamat yang Anda buka mungkin sudah berubah atau tidak tersedia.
      </p>
      <div className="flex flex-col justify-center gap-3 sm:flex-row">
        <Button to="/" size="lg">
          Kembali ke Beranda
        </Button>
        <Button to="/armada" variant="outline" size="lg">
          Lihat Armada
        </Button>
      </div>
    </div>
  </section>
);

export default NotFound;
