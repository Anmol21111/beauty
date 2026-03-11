
import React from 'react';
import { Link } from 'react-router-dom';
import { User, UserRole } from '../types';

interface NavbarProps {
  user: User | null;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, onLogout }) => {
  return (
    <nav className="sticky top-0 z-50 glass border-b border-pink-100 px-6 py-4 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold bg-gradient-to-r from-brand-pink to-brand-700 bg-clip-text text-transparent font-serif">
            GLOW & GRACE
          </span>
        </Link>

        <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-700">
          <Link to="/" className="hover:text-brand-pink transition">Home</Link>
          <Link to="/about" className="hover:text-brand-pink transition">About</Link>
          <Link to="/services" className="hover:text-brand-pink transition">Services</Link>
          <Link to="/consultant" className="hover:text-brand-pink transition">AI Consultant</Link>
          
          {user ? (
            <div className="flex items-center space-x-6 border-l pl-6 border-pink-100">
              <div className="flex items-center space-x-3">
                <div className="relative group">
                  <img 
                    src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}&background=ff4d8d&color=fff`} 
                    alt={user.name} 
                    className="w-10 h-10 rounded-full border-2 border-brand-gold object-cover shadow-sm group-hover:scale-110 transition-transform cursor-pointer"
                  />
                  <div className="absolute top-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-gray-900 leading-none">{user.name.split(' ')[0]}</span>
                  <span className="text-[10px] text-brand-pink uppercase font-black tracking-tighter">{user.role}</span>
                </div>
              </div>

              {user.role === UserRole.ADMIN ? (
                <Link to="/admin" className="px-4 py-2 bg-brand-pink text-white rounded-full hover:bg-brand-600 transition shadow-md text-xs font-bold">
                  Dashboard
                </Link>
              ) : (
                <Link to="/my-appointments" className="hover:text-brand-pink transition font-bold">Bookings</Link>
              )}
              
              <button 
                onClick={onLogout} 
                className="text-gray-400 hover:text-red-500 transition-colors"
                title="Logout"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </div>
          ) : (
            <Link to="/login" className="px-8 py-2.5 bg-brand-pink text-white rounded-full hover:bg-brand-700 transition font-bold shadow-lg shadow-pink-200">
              Join Now
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
