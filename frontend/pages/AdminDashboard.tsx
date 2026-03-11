import React, { useEffect, useMemo, useState } from "react";
import { api } from "../services/api";
import { Appointment, AppointmentStatus, Message, Service, User } from "../types";

type Tab = "services" | "appointments" | "users" | "messages";

const emptyService: Partial<Service> = {
  name: "",
  category: "",
  price: 0,
  duration: "",
  description: "",
  imageUrl: ""
};

function getId(x: any): string {
  return String(x?.id || x?._id || "");
}

function normalizeStatus(s: any): AppointmentStatus {
  const v = String(s || "").toUpperCase();
  if (v === "CONFIRMED") return AppointmentStatus.CONFIRMED;
  if (v === "CANCELLED" || v === "CANCELED") return AppointmentStatus.CANCELLED;
  return AppointmentStatus.PENDING;
}

function statusLabel(st: AppointmentStatus) {
  if (st === AppointmentStatus.CONFIRMED) return "Approved";
  if (st === AppointmentStatus.CANCELLED) return "Cancelled";
  return "Pending";
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>("services");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [services, setServices] = useState<Service[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);

  // Add/Edit Service modal
  const [serviceModalOpen, setServiceModalOpen] = useState(false);
  const [editing, setEditing] = useState<Service | null>(null);
  const [serviceForm, setServiceForm] = useState<Partial<Service>>(emptyService);

  const pendingCount = useMemo(
    () => appointments.filter((a: any) => normalizeStatus(a.status) === AppointmentStatus.PENDING).length,
    [appointments]
  );

  const fetchData = async (tab = activeTab) => {
    setLoading(true);
    setError(null);
    try {
      // ✅ Always fetch services + appointments (pendingCount & admin overview)
      const [s, ap] = await Promise.all([api.getServices(), api.getAllAppointments()]);
      setServices(s);

      const normalizedAppts = (ap as any[]).map((a) => ({
        ...a,
        id: getId(a),
        status: normalizeStatus(a.status)
      }));
      setAppointments(normalizedAppts as any);

      // Fetch others only when needed
      if (tab === "users") setUsers(await api.getUsers());
      if (tab === "messages") setMessages(await api.getMessages());
    } catch (e: any) {
      setError(e?.message || "Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(activeTab);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  const openAdd = () => {
    setEditing(null);
    setServiceForm({ ...emptyService });
    setServiceModalOpen(true);
  };

  const openEdit = (s: Service) => {
    setEditing(s);
    setServiceForm({ ...s });
    setServiceModalOpen(true);
  };

  const saveService = async () => {
    setLoading(true);
    setError(null);
    try {
      const payload = {
        name: String(serviceForm.name || "").trim(),
        category: String(serviceForm.category || "").trim(),
        price: Number(serviceForm.price || 0),
        duration: String(serviceForm.duration || ""),
        description: String(serviceForm.description || ""),
        imageUrl: String(serviceForm.imageUrl || "")
      };
      if (!payload.name || !payload.category || !Number.isFinite(payload.price)) {
        setError("Name, category and price are required");
        return;
      }

      if (editing) await api.updateService((editing as any).id || (editing as any)._id, payload);
      else await api.addService(payload);

      setServiceModalOpen(false);
      await fetchData();
    } catch (e: any) {
      setError(e?.message || "Failed to save service");
    } finally {
      setLoading(false);
    }
  };

  const deleteService = async (id: string) => {
    if (!confirm("Delete this service?")) return;
    setLoading(true);
    setError(null);
    try {
      await api.deleteService(id);
      await fetchData();
    } catch (e: any) {
      setError(e?.message || "Failed to delete service");
    } finally {
      setLoading(false);
    }
  };

  // ✅ CONFIRM/CANCEL FIX: optimistic update + normalize + refresh
  const updateStatus = async (id: string, status: AppointmentStatus) => {
    setLoading(true);
    setError(null);

    // 1) Optimistic UI update (turant Approved दिखे)
    setAppointments((prev: any) =>
      prev.map((a: any) => (getId(a) === id ? { ...a, status } : a))
    );

    try {
      // 2) Backend update
      await api.updateAppointmentStatus(id, status);

      // 3) Reload & normalize
      const fresh = await api.getAllAppointments();
      const normalized = (fresh as any[]).map((a) => ({
        ...a,
        id: getId(a),
        status: normalizeStatus(a.status)
      }));
      setAppointments(normalized as any);
    } catch (e: any) {
      setError(e?.message || "Failed to update appointment");
      // Re-sync (fallback)
      await fetchData();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 p-6 space-y-2">
        <h2 className="text-xl font-bold text-brand-pink mb-6 px-2">Admin Panel</h2>

        <button
          onClick={() => setActiveTab("services")}
          className={`w-full text-left px-4 py-3 rounded-lg font-medium transition ${
            activeTab === "services" ? "bg-brand-50 text-brand-pink" : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          Services
        </button>

        <button
          onClick={() => setActiveTab("appointments")}
          className={`w-full text-left px-4 py-3 rounded-lg font-medium transition ${
            activeTab === "appointments" ? "bg-brand-50 text-brand-pink" : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          Appointments
          {pendingCount > 0 && (
            <span className="ml-2 text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full font-bold">
              {pendingCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab("users")}
          className={`w-full text-left px-4 py-3 rounded-lg font-medium transition ${
            activeTab === "users" ? "bg-brand-50 text-brand-pink" : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          Users
        </button>

        <button
          onClick={() => setActiveTab("messages")}
          className={`w-full text-left px-4 py-3 rounded-lg font-medium transition ${
            activeTab === "messages" ? "bg-brand-50 text-brand-pink" : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          Contact Messages
        </button>
      </aside>

      {/* Main */}
      <main className="flex-1 p-10">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-serif text-gray-900 capitalize">{activeTab}</h1>
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
          </div>

          {activeTab === "services" && (
            <button
              onClick={openAdd}
              className="bg-brand-pink text-white px-6 py-2 rounded-lg font-bold hover:bg-brand-700 shadow-md"
            >
              + Add Service
            </button>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {loading && <div className="p-4 text-sm text-gray-500">Loading...</div>}

          {/* SERVICES */}
          {activeTab === "services" && (
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 font-semibold text-gray-700">Name</th>
                  <th className="px-6 py-4 font-semibold text-gray-700">Category</th>
                  <th className="px-6 py-4 font-semibold text-gray-700">Price</th>
                  <th className="px-6 py-4 font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {services.map((s: any) => (
                  <tr key={getId(s)} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">{s.name}</td>
                    <td className="px-6 py-4 text-brand-pink font-medium">{s.category}</td>
                    <td className="px-6 py-4 font-bold">₹{s.price}</td>
                    <td className="px-6 py-4 space-x-3">
                      <button onClick={() => openEdit(s)} className="text-blue-500 hover:underline">
                        Edit
                      </button>
                      <button onClick={() => deleteService(getId(s))} className="text-red-500 hover:underline">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}

                {services.length === 0 && !loading && (
                  <tr>
                    <td className="px-6 py-10 text-center text-gray-500" colSpan={4}>
                      No services yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}

          {/* APPOINTMENTS */}
          {activeTab === "appointments" && (
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 font-semibold text-gray-700">Client</th>
                  <th className="px-6 py-4 font-semibold text-gray-700">Service</th>
                  <th className="px-6 py-4 font-semibold text-gray-700">Time</th>
                  <th className="px-6 py-4 font-semibold text-gray-700">Status</th>
                  <th className="px-6 py-4 font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {appointments.map((a: any) => {
                  const id = getId(a);
                  const st = normalizeStatus(a.status);

                  return (
                    <tr key={id}>
                      <td className="px-6 py-4">{a.userName || a.user?.name || "Client"}</td>
                      <td className="px-6 py-4">{a.serviceName || a.service?.name || "Service"}</td>
                      <td className="px-6 py-4">
                        {a.date} at {a.time}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-bold ${
                            st === AppointmentStatus.PENDING
                              ? "bg-yellow-100 text-yellow-700"
                              : st === AppointmentStatus.CONFIRMED
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                          }`}
                        >
                          {statusLabel(st)}
                        </span>
                      </td>

                      <td className="px-6 py-4 space-x-2">
                        <button
                          disabled={st === AppointmentStatus.CONFIRMED}
                          onClick={() => updateStatus(id, AppointmentStatus.CONFIRMED)}
                          className="text-xs bg-green-500 text-white px-2 py-1 rounded disabled:opacity-50"
                        >
                          Confirm
                        </button>

                        <button
                          disabled={st === AppointmentStatus.CANCELLED}
                          onClick={() => updateStatus(id, AppointmentStatus.CANCELLED)}
                          className="text-xs bg-red-500 text-white px-2 py-1 rounded disabled:opacity-50"
                        >
                          Cancel
                        </button>
                      </td>
                    </tr>
                  );
                })}

                {appointments.length === 0 && !loading && (
                  <tr>
                    <td className="px-6 py-10 text-center text-gray-500" colSpan={5}>
                      No appointments yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}

          {/* USERS */}
          {activeTab === "users" && (
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 font-semibold text-gray-700">Name</th>
                  <th className="px-6 py-4 font-semibold text-gray-700">Email</th>
                  <th className="px-6 py-4 font-semibold text-gray-700">Role</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {users.map((u: any) => (
                  <tr key={getId(u)}>
                    <td className="px-6 py-4">{u.name}</td>
                    <td className="px-6 py-4">{u.email}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded text-xs font-bold ${
                          u.role === "ADMIN" ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {u.role}
                      </span>
                    </td>
                  </tr>
                ))}

                {users.length === 0 && !loading && (
                  <tr>
                    <td className="px-6 py-10 text-center text-gray-500" colSpan={3}>
                      No users yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}

          {/* MESSAGES */}
          {activeTab === "messages" && (
            <div className="p-6 space-y-4">
              {messages.length === 0 && !loading && <p className="text-gray-500 text-center">No messages yet.</p>}
              {messages.map((m: any) => (
                <div key={getId(m)} className="p-4 border border-gray-100 rounded-xl bg-gray-50">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-gray-900">
                      {m.name} <span className="text-gray-400 font-normal text-sm">({m.email})</span>
                    </h4>
                    <span className="text-xs text-gray-400">{new Date(m.createdAt).toLocaleDateString()}</span>
                  </div>
                  <p className="text-gray-600 text-sm">{m.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Modal */}
      {serviceModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-pink-100 overflow-hidden">
            <div className="p-6 flex items-center justify-between border-b">
              <h3 className="text-xl font-bold text-gray-900">
                {editing ? "Edit Service" : "Add New Service"}
              </h3>
              <button
                onClick={() => setServiceModalOpen(false)}
                className="text-gray-400 hover:text-gray-700"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-gray-600">Name</label>
                <input
                  value={String(serviceForm.name || "")}
                  onChange={(e) => setServiceForm((p) => ({ ...p, name: e.target.value }))}
                  className="w-full mt-1 p-3 rounded-xl border border-gray-200 focus:border-brand-pink outline-none"
                  placeholder="e.g. Hair Spa"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-600">Category</label>
                <input
                  value={String(serviceForm.category || "")}
                  onChange={(e) => setServiceForm((p) => ({ ...p, category: e.target.value }))}
                  className="w-full mt-1 p-3 rounded-xl border border-gray-200 focus:border-brand-pink outline-none"
                  placeholder="e.g. Hair / Makeup / Spa"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-600">Price (₹)</label>
                <input
                  type="number"
                  value={Number(serviceForm.price || 0)}
                  onChange={(e) => setServiceForm((p) => ({ ...p, price: Number(e.target.value) }))}
                  className="w-full mt-1 p-3 rounded-xl border border-gray-200 focus:border-brand-pink outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-600">Duration</label>
                <input
                  value={String(serviceForm.duration || "")}
                  onChange={(e) => setServiceForm((p) => ({ ...p, duration: e.target.value }))}
                  className="w-full mt-1 p-3 rounded-xl border border-gray-200 focus:border-brand-pink outline-none"
                  placeholder="e.g. 60 min"
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-xs font-bold text-gray-600">Image URL</label>
                <input
                  value={String(serviceForm.imageUrl || "")}
                  onChange={(e) => setServiceForm((p) => ({ ...p, imageUrl: e.target.value }))}
                  className="w-full mt-1 p-3 rounded-xl border border-gray-200 focus:border-brand-pink outline-none"
                  placeholder="https://..."
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-xs font-bold text-gray-600">Description</label>
                <textarea
                  value={String(serviceForm.description || "")}
                  onChange={(e) => setServiceForm((p) => ({ ...p, description: e.target.value }))}
                  className="w-full mt-1 p-3 rounded-xl border border-gray-200 focus:border-brand-pink outline-none"
                  rows={4}
                  placeholder="Short service description..."
                />
              </div>

              {error && <div className="md:col-span-2 text-sm text-red-600">{error}</div>}
            </div>

            <div className="p-6 border-t flex justify-end gap-3">
              <button
                onClick={() => setServiceModalOpen(false)}
                className="px-5 py-2 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                disabled={loading}
                onClick={saveService}
                className="px-5 py-2 rounded-xl bg-brand-pink text-white font-bold hover:bg-brand-700 disabled:opacity-60"
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
