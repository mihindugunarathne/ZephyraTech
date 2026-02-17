import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5000",
});

// Automatically attach JWT token to every request (if exists)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
