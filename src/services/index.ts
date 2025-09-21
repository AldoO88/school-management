// src/services/index.ts
import axios from 'axios';

// Para una aplicación full-stack de Next.js, la URL base de la API
// es simplemente '/api', ya que vive en el mismo dominio.
const baseURL = '/api';

// Creamos la instancia de axios con la URL base de nuestra API
const api = axios.create({
  baseURL: baseURL,
});

// Interceptor de Peticiones (Request Interceptor)
// Esto se ejecuta ANTES de que cada petición sea enviada desde nuestra app.
api.interceptors.request.use((config) => {
  // 1. Buscamos el token guardado en localStorage.
  const storedToken = localStorage.getItem('authToken');

  // 2. Si el token existe, lo añadimos a las cabeceras (headers) de la petición.
  // Esto asegura que todas las peticiones a rutas protegidas vayan autenticadas.
  if (storedToken) {
    config.headers.Authorization = `Bearer ${storedToken}`;
  }

  return config;
});

export default api;