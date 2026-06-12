import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Heart, FileText, Activity, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const defaultCars = [
  {
    id: 1,
    name: "Toyota Agya",
    category: "CITY CAR",
    transmission: "Automatic",
    price: "Rp 250.000",
    rating: 4.9,
    featured: true,
    imageUrl: "https://images.unsplash.com/photo-1590362891991-f776e747a588?q=80&w=1500&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Toyota Avanza",
    category: "SUV",
    transmission: "AT / MT",
    price: "Rp 300.000",
    rating: 4.8,
    featured: true,
    imageUrl: "https://plus.unsplash.com/premium_photo-1661338573175-10acb650fbdf?q=80&w=1500&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Honda HR-V",
    category: "SUV",
    transmission: "Automatic",
    price: "Rp 450.000",
    rating: 4.7,
    featured: true,
    imageUrl: "https://images.unsplash.com/photo-1550355291-bbee04a92027?q=80&w=1500&auto=format&fit=crop"
  },
  {
    id: 4,
    name: "Innova Zenix",
    category: "PREMIUM",
    transmission: "Automatic",
    price: "Rp 600.000",
    rating: 4.8,
    featured: false,
    imageUrl: "https://images.unsplash.com/photo-1549921296-3a6b3923f0d9?q=80&w=1500&auto=format&fit=crop"
  },
  {
    id: 5,
    name: "Toyota Alphard",
    category: "PREMIUM",
    transmission: "Automatic",
    price: "Rp 1.500.000",
    rating: 4.9,
    featured: false,
    imageUrl: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?q=80&w=1500&auto=format&fit=crop"
  },
  {
    id: 6,
    name: "Toyota Hiace",
    category: "MICROBUS",
    transmission: "Manual",
    price: "Rp 900.000",
    rating: 4.8,
    featured: false,
    imageUrl: "https://images.unsplash.com/photo-1551830820-330a71b99659?q=80&w=1500&auto=format&fit=crop"
  }
];

const addFeaturedFlags = (cars) => {
  const hasFeaturedCars = cars.some((car) => car.featured === true || car.favorite === true);

  return cars.map((car, index) => ({
    ...car,
    featured: hasFeaturedCars
      ? car.featured === true || car.favorite === true
      : index < 3
  }));
};

const CarList = () => {
  const [cars, setCars] = useState(defaultCars);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get('/api/cars');
        // fallback to default if empty
        setCars(response.data?.length ? addFeaturedFlags(response.data) : defaultCars);
      } catch (error) {
        console.error("Failed to fetch cars, using fallback data", error);
        setCars(defaultCars);
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, []);

  const featuredCars = cars
    .filter((car) => car.featured === true || car.favorite === true)
    .slice(0, 6);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Armada Pilihan untuk Perjalananmu</h2>
          <p className="text-slate-500">
            Temukan beberapa pilihan kendaraan terbaik yang nyaman, fleksibel, dan siap menemani kebutuhan perjalananmu.
          </p>
        </div>

        {/* Grid Container */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
          }}
        >
          <AnimatePresence mode="popLayout">
            {loading ? (
               // Skeletons
               [1, 2, 3].map((n) => (
                <div key={n} className="rounded-2xl border border-slate-100 overflow-hidden shadow-sm animate-pulse">
                  <div className="h-48 bg-slate-200 w-full" />
                  <div className="p-6">
                    <div className="h-6 bg-slate-200 rounded w-1/2 mb-4" />
                    <div className="h-4 bg-slate-200 rounded w-1/3 mb-6" />
                    <div className="flex justify-between">
                      <div className="h-8 bg-slate-200 rounded w-1/3" />
                      <div className="h-10 bg-slate-200 rounded w-24" />
                    </div>
                  </div>
                </div>
               ))
            ) : (
              Array.isArray(featuredCars) ? featuredCars.map((car) => (
                <motion.div
                  layout
                  variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  key={car.id}
                  className="rounded-2xl border border-slate-100 overflow-hidden bg-white hover:-translate-y-2 hover:shadow-xl hover:shadow-slate-950/5 transition-all duration-300 ease-in-out group relative"
                >
                  <button className="absolute top-4 right-4 z-10 p-2 bg-white/70 backdrop-blur-md rounded-full text-slate-400 hover:text-red-500 hover:bg-white transition-colors">
                    <Heart size={20} />
                  </button>
                  <div className="h-48 overflow-hidden relative bg-slate-50">
                    <img 
                      src={car.imageUrl} 
                      alt={car.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                  </div>
                  
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                       <h3 className="text-xl font-bold text-slate-900">{car.name}</h3>
                       <div className="flex items-center gap-1 text-sm font-medium">
                         <span className="text-yellow-500 text-lg leading-none">★</span>
                         {car.rating}
                       </div>
                    </div>
                    
                    <div className="flex items-center gap-4 text-slate-500 text-sm mb-6 pb-6 border-b border-slate-100">
                      <div className="flex items-center gap-1.5 hover:text-slate-900 transition-colors">
                        <Activity size={16} className="text-slate-400" /> {car.transmission}
                      </div>
                      <div className="flex items-center gap-1.5 hover:text-slate-900 transition-colors">
                        <FileText size={16} className="text-slate-400" /> {car.category}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-auto">
                      <div>
                        <span className="text-2xl font-bold text-slate-900">{car.price}</span>
                        <span className="text-slate-400 text-sm font-medium"> / hari</span>
                      </div>
                      <button className="bg-slate-900 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-slate-900 transition-colors">
                        Sewa
                      </button>
                    </div>
                  </div>
                </motion.div>
              )) : null
            )}
          </AnimatePresence>
        </motion.div>

        <div className="flex justify-center mt-12">
          <Link
            to="/fleet"
            className="bg-slate-900 text-white px-8 py-4 rounded-full font-bold hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 group"
          >
            Lihat Semua Armada
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  );
};

export default CarList;
