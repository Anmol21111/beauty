import React from "react";
import { HashRouter as Router, Navigate, Route, Routes, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import FloatingCTA from "./components/FloatingCTA";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import AIConsultant from "./pages/AIConsultant";
import AdminDashboard from "./pages/AdminDashboard";
import Booking from "./pages/Booking";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Contact from "./pages/Contact";
import MyAppointments from "./pages/MyAppointments";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider, useAuth } from "./services/authContext";

function AppShell() {
  const { user, logout } = useAuth();

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-white">
        <Navbar user={user} onLogout={logout} />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/consultant" element={<AIConsultant />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route
              path="/book/:serviceId"
              element={
                <ProtectedRoute>
                  <Booking />
                </ProtectedRoute>
              }
            />
            <Route
              path="/my-appointments"
              element={
                <ProtectedRoute>
                  <MyAppointments />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute adminOnly>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <FloatingCTA />
        <footer className="bg-[#1a1a1a] text-white py-20 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-1">
              <h3 className="text-3xl font-serif text-brand-pink mb-6">Glow &amp; Grace</h3>
              <p className="text-gray-400 leading-relaxed mb-6">
                India&apos;s premier destination for luxury beauty treatments and professional skill development.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-brand-pink transition cursor-pointer">FB</div>
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-brand-pink transition cursor-pointer">IG</div>
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-brand-pink transition cursor-pointer">YT</div>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-6 border-b border-gray-800 pb-2">Academy</h4>
              <ul className="space-y-4 text-gray-400">
                <li><Link to="/about" className="hover:text-brand-pink transition">Our Academy</Link></li>
                <li><Link to="/services" className="hover:text-brand-pink transition">Cosmetology</Link></li>
                <li><Link to="/services" className="hover:text-brand-pink transition">Nail Technician</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-6 border-b border-gray-800 pb-2">Our Presence</h4>
              <ul className="space-y-4 text-gray-400">
                <li>Delhi NCR</li>
                <li>Mumbai</li>
                <li>Bangalore</li>
                <li>International</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-6 border-b border-gray-800 pb-2">Support</h4>
              <ul className="space-y-4 text-gray-400">
                <li><Link to="/contact" className="hover:text-brand-pink transition">Contact Us</Link></li>
                <li><a href="#" className="hover:text-brand-pink transition">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-brand-pink transition">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="max-w-7xl mx-auto border-t border-gray-800 mt-20 pt-10 text-center flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
            <span>© 2026 Orane-Style Beauty Academy &amp; Salons. All rights reserved.</span>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <span>GSTIN: 07AAGCO0001A1Z5</span>
              <span>ISO 9001:2015 Certified</span>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppShell />
    </AuthProvider>
  );
}
