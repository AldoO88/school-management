// src/hooks/useStudents.ts
'use client';
import { useState, useEffect, useCallback } from 'react';
import studentService from '@/services/studentService';
import { IStudent } from '@/types'; // <-- 1. Importamos la interfaz correcta

export function useStudents() {
  // 2. Usamos IStudent para tipar nuestro estado. Ahora es un array de Alumnos.
  const [students, setStudents] = useState<IStudent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 3. `fetchStudents` ahora usa la función `getAll` del servicio.
  // `useCallback` optimiza la función para que no se cree en cada render.
  const fetchStudents = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await studentService.getAllStudents();
      setStudents(response.data.data);
    } catch (err) {
      setError('No se pudieron cargar los alumnos.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 4. `useEffect` llama a `fetchStudents` la primera vez que el componente se monta.
  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  const deleteStudent = async (id: string) => {
    try {
      await studentService.deleteStudent(id);
      // Después de borrar, volvemos a llamar a fetchStudents para refrescar la lista.
      fetchStudents();
    } catch (err) {
      setError('No se pudo eliminar al alumno.');
      console.error(err);
    }
  };

  // 5. Exportamos `fetchStudents` para poder usarla desde la página.
  return { students, isLoading, error, fetchStudents, deleteStudent };
}