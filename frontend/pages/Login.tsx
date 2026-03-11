import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../services/authContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await login(email, password);
      navigate("/");
    } catch (err: any) {
      setError(err?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-white px-4">
      <div className="bg-white p-12 rounded-[3rem] shadow-2xl w-full max-w-md border border-pink-100 relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-pink/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>

        <h2 className="text-4xl font-serif text-center mb-4 text-gray-900">Welcome Back</h2>
        <p className="text-center text-gray-500 mb-10">Luxury beauty is just a click away</p>

        {error && (
          <div className="bg-red-50 text-red-500 p-4 rounded-2xl mb-6 text-sm flex items-center border border-red-100">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border-2 border-gray-100 rounded-2xl focus:border-brand-pink outline-none transition-all"
              required
            />
            <svg
              className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>

          <div className="relative">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border-2 border-gray-100 rounded-2xl focus:border-brand-pink outline-none transition-all"
              required
            />
            <svg
              className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-5 bg-brand-pink text-white rounded-2xl font-bold shadow-xl shadow-pink-100 hover:bg-brand-700 transition transform hover:scale-[1.02] active:scale-95 disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="mt-10 text-center flex flex-col space-y-4">
          <p className="text-sm text-gray-500">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="text-brand-pink font-bold hover:underline">
              Register Now
            </Link>
          </p>
          <div className="flex items-center justify-center space-x-2 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
            <span className="w-8 h-[1px] bg-gray-100"></span>
            <span>Admin Demo</span>
            <span className="w-8 h-[1px] bg-gray-100"></span>
          </div>
          <p className="text-[10px] text-gray-400">admin@beauty.com / Admin@12345</p>
        </div>
      </div>
    </div>
  );
}
