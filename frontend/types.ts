
export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER'
}

export enum AppointmentStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  avatar?: string;
}

export interface Service {
  id: string;
  name: string;
  category: string;
  price: number;
  duration: string;
  imageUrl: string;
  description: string;
}

export interface Appointment {
  id: string;
  userId: string;
  userName: string;
  userEmail?: string;
  serviceId: string;
  serviceName: string;
  date: string;
  time: string;
  status: AppointmentStatus;
  notes?: string;
  createdAt?: string;
}

export interface Message {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  createdAt: string;
}
