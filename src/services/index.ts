// src/services/index.ts
import axios from 'axios';
import Cookies from 'js-cookie'; // <-- 1. Importa la librería de cookies

const api = axios.create({
  baseURL: '/api',
});

// Interceptor de Peticiones
api.interceptors.request.use((config) => {
  // 2. Lee el token desde Cookies, no desde localStorage
  const storedToken = Cookies.get('authToken');
  
  if (storedToken) {
    config.headers.Authorization = `Bearer ${storedToken}`;
  }
  return config;
});

export default api;