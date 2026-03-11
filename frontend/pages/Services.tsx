
import React, { useState, useEffect } from 'react';
import { Service } from '../types';
import { api } from '../services/api';
import { Link } from 'react-router-dom';

const Services: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    api.getServices().then(setServices);
  }, []);

  const categories = ['All', 'Hair', 'Makeup', 'Spa', 'Nails', 'Facial'];
  const filteredServices = filter === 'All' ? services : services.filter(s => s.category === filter);

  return (
    <div className="min-h-screen bg-pink-50/30 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-brand-pink font-bold uppercase tracking-widest text-sm">Treatments</span>
          <h1 className="text-5xl font-serif text-gray-900 mt-2">Luxury Salon Services</h1>
          <p className="text-gray-500 max-w-2xl mx-auto mt-4">Experience personalized beauty care from our certified experts using world-class equipment and techniques.</p>
        </div>

        {/* Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-8 py-3 rounded-full border-2 transition-all font-bold tracking-wide ${
                filter === cat 
                ? 'bg-brand-pink border-brand-pink text-white shadow-xl scale-105' 
                : 'bg-white border-pink-100 text-gray-600 hover:border-brand-pink hover:text-brand-pink'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredServices.map(service => (
            <div key={service.id} className="group bg-white rounded-[2rem] overflow-hidden shadow-sm border border-pink-50 hover:shadow-2xl transition-all duration-500">
              <div className="h-72 overflow-hidden relative">
                <img src={service.imageUrl} alt={service.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-brand-pink">
                  {service.duration}
                </div>
              </div>
              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-brand-pink text-xs font-black uppercase tracking-widest">{service.category}</span>
                    <h3 className="text-2xl font-serif text-gray-900 mt-1">{service.name}</h3>
                  </div>
                  <span className="text-2xl font-bold text-gray-900">₹{service.price}</span>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed mb-8 line-clamp-3">{service.description}</p>
                <Link 
                  to={`/book/${service.id}`}
                  className="block w-full text-center bg-brand-pink text-white py-4 rounded-2xl font-bold hover:bg-brand-700 transition shadow-lg transform active:scale-95"
                >
                  Book Appointment
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
