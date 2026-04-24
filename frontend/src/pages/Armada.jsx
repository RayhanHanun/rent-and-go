import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Users, Briefcase, Settings, ChevronRight } from 'lucide-react';

const DUMMY_CARS = [
  {
    id: 1,
    name: "Tesla Model 3",
    category: "LUXURY",
    price: "Rp 1.500.000",
    image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    seats: 5,
    luggage: 2,
    transmission: "Automatic"
  },
  {
    id: 2,
    name: "Range Rover Vogue",
    category: "SUV",
    price: "Rp 3.500.000",
    image: "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    seats: 5,
    luggage: 4,
    transmission: "Automatic"
  },
  {
    id: 3,
    name: "Mercedes-Benz G-Class",
    category: "SUV",
    price: "Rp 5.000.000",
    image: "https://images.unsplash.com/photo-1520031441872-265e4ff70366?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    seats: 5,
    luggage: 3,
    transmission: "Automatic"
  },
  {
    id: 4,
    name: "BMW M3 Competition",
    category: "SPORT",
    price: "Rp 3.000.000",
    image: "https://images.unsplash.com/photo-1553440569-bcc63803a83d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    seats: 4,
    luggage: 2,
    transmission: "Automatic"
  },
  {
    id: 5,
    name: "Porsche 911 Carrera",
    category: "SPORT",
    price: "Rp 6.000.000",
    image: "https://images.unsplash.com/photo-1503376713356-20092c422c53?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    seats: 2,
    luggage: 1,
    transmission: "Automatic"
  },
  {
    id: 6,
    name: "Toyota Alphard",
    category: "LUXURY",
    price: "Rp 2.500.000",
    image: "https://images.unsplash.com/photo-1626081498696-6e2feabcedd8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    seats: 7,
    luggage: 4,
    transmission: "Automatic"
  },
  {
    id: 7,
    name: "Honda Civic Type R",
    category: "SPORT",
    price: "Rp 2.000.000",
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    seats: 4,
    luggage: 2,
    transmission: "Manual"
  },
  {
    id: 8,
    name: "Mercedes-Benz S-Class",
    category: "SEDAN",
    price: "Rp 4.500.000",
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    seats: 5,
    luggage: 3,
    transmission: "Automatic"
  }
];

const CATEGORIES = ["ALL", "SUV", "SEDAN", "LUXURY", "SPORT"];

const Armada = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("ALL");

  const filteredCars = DUMMY_CARS.filter((car) => {
    const matchesSearch = car.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "ALL" || car.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="pt-24 min-h-screen bg-slate-50 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
            Our Premium <span className="text-blue-600">Fleet</span>
          </h1>
          <p className="text-lg text-slate-500">
            Tentukan pilihan kendaraan premium yang menyempurnakan gaya dan kenyamanan perjalanan Anda berikutnya.
          </p>
        </div>

        {/* Filters Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
          
          {/* Search */}
          <div className="relative w-full md:w-96 shrink-0">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Search cars by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl leading-5 bg-slate-50 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors sm:text-sm"
            />
          </div>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                /* Aku pindahkan 'border' ke class utama agar dimensinya selalu stabil di semua kondisi */
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 whitespace-nowrap border ${
                  activeCategory === category
                    ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-500/30" // Border ikut warna biru
                    : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100 hover:border-slate-300" // Border abu-abu
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Car Grid with Scroll Reveal (framer-motion) */}
        {filteredCars.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredCars.map((car, index) => (
              <motion.div
                key={car.id}
                /* Animasi Scroll Reveal: Muncul dari bawah saat di-scroll */
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 0.5, 
                  ease: "easeOut",
                  delay: index * 0.1 /* Efek beruntun */
                }}
                /* Efek Hover Premium Tailwind */
                className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-blue-900/10 hover:-translate-y-2 transition-all duration-300 ease-out group flex flex-col"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden bg-slate-100">
                  <img 
                    src={car.image} 
                    alt={car.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-slate-800 shadow-sm">
                    {car.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col grow">
                  <h3 className="text-xl font-bold text-slate-900 mb-4">{car.name}</h3>
                  
                  {/* Specs */}
                  <div className="grid grid-cols-3 gap-4 mb-6 pb-6 border-b border-slate-100">
                    <div className="flex flex-col items-center justify-center gap-1.5 p-2 rounded-xl bg-slate-50 text-slate-600">
                      <Users className="w-5 h-5 text-blue-600" />
                      <span className="text-xs font-medium">{car.seats} Seats</span>
                    </div>
                    <div className="flex flex-col items-center justify-center gap-1.5 p-2 rounded-xl bg-slate-50 text-slate-600">
                      <Briefcase className="w-5 h-5 text-blue-600" />
                      <span className="text-xs font-medium">{car.luggage} Bags</span>
                    </div>
                    <div className="flex flex-col items-center justify-center gap-1.5 p-2 rounded-xl bg-slate-50 text-slate-600">
                      <Settings className="w-5 h-5 text-blue-600" />
                      <span className="text-xs font-medium truncate w-full text-center">{car.transmission}</span>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="mt-auto flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-500 mb-0.5">Mulai dari</p>
                      <p className="text-lg font-bold text-slate-900">
                        {car.price} <span className="text-sm font-normal text-slate-500">/ hari</span>
                      </p>
                    </div>
                    <button className="bg-slate-900 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 flex items-center gap-1">
                      Book Now
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="bg-white mx-auto w-24 h-24 rounded-full flex items-center justify-center mb-4 shadow-sm border border-slate-100">
              <Search className="w-10 h-10 text-slate-300" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">No cars found</h3>
            <p className="text-slate-500">We couldn't find any cars matching your search or category.</p>
            <button 
              onClick={() => { setSearchTerm(""); setActiveCategory("ALL"); }}
              className="mt-6 text-blue-600 font-medium hover:text-blue-700 underline underline-offset-4"
            >
              Clear filters
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default Armada;