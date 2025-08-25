import axios, { AxiosResponse } from "axios";

// Base URL of your backend
const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Add JWT token automatically if exists

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token"); // ✅ your token exists
  if (token && req.headers) {
    req.headers["Authorization"] = `Bearer ${token}`; // must use brackets syntax
  }
  return req;
});

// --- Types ---

export interface User {
  id: string;
  email: string;
  role: "user" | "admin";
}

export interface Car {
  _id: string;
  name: string;
  description: string;
  price: number;
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
}): Promise<AxiosResponse<{ message: string }>> => API.post("/auth/register", data);

export const loginUser = (data: { email: string; password: string }): Promise<AxiosResponse<{ token: string; user: User }>> =>
  API.post("/auth/login", data);

// --- Forgot Password ---
export const forgotPassword = (data: { email: string }): Promise<AxiosResponse<{ message: string }>> =>
  API.post("/auth/forgot-password", data);

// --- Cars ---
export const getCars = (): Promise<AxiosResponse<Car[]>> => API.get("/cars");

export const addCar = (data: FormData): Promise<AxiosResponse<Car>> => API.post("/cars", data);

export const updateCar = (id: string, data: FormData): Promise<AxiosResponse<Car>> => API.put(`/cars/${id}`, data);

export const deleteCar = (id: string): Promise<AxiosResponse<{ message: string }>> => API.delete(`/cars/${id}`);

// --- Orders ---
export const createOrder = (data: { carId: string; buyerInfo?: { firstName: string; lastName: string; phone: string; email: string } }): Promise<AxiosResponse<Order>> =>
  API.post("/orders", data);

export const getOrders = (): Promise<AxiosResponse<Order[]>> => API.get("/orders"); // admin only
