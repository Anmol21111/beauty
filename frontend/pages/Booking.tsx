
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Service } from '../types';
import { api } from '../services/api';
import { useAuth } from '../services/authContext';

const Booking: React.FC = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState<Service | null>(null);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;
    api.getServices().then((services) => {
      const s = services.find((x) => x.id === serviceId);
      if (s) setService(s);
    });
  }, [serviceId, user]);

  const handleBook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !time || !service || !user) return;

    setLoading(true);
    await api.bookAppointment({ serviceId: service.id, date, time });
    setLoading(false);
    alert('Appointment booked successfully!');
    navigate('/');
  };

  if (!service) return <div className="p-20 text-center">Loading Service...</div>;

  return (
    <div className="min-h-screen bg-pink-50 py-20 px-6">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-8">
        {/* Service Summary */}
        <div className="w-full md:w-1/3 space-y-6">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-pink-100">
            <img src={service.imageUrl} alt={service.name} className="w-full h-40 object-cover rounded-2xl mb-4" />
            <h3 className="text-xl font-bold text-gray-900">{service.name}</h3>
            <p className="text-brand-pink font-bold text-lg mt-1">₹{service.price}</p>
            <p className="text-gray-500 text-sm mt-2">Duration: {service.duration}</p>
          </div>
          <div className="bg-brand-pink text-white p-6 rounded-3xl shadow-lg">
            <h4 className="font-bold mb-2">Booking Policy</h4>
            <p className="text-xs opacity-90">Please arrive 15 minutes early. Rescheduling must be done at least 24 hours in advance.</p>
          </div>
        </div>

        {/* Booking Form */}
        <div className="flex-1 bg-white p-10 rounded-3xl shadow-xl border border-pink-100">
          <h2 className="text-3xl font-serif mb-8">Schedule Appointment</h2>
          <form onSubmit={handleBook} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Select Date</label>
                <input 
                  type="date" 
                  required
                  min={new Date().toISOString().split('T')[0]}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full p-3 border-2 border-gray-100 rounded-xl focus:border-brand-pink outline-none" 
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Preferred Time</label>
                <select 
                  required
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full p-3 border-2 border-gray-100 rounded-xl focus:border-brand-pink outline-none"
                >
                  <option value="">Choose Time</option>
                  {['10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM'].map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
              <h4 className="text-sm font-bold text-gray-600 mb-1">Customer Details</h4>
              <p className="text-sm text-gray-900">{user.name} ({user.email})</p>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-brand-pink text-white rounded-xl font-bold shadow-lg hover:bg-brand-700 transition"
            >
              {loading ? 'Processing...' : 'Confirm Booking'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Booking;
