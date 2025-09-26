// src/hooks/useStudentForm.ts
'use client';
import { useState } from 'react';
import studentService from '@/services/studentService';
// 1. Importamos los tipos que definen los datos del formulario
import { NewStudentPayload, StudentFormData, TutorFormData } from '@/types';

// El hook recibe una función "onSuccess" para ejecutar cuando el alumno se cree correctamente
export function useStudentForm(onSuccess: () => void) {
  // 2. Usamos los tipos para darle forma al estado inicial del formulario
  const [tutorData, setTutorData] = useState<TutorFormData>({ fullName: '', phone: '', email: '' });
  const [studentData, setStudentData] = useState<StudentFormData>({
    name: '',
    lastName: '',
    secondLastName: '',
    birthDate: new Date(),
    CURP: '',
    noControl: '',
    grade: 1,
    group: 'A',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // 3. El payload que enviamos a la API también está tipado
    const payload: NewStudentPayload = { tutorData, studentData };

    try {
      await studentService.createStudent(payload);
      onSuccess(); // Si todo sale bien, llamamos a la función de éxito
    } catch (err: any) {
      setError(err.response?.data?.message || 'Ocurrió un error al crear el alumno.');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    tutorData,
    setTutorData,
    studentData,
    setStudentData,
    isLoading,
    error,
    handleSubmit,
  };
}