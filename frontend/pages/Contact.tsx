import React, { useState } from "react";
import { api } from "../services/api";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setOk(false);
    try {
      await api.sendMessage(form);
      setOk(true);
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (err: any) {
      setError(err?.message || "Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-50 px-6 py-20">
      <div className="max-w-3xl mx-auto bg-white rounded-[2.5rem] shadow-2xl border border-pink-100 overflow-hidden">
        <div className="p-10 border-b border-pink-100">
          <h1 className="text-4xl font-serif text-gray-900">Contact Us</h1>
          <p className="text-gray-500 mt-2">We’ll reply within 24 hours.</p>
        </div>

        <form onSubmit={submit} className="p-10 space-y-6">
          {ok && <div className="p-4 rounded-2xl bg-green-50 text-green-700 border border-green-100">Message sent!</div>}
          {error && <div className="p-4 rounded-2xl bg-red-50 text-red-600 border border-red-100">{error}</div>}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-bold text-gray-700">Name</label>
              <input
                value={form.name}
                onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                className="w-full mt-2 p-4 rounded-2xl border-2 border-gray-100 focus:border-brand-pink outline-none"
                required
              />
            </div>
            <div>
              <label className="text-sm font-bold text-gray-700">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                className="w-full mt-2 p-4 rounded-2xl border-2 border-gray-100 focus:border-brand-pink outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-bold text-gray-700">Phone (optional)</label>
            <input
              value={form.phone}
              onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
              className="w-full mt-2 p-4 rounded-2xl border-2 border-gray-100 focus:border-brand-pink outline-none"
            />
          </div>

          <div>
            <label className="text-sm font-bold text-gray-700">Message</label>
            <textarea
              value={form.message}
              onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
              className="w-full mt-2 p-4 rounded-2xl border-2 border-gray-100 focus:border-brand-pink outline-none"
              rows={6}
              required
            />
          </div>

          <button
            disabled={loading}
            className="w-full py-5 bg-brand-pink text-white rounded-2xl font-bold shadow-xl shadow-pink-100 hover:bg-brand-700 transition disabled:opacity-60"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
}
