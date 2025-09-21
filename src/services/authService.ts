// src/services/authService.ts
import api from './index';
import { IUser, LoginCredentials } from '@/types';

// Objeto que agrupa los endpoints de autenticación
const authService = {
  // Nota: El backend devolverá el token Y el usuario al hacer login
  login: ({email, password}: LoginCredentials) => 
    api.post<{ token: string; user: IUser }>('/auth/login', { email, password }),

  // El token se adjuntará automáticamente gracias al interceptor
  verify: () => 
    api.get<{ user: IUser }>('/auth/verify'),
};

export default authService;