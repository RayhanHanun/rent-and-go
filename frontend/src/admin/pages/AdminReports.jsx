import { useEffect, useState } from 'react';
import { reportsApi } from '../../api/reportsApi';
import AdminPageHeader from '../components/AdminPageHeader';
import StatusBadge from '../components/StatusBadge';
import { formatCurrency, formatDate } from '../utils/formatters';

const AdminReports = () => {
  const [rentals, setRentals] = useState(null);
  const [fleet, setFleet] = useState(null);
  const [maintenance, setMaintenance] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    Promise.all([
      reportsApi.rentals(),
      reportsApi.fleetAvailability(),
      reportsApi.maintenance(),
    ]).then(([rentalsResponse, fleetResponse, maintenanceResponse]) => {
      if (!isMounted) return;
      setRentals(rentalsResponse.data);
      setFleet(fleetResponse.data);
      setMaintenance(maintenanceResponse.data);
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const downloadCsv = async () => {
    setIsDownloading(true);
    try {
      const response = await reportsApi.downloadRentals();
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'rent-go-rentals.csv');
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div>
      <AdminPageHeader
        title="Laporan"
        description="Ringkasan rental, ketersediaan armada, dan biaya maintenance untuk kebutuhan operasional."
      >
        <button
          type="button"
          onClick={downloadCsv}
          disabled={isDownloading}
          className="inline-flex min-h-11 items-center justify-center rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-bold text-white transition-colors duration-200 hover:bg-slate-800 disabled:opacity-60"
        >
          {isDownloading ? 'Mengunduh...' : 'Export Rental CSV'}
        </button>
      </AdminPageHeader>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold text-slate-500">Total Rental</p>
          <p className="mt-2 text-3xl font-extrabold text-slate-950">{rentals?.total_rentals ?? '-'}</p>
        </article>
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold text-slate-500">Pendapatan</p>
          <p className="mt-2 text-3xl font-extrabold text-slate-950">{formatCurrency(rentals?.total_revenue)}</p>
        </article>
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold text-slate-500">Biaya Maintenance</p>
          <p className="mt-2 text-3xl font-extrabold text-slate-950">{formatCurrency(maintenance?.total_cost)}</p>
        </article>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-2">
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-5 text-xl font-extrabold text-slate-950">Ketersediaan Armada</h2>
          <div className="space-y-3">
            {(fleet?.by_status || []).map((item) => (
              <div key={item.status} className="flex items-center justify-between">
                <StatusBadge value={item.status} />
                <span className="font-extrabold text-slate-950">{item.total}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-5 text-xl font-extrabold text-slate-950">Status Rental</h2>
          <div className="space-y-3">
            {(rentals?.status_breakdown || []).map((item) => (
              <div key={item.rental_status} className="flex items-center justify-between">
                <StatusBadge value={item.rental_status} />
                <span className="font-extrabold text-slate-950">{item.total}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-5 text-xl font-extrabold text-slate-950">Rental Terbaru</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-left text-slate-500">
                <th className="py-3 pr-4">Kode</th>
                <th className="py-3 pr-4">Penyewa</th>
                <th className="py-3 pr-4">Armada</th>
                <th className="py-3 pr-4">Mulai</th>
                <th className="py-3 pr-4">Total</th>
              </tr>
            </thead>
            <tbody>
              {(rentals?.items || []).map((item) => (
                <tr key={item.id} className="border-b border-slate-50">
                  <td className="py-3 pr-4 font-bold text-slate-900">{item.rental_code}</td>
                  <td className="py-3 pr-4">{item.renter_name}</td>
                  <td className="py-3 pr-4">{item.car_unit?.car?.name || '-'}</td>
                  <td className="py-3 pr-4">{formatDate(item.start_date)}</td>
                  <td className="py-3 pr-4">{formatCurrency(item.total_amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default AdminReports;
