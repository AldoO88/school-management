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

// --- Nuevas Interfaces para Tutores y Alumnos ---

// Representa el objeto completo de un Tutor como viene de la BD
export interface ITutor {
  _id: string;
  fullName: string;
  phone: string;
  email?: string;
  // ... cualquier otro campo que agregues al modelo Tutor
}

// Representa el objeto completo de un Alumno como viene de la BD
export interface IStudent {
  _id: string;
  name: string;
  lastName: string;
  secondLastName?: string;
  birthDate?: Date;
  CURP: string;
  noControl: string;
  grade: number;
  group: string;
  status: 'ACTIVE' | 'INACTIVE' | 'GRADUATED' | 'WITHDRAWN';
  tutorId: ITutor; // Al popular, esperamos el objeto completo del Tutor
  createdAt: string;
  updatedAt: string;
}

// --- Interfaces para los Formularios ---

// Define SÓLO los campos necesarios para crear/buscar un Tutor
export interface TutorFormData {
  fullName: string;
  phone: string;
  email?: string;
}

// Define SÓLO los campos necesarios para el formulario de creación de un Alumno
export interface StudentFormData {
  name: string;
  lastName: string;
  secondLastName?: string;
  phone: string;
  //birthDate?: Date;
  CURP: string;
  noControl: string;
  grade: number;
  group: string;
}

// Define la estructura completa que se envía a la API para crear un nuevo alumno
export interface NewStudentPayload {
  tutorData: TutorFormData;
  studentData: StudentFormData;
}