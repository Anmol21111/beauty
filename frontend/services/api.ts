import {
  Appointment,
  AppointmentStatus,
  Message,
  Service,
  User
} from "../types";

const RAW_BASE = String((import.meta as any).env?.VITE_API_URL || "http://localhost:5000")
  .replace(/\/$/, "");
export const API_BASE = RAW_BASE.endsWith("/api") ? RAW_BASE : `${RAW_BASE}/api`;

const STORAGE_KEY = "beauty_auth";

export function getAuth() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setAuth(auth: any | null) {
  if (auth) localStorage.setItem(STORAGE_KEY, JSON.stringify(auth));
  else localStorage.removeItem(STORAGE_KEY);
}

function token() {
  return getAuth()?.token || "";
}

async function request<T>(path: string, opts: RequestInit = {}, auth = false): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(opts.headers as any)
  };
  if (auth) {
    const t = token();
    if (t) headers.Authorization = `Bearer ${t}`;
  }

  const res = await fetch(`${API_BASE}${path}`, {
    ...opts,
    headers
  });
  const isJson = (res.headers.get("content-type") || "").includes("application/json");
  const data = isJson ? await res.json() : null;
  if (!res.ok) {
    throw new Error(data?.message || `Request failed (${res.status})`);
  }
  return data as T;
}

export const api = {
  // Auth
  login: (email: string, password: string) =>
    request<{ user: User; token: string }>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password })
    }),
  register: (payload: { name: string; email: string; phone?: string; password: string }) =>
    request<{ user: User; token: string }>("/auth/register", {
      method: "POST",
      body: JSON.stringify(payload)
    }),
  me: () => request<{ user: User }>("/auth/me", {}, true),

  // Services
  getServices: () => request<Service[]>("/services"),
  addService: (payload: Partial<Service>) =>
    request<Service>("/services", {
      method: "POST",
      body: JSON.stringify(payload)
    }, true),
  updateService: (id: string, payload: Partial<Service>) =>
    request<Service>(`/services/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload)
    }, true),
  deleteService: (id: string) => request<{ ok: boolean }>(`/services/${id}`, { method: "DELETE" }, true),

  // Appointments
  bookAppointment: (payload: { serviceId: string; date: string; time: string; notes?: string }) =>
    request<Appointment>("/appointments", {
      method: "POST",
      body: JSON.stringify(payload)
    }, true),
  getMyAppointments: () => request<Appointment[]>("/appointments/mine", {}, true),
  getAllAppointments: () => request<Appointment[]>("/appointments", {}, true),
  updateAppointmentStatus: (id: string, status: AppointmentStatus) =>
    request<Appointment>(`/appointments/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status })
    }, true),

  // Messages
  sendMessage: (payload: { name: string; email: string; phone?: string; message: string }) =>
    request<Message>("/messages", {
      method: "POST",
      body: JSON.stringify(payload)
    }),
  getMessages: () => request<Message[]>("/messages", {}, true),

  // Users (admin)
  getUsers: () => request<User[]>("/users", {}, true)
};
