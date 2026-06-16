import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { MapContainer, Marker, Polyline, Popup, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
  Car,
  Gauge,
  MapPin,
  Navigation,
  Pause,
  Play,
  RotateCcw,
  Satellite,
  ShieldAlert,
  User,
} from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { trackingApi } from '../../api/trackingApi';
import { trackingVehicles as fallbackVehicles } from '../../data/trackingVehicles';
import AdminPageHeader from '../components/AdminPageHeader';
import StatusBadge from '../components/StatusBadge';
import SafeImage from '../../components/ui/SafeImage';

const YOGYAKARTA_CENTER = [-7.7956, 110.3695];

const statusTone = {
  online: '#059669',
  rented: '#1d4ed8',
  offline: '#64748b',
  late: '#e11d48',
  maintenance: '#d97706',
};

const statusLabel = {
  online: 'Online',
  rented: 'Sedang Disewa',
  offline: 'Offline',
  late: 'Terlambat',
  maintenance: 'Maintenance',
};

const toCoordinate = (value, fallback) => {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
};

const createMarkerIcon = (status) =>
  L.divIcon({
    className: '',
    html: `
      <div style="
        width: 42px;
        height: 42px;
        border-radius: 999px;
        background: ${statusTone[status] || statusTone.offline};
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 900;
        font-size: 12px;
        border: 3px solid white;
        box-shadow: 0 14px 30px rgba(15, 23, 42, 0.3);
      ">RG</div>
    `,
    iconSize: [42, 42],
    iconAnchor: [21, 21],
    popupAnchor: [0, -18],
  });

const normalizeTrackingVehicle = (item, index) => {
  const fallback = fallbackVehicles[index % fallbackVehicles.length];
  const position = [
    toCoordinate(item.latitude, fallback.currentPosition[0]),
    toCoordinate(item.longitude, fallback.currentPosition[1]),
  ];
  const route = Array.isArray(item.route_points)
    ? item.route_points
        .map((point) => [
          toCoordinate(point.lat ?? point.latitude, position[0]),
          toCoordinate(point.lng ?? point.longitude, position[1]),
        ])
        .filter(([lat, lng]) => Number.isFinite(lat) && Number.isFinite(lng))
    : [];

  return {
    id: item.id,
    carModel: item.car_unit?.car?.name || item.carUnit?.car?.name || fallback.carModel,
    plateNumber: item.car_unit?.plate_number || item.carUnit?.plate_number || fallback.plateNumber,
    renterName: item.renter_name || fallback.renterName,
    status: item.status || fallback.status,
    rentalStatus: statusLabel[item.status] || fallback.rentalStatus,
    speed: Number(item.speed ?? fallback.speed),
    lastLocation: item.last_location || fallback.lastLocation,
    lastUpdated: item.last_updated_at || fallback.lastUpdated,
    image: item.image || item.image_url || item.car_unit?.car?.images?.[0]?.image_url || fallback.image,
    currentPosition: position,
    route: route.length > 1 ? route : fallback.route,
  };
};

const formatLastUpdated = (value) => {
  if (!value) return '-';
  if (value === 'Baru saja' || value.includes('lalu')) return value;

  return new Intl.DateTimeFormat('id-ID', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value));
};

const MapFocus = ({ position, reducedMotion }) => {
  const map = useMap();

  useEffect(() => {
    if (!position) return;

    if (reducedMotion) {
      map.setView(position, 13);
      return;
    }

    map.flyTo(position, 13, { duration: 0.8 });
  }, [map, position, reducedMotion]);

  return null;
};

const TrackingStat = ({ label, value, icon: Icon, tone = 'slate' }) => {
  const toneClass = {
    slate: 'bg-slate-950 text-white',
    emerald: 'bg-emerald-600 text-white',
    blue: 'bg-blue-700 text-white',
    gray: 'bg-slate-500 text-white',
  };

  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className={`mb-3 flex h-11 w-11 items-center justify-center rounded-2xl ${toneClass[tone] || toneClass.slate}`}>
        <Icon size={20} aria-hidden="true" />
      </div>
      <p className="text-sm font-bold text-slate-500">{label}</p>
      <p className="mt-1 text-2xl font-black text-slate-950">{value}</p>
    </article>
  );
};

