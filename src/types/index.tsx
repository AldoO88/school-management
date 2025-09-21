// src/types/index.ts

// Esta interfaz define las propiedades que tendrá un objeto de usuario en el frontend.
export interface IUser {
  _id: string;
  fullName: string;
  email: string;
  role: 'DOCENTE' | 'ADMIN' | 'PREFECTO' | 'TRABAJO_SOCIAL' | 'DIRECTOR' | 'SUPER_ADMIN';
  createdAt: string;
  updatedAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}