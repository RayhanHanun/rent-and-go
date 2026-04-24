import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Heart, FileText, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const defaultCars = [
  {
    id: 1,
    name: "Tesla Model 3",
    category: "LUXURY",
    transmission: "Electric Automatic",
    price: "Rp 1.5jt",
    rating: 4.9,
    imageUrl: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    name: "Range Rover",
    category: "SUV",
    transmission: "Automatic",
    price: "Rp 2.2jt",
    rating: 4.8,
    imageUrl: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    name: "Honda Civic",
    category: "SEDAN",
    transmission: "Automatic",
    price: "Rp 800rb",
    rating: 4.7,
    imageUrl: "https://images.unsplash.com/photo-1590362891991-f776e747a588?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  }
];

const categories = ["ALL", "SUV", "SEDAN", "CITY CAR", "LUXURY"];

const CarList = () => {
  const [cars, setCars] = useState(defaultCars);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("ALL");

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get('/api/cars');
        // fallback to default if empty
        setCars(response.data?.length ? response.data : defaultCars);
      } catch (error) {
        console.error("Failed to fetch cars, using fallback data", error);
        setCars(defaultCars);
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, []);

  const filteredCars = activeCategory === "ALL" 
    ? cars 
    : cars.filter(car => car.category.toUpperCase() === activeCategory);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Mobil Favorit untuk Anda</h2>
          <p className="text-slate-500">
            Temukan kendaraan yang paling sesuai dengan kebutuhan gaya hidup Anda.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === category 
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/20" 
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
              Array.isArray(filteredCars) ? filteredCars.map((car) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  key={car.id}
                  className="rounded-2xl border border-slate-100 overflow-hidden bg-white hover:shadow-xl transition-shadow group relative"
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
                      <div className="flex items-center gap-1.5 hover:text-blue-600 transition-colors">
                        <Activity size={16} className="text-slate-400" /> {car.transmission}
                      </div>
                      <div className="flex items-center gap-1.5 hover:text-blue-600 transition-colors">
                        <FileText size={16} className="text-slate-400" /> {car.category}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-auto">
                      <div>
                        <span className="text-2xl font-bold text-blue-600">{car.price}</span>
                        <span className="text-slate-400 text-sm font-medium"> / hari</span>
                      </div>
                      <button className="bg-slate-900 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-600 transition-colors">
                        Sewa
                      </button>
                    </div>
                  </div>
                </motion.div>
              )) : null
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};

export default CarList;