const AdminTracking = () => {
  const shouldReduceMotion = useReducedMotion();
  const [vehicles, setVehicles] = useState(fallbackVehicles);
  const [selectedId, setSelectedId] = useState(fallbackVehicles[0].id);
  const [isSimulating, setIsSimulating] = useState(false);
  const [source, setSource] = useState('fallback');
  const routeIndexesRef = useRef({});
  const baseVehiclesRef = useRef(fallbackVehicles);

  useEffect(() => {
    let isMounted = true;

    trackingApi
      .list({ per_page: 100 })
      .then((response) => {
        if (!isMounted) return;
        const apiVehicles = Array.isArray(response.data)
          ? response.data.map(normalizeTrackingVehicle)
          : fallbackVehicles;
        const nextVehicles = apiVehicles.length > 0 ? apiVehicles : fallbackVehicles;

        baseVehiclesRef.current = nextVehicles;
        setVehicles(nextVehicles);
        setSelectedId(nextVehicles[0]?.id || fallbackVehicles[0].id);
        setSource('api');
      })
      .catch(() => {
        if (!isMounted) return;
        baseVehiclesRef.current = fallbackVehicles;
        setVehicles(fallbackVehicles);
        setSelectedId(fallbackVehicles[0].id);
        setSource('fallback');
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!isSimulating) return undefined;

    const interval = window.setInterval(() => {
      setVehicles((currentVehicles) =>
        currentVehicles.map((vehicle) => {
          if (vehicle.status === 'offline' || vehicle.route.length < 2) {
            return vehicle;
          }

          const currentIndex = routeIndexesRef.current[vehicle.id] || 0;
          const nextIndex = (currentIndex + 1) % vehicle.route.length;
          routeIndexesRef.current[vehicle.id] = nextIndex;

          return {
            ...vehicle,
            currentPosition: vehicle.route[nextIndex],
            speed: Math.max(12, vehicle.speed + (nextIndex % 2 === 0 ? 3 : -2)),
            lastUpdated: 'Baru saja',
          };
        }),
      );
    }, shouldReduceMotion ? 4200 : 2600);

    return () => window.clearInterval(interval);
  }, [isSimulating, shouldReduceMotion]);

  const selectedVehicle = useMemo(
    () => vehicles.find((vehicle) => vehicle.id === selectedId) || vehicles[0],
    [selectedId, vehicles],
  );

  const stats = useMemo(
    () => ({
      total: vehicles.length,
      online: vehicles.filter((vehicle) => vehicle.status === 'online').length,
      rented: vehicles.filter((vehicle) => vehicle.status === 'rented').length,
      offline: vehicles.filter((vehicle) => vehicle.status === 'offline').length,
    }),
    [vehicles],
  );

  const startSimulation = () => setIsSimulating(true);
  const pauseSimulation = () => setIsSimulating(false);
  const resetSimulation = () => {
    routeIndexesRef.current = {};
    setIsSimulating(false);
    setVehicles(baseVehiclesRef.current);
    setSelectedId(baseVehiclesRef.current[0]?.id || fallbackVehicles[0].id);
  };

  return (
    <div>
      <AdminPageHeader
        title="Tracking Kendaraan"
        description="Pantau posisi kendaraan dan aktivitas operasional secara terpusat dalam satu dashboard."
      >
        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800 shadow-sm">
          <div className="flex items-center gap-2 font-extrabold">
            <Satellite size={16} aria-hidden="true" />
            Status Tracking
          </div>
          <p className="mt-1 max-w-sm leading-relaxed">
            Pemantauan kendaraan aktif diperbarui secara berkala untuk membantu pengawasan operasional.
          </p>
        </div>
      </AdminPageHeader>

      <div className="mb-6 grid grid-cols-2 gap-4 xl:grid-cols-4">
        <TrackingStat label="Unit Dilacak" value={stats.total} icon={Car} />
        <TrackingStat label="Online" value={stats.online} icon={Navigation} tone="emerald" />
        <TrackingStat label="Sedang Disewa" value={stats.rented} icon={Gauge} tone="blue" />
        <TrackingStat label="Offline" value={stats.offline} icon={ShieldAlert} tone="gray" />
      </div>

      <div className="mb-6 flex flex-col gap-3 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-bold text-slate-500">Status data: {source === 'api' ? 'Tersinkron API' : 'Data operasional tersedia'}</p>
          <p className="mt-1 text-sm text-slate-500">
            Posisi kendaraan diperbarui berkala mengikuti rute operasional yang tercatat.
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            onClick={startSimulation}
            disabled={isSimulating}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-bold text-white transition-colors duration-200 hover:bg-slate-800 disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
            aria-label="Mulai pemantauan pergerakan kendaraan"
          >
            <Play size={17} aria-hidden="true" />
            Mulai
          </button>
          <button
            type="button"
            onClick={pauseSimulation}
            disabled={!isSimulating}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-bold text-slate-700 transition-colors duration-200 hover:border-slate-900 hover:text-slate-900 disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
            aria-label="Jeda pemantauan pergerakan kendaraan"
          >
            <Pause size={17} aria-hidden="true" />
            Pause
          </button>
          <button
            type="button"
            onClick={resetSimulation}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-bold text-slate-700 transition-colors duration-200 hover:border-slate-900 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
            aria-label="Reset posisi kendaraan ke titik awal"
          >
            <RotateCcw size={17} aria-hidden="true" />
            Reset
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[2fr_1.15fr]">
        <motion.section
          initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.35 }}
          className="rounded-3xl border border-slate-200 bg-white p-4 shadow-[0_18px_42px_-30px_rgba(15,23,42,0.35)]"
          aria-label="Peta tracking kendaraan aktif"
        >
          <div className="h-[340px] overflow-hidden rounded-2xl md:h-[390px] xl:h-[430px]">
            <MapContainer
              center={selectedVehicle?.currentPosition || YOGYAKARTA_CENTER}
              zoom={13}
              scrollWheelZoom
              className="h-full w-full"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {selectedVehicle && (
                <MapFocus position={selectedVehicle.currentPosition} reducedMotion={shouldReduceMotion} />
              )}
              {vehicles.map((vehicle) => (
                <Marker
                  key={vehicle.id}
                  position={vehicle.currentPosition}
                  icon={createMarkerIcon(vehicle.status)}
                  eventHandlers={{ click: () => setSelectedId(vehicle.id) }}
                >
                  <Popup>
                    <div className="space-y-1 text-sm">
                      <p className="font-bold">{vehicle.carModel}</p>
                      <p>{vehicle.plateNumber}</p>
                      <p>{statusLabel[vehicle.status] || vehicle.status}</p>
                      <p>{vehicle.lastLocation}</p>
                      <p>{vehicle.speed} km/jam</p>
                      <p>Penyewa: {vehicle.renterName}</p>
                    </div>
                  </Popup>
                </Marker>
              ))}
              {selectedVehicle?.route?.length > 1 && (
                <Polyline
                  positions={selectedVehicle.route}
                  pathOptions={{ color: '#0f172a', weight: 4, opacity: 0.65 }}
                />
              )}
            </MapContainer>
          </div>
        </motion.section>

        <section className="flex h-auto flex-col rounded-3xl border border-slate-200 bg-white p-4 shadow-sm md:h-[430px]">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-extrabold text-slate-950">Daftar Kendaraan</h2>
              <p className="mt-1 text-sm text-slate-500">Pilih kendaraan untuk melihat detail di bawah.</p>
            </div>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-extrabold text-slate-600">
              {vehicles.length} unit
            </span>
          </div>
          <div className="min-h-0 flex-1 space-y-3 overflow-y-auto pr-1">
            {vehicles.map((vehicle) => {
              const isSelected = selectedVehicle?.id === vehicle.id;

              return (
                <button
                  key={vehicle.id}
                  type="button"
                  onClick={() => setSelectedId(vehicle.id)}
                  className={`w-full rounded-2xl border p-4 text-left transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 ${
                    isSelected
                      ? 'border-slate-900 bg-slate-950 text-white shadow-sm'
                      : 'border-slate-100 bg-slate-50 text-slate-800 hover:border-slate-300 hover:bg-white'
                  }`}
                  aria-label={`Pilih kendaraan ${vehicle.carModel} ${vehicle.plateNumber}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-extrabold">{vehicle.carModel}</p>
                      <p className={isSelected ? 'text-sm text-slate-300' : 'text-sm text-slate-500'}>
                        {vehicle.plateNumber}
                      </p>
                    </div>
                    <StatusBadge value={vehicle.status} />
                  </div>
                  <div className={isSelected ? 'mt-3 text-sm text-slate-300' : 'mt-3 text-sm text-slate-500'}>
                    <p>{vehicle.renterName}</p>
                    <p>{vehicle.lastLocation}</p>
                    <p>{vehicle.speed} km/jam - {formatLastUpdated(vehicle.lastUpdated)}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </section>
      </div>

      {selectedVehicle && (
        <section className="mt-5 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm md:p-5">
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-[360px_1fr]">
            <div className="overflow-hidden rounded-2xl border border-slate-100 bg-slate-50">
              <SafeImage
                src={selectedVehicle.image}
                alt={`${selectedVehicle.carModel} ${selectedVehicle.plateNumber}`}
                className="aspect-[16/10] h-full w-full object-cover"
              />
            </div>

            <div className="flex flex-col">
              <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-400">
                    Detail Kendaraan
                  </p>
                  <h2 className="mt-2 text-2xl font-black text-slate-950">{selectedVehicle.carModel}</h2>
                  <p className="font-bold text-slate-500">{selectedVehicle.plateNumber}</p>
                </div>
                <StatusBadge value={selectedVehicle.status} />
              </div>

              <div className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-3">
                <div className="flex gap-3 rounded-2xl bg-slate-50 p-4">
                  <User className="mt-0.5 h-5 w-5 shrink-0 text-slate-400" aria-hidden="true" />
                  <div>
                    <p className="font-bold text-slate-900">Penyewa</p>
                    <p className="text-slate-500">{selectedVehicle.renterName}</p>
                  </div>
                </div>
                <div className="flex gap-3 rounded-2xl bg-slate-50 p-4">
                  <Gauge className="mt-0.5 h-5 w-5 shrink-0 text-slate-400" aria-hidden="true" />
                  <div>
                    <p className="font-bold text-slate-900">Kecepatan</p>
                    <p className="text-slate-500">{selectedVehicle.speed} km/jam</p>
                  </div>
                </div>
                <div className="flex gap-3 rounded-2xl bg-slate-50 p-4">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-slate-400" aria-hidden="true" />
                  <div>
                    <p className="font-bold text-slate-900">Lokasi Terakhir</p>
                    <p className="text-slate-500">{selectedVehicle.lastLocation}</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-[1fr_auto]">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="font-bold text-slate-900">Koordinat & Update</p>
                  <p className="mt-1 font-mono text-xs text-slate-500">
                    {selectedVehicle.currentPosition[0].toFixed(5)}, {selectedVehicle.currentPosition[1].toFixed(5)}
                  </p>
                  <p className="mt-2 text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
                    Update: {formatLastUpdated(selectedVehicle.lastUpdated)}
                  </p>
                </div>
                <Link
                  to="/admin/rental"
                  className="inline-flex min-h-11 items-center justify-center rounded-xl bg-slate-900 px-6 py-2.5 text-sm font-bold text-white transition-colors duration-200 hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
                >
                  Lihat Penyewaan
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default AdminTracking;
