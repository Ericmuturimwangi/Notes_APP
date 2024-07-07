import axios from "axios";
import { ACCESS_TOKEN } from "./constants";

// Create an instance of Axios with baseURL from Vite environment variable
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Intercept requests to include JWT token if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
