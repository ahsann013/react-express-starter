import Helpers from "@/config/helpers";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// Define Base API URL
const BASE_URL = Helpers.apiUrl || "https://api.example.com";
const navigate = useNavigate();
// Create an Axios instance
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Send cookies if needed
});

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    // Get token from Zustand store or localStorage
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error("Unauthorized! Redirecting to login...");
      localStorage.removeItem("token"); // Clear token if expired
      navigate("/login");
    }
    return Promise.reject(error);
  }
);

export default api;
