import axios, { AxiosResponse } from "axios";

// Base URL of your backend
const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Add JWT token automatically if exists
API.interceptors.request.use((req) => {
  const isAuthEndpoint = req.url?.startsWith("/auth/") ?? false;
  if (!isAuthEndpoint) {
    const token = localStorage.getItem("token");
    if (token && req.headers) {
      req.headers["Authorization"] = `Bearer ${token}`;
    }
  }
  return req;
});

// --- Types ---

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  role: "user" | "admin";
}

export interface Car {
  _id: string;
  name: string;
  description: string;
  price: number;
  gearbox?: string;
  doors?: number;
  fullOptions?: boolean;
  inStock?: boolean;
  condition?: "New" | "Old";
  type?: "SUV" | "Sport" | "Sedan" | "Economic" | "Luxury" | "Electric";
  fuel?: "Diesel" | "Petrol" | "Electric";
  year?: number;
  images: string[];
  createdBy?: string;
}

export interface Order {
  _id: string;
  car: Car;
  user?: User;
  buyerInfo?: {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
  };
  totalPrice: number;
  status:
    | "pending"
    | "confirmed"
    | "processing"
    | "shipped"
    | "delivered"
    | "cancelled";
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Notification {
  _id: string;
  user?: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error" | "order" | "car";
  read: boolean;
  data?: any;
  actionUrl?: string;
  createdAt: string;
  updatedAt: string;
}

// --- Auth ---
export const registerUser = (data: {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
}): Promise<AxiosResponse<{ message: string }>> =>
  API.post("/auth/register", data);

export const loginUser = (data: {
  email: string;
  password: string;
}): Promise<AxiosResponse<{ token: string; user: User }>> =>
  API.post("/auth/login", data);

// --- Forgot Password ---
export const forgotPassword = (data: {
  email: string;
}): Promise<AxiosResponse<{ message: string }>> =>
  API.post("/auth/forgot-password", data);

// --- Cars ---
export const getCars = (): Promise<AxiosResponse<Car[]>> => API.get("/cars");

export const addCar = (data: FormData): Promise<AxiosResponse<Car>> =>
  API.post("/cars", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const updateCar = (
  id: string,
  data: FormData
): Promise<AxiosResponse<Car>> =>
  API.put(`/cars/${id}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const deleteCar = (
  id: string
): Promise<AxiosResponse<{ message: string }>> => API.delete(`/cars/${id}`);

// --- Orders ---
export const createOrder = (data: {
  carId: string;
  buyerInfo?: {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
  };
}): Promise<AxiosResponse<Order>> => API.post("/orders", data);

export const getOrders = (): Promise<AxiosResponse<Order[]>> =>
  API.get("/orders"); // admin only

export const getMyOrders = (): Promise<AxiosResponse<Order[]>> =>
  API.get("/orders/my-orders");

export const getOrder = (id: string): Promise<AxiosResponse<Order>> =>
  API.get(`/orders/${id}`);

export const updateOrderStatus = (
  id: string,
  status: string
): Promise<AxiosResponse<Order>> => API.put(`/orders/${id}/status`, { status });

export const deleteOrder = (
  id: string
): Promise<AxiosResponse<{ message: string }>> => API.delete(`/orders/${id}`);

// --- Cars ---
export const searchCars = (params: {
  type?: string;
  fuel?: string;
  condition?: string;
  minPrice?: number;
  maxPrice?: number;
  year?: number;
  inStock?: boolean;
  search?: string;
}): Promise<AxiosResponse<Car[]>> => API.get("/cars/search", { params });

// --- Notifications ---
export const getNotifications = (): Promise<AxiosResponse<Notification[]>> =>
  API.get("/notifications");

export const markNotificationRead = (
  id: string
): Promise<AxiosResponse<Notification>> => API.put(`/notifications/${id}/read`);

export const markAllNotificationsRead = (): Promise<
  AxiosResponse<{ message: string }>
> => API.put("/notifications/read-all");

export const getUnreadCount = (): Promise<AxiosResponse<{ count: number }>> =>
  API.get("/notifications/unread-count");

export const createNotification = (data: {
  title: string;
  message: string;
  type?: string;
  userId?: string;
  actionUrl?: string;
  data?: any;
}): Promise<AxiosResponse<Notification>> => API.post("/notifications", data);

export const deleteNotification = (
  id: string
): Promise<AxiosResponse<{ message: string }>> =>
  API.delete(`/notifications/${id}`);
