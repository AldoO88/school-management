// src/services/studentService.ts
import api from './index';
import { IStudent, NewStudentPayload } from '@/types';

const studentService = {
  // --- READ ---
  // El tipo de retorno ya estaba bien definido aquí.
  getAllStudents: () => api.get<{ success: boolean; data: IStudent[] }>('/students'),

  // --- CREATE ---
  // Le decimos que el parámetro 'payload' debe cumplir con la interfaz NewStudentPayload.
  createStudent: (payload: NewStudentPayload) => api.post('/students', payload),

  // --- UPDATE ---
  // El `id` es un string y `data` es un objeto que puede contener cualquier
  // propiedad de IStudent, por eso usamos `Partial<IStudent>`.
  updateStudent: (id: string, data: Partial<IStudent>) => api.put(`/students/${id}`, data),

  // --- DELETE ---
  // El `id` que recibe la función debe ser un string.
  deleteStudent: (id: string) => api.delete(`/students/${id}`),
};

export default studentService;