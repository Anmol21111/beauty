import React, { useEffect, useState } from "react";
import { api } from "../services/api";
import { Appointment, AppointmentStatus } from "../types";

export default function MyAppointments() {
  const [items, setItems] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const run = async () => {
      try {
        setLoading(true);
        setError(null);
        setItems(await api.getMyAppointments());
      } catch (e: any) {
        setError(e?.message || "Failed to load appointments");
      } finally {
        setLoading(false);
      }
    };
    run();
  }, []);

  return (
    <div className="min-h-screen bg-pink-50 py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-serif text-gray-900 mb-8">My Appointments</h1>
        {error && <p className="text-red-600 mb-4">{error}</p>}

        <div className="bg-white rounded-3xl shadow-xl border border-pink-100 overflow-hidden">
          {loading ? (
            <div className="p-8 text-gray-500">Loading...</div>
          ) : items.length === 0 ? (
            <div className="p-10 text-center text-gray-500">No appointments yet.</div>
          ) : (
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 font-semibold text-gray-700">Service</th>
                  <th className="px-6 py-4 font-semibold text-gray-700">Date</th>
                  <th className="px-6 py-4 font-semibold text-gray-700">Time</th>
                  <th className="px-6 py-4 font-semibold text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {items.map((a) => (
                  <tr key={a.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">{a.serviceName}</td>
                    <td className="px-6 py-4">{a.date}</td>
                    <td className="px-6 py-4">{a.time}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-bold ${
                          a.status === AppointmentStatus.PENDING
                            ? "bg-yellow-100 text-yellow-700"
                            : a.status === AppointmentStatus.CONFIRMED
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                        }`}
                      >
                        {a.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
