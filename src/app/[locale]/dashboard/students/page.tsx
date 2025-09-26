// src/app/[locale]/dashboard/students/page.tsx
'use client';
import { useState } from 'react';
import { useStudents } from '@/hooks/useStudents';
import { useStudentForm } from '@/hooks/useStudentForm';
import StudentForm from '@/app/[locale]/components/StudentForm';
import { useTranslations } from 'next-intl';
import { UserPlus, Edit, Trash2 } from 'lucide-react';
import { IStudent } from '@/types';

export default function StudentsPage() {
  const { students, isLoading, error, fetchStudents, deleteStudent } = useStudents();
  const t = useTranslations('Dashboard.students');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFormSuccess = () => {
    setIsModalOpen(false); // Cierra el modal
    fetchStudents();      // Refresca la lista de alumnos
  };
  
  const form = useStudentForm(handleFormSuccess);

  const handleDelete = (id: string) => {
    if (window.confirm(t('deleteConfirm'))) {
      deleteStudent(id);
    }
  };


  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">{t('title')}</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-red-800 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
        >
          <UserPlus size={18} />
          <span>{t('addButton')}</span>
        </button>
      </div>

      {isLoading && <p>{t('loading')}</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!isLoading && !error && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <table className="w-full text-left">
            <thead className="border-b">
              <tr>
                <th className="p-3">{t('table.name')}</th>
                <th className="p-3">{t('table.grade')}</th>
                <th className="p-3">{t('table.tutor')}</th>
                <th className="p-3">{t('table.status')}</th>
                <th className="p-3">{t('table.actions')}</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student: IStudent) => (
                <tr key={student._id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{`${student.name} ${student.lastName} ${student.secondLastName}`}</td>
                  <td className="p-3">{`${student.grade}° ${student.group}`}</td>
                  {/* Accedemos a la propiedad `fullName` del tutor con seguridad */}
                  <td className="p-3">{student.tutorId?.fullName || 'N/A'}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${student.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      {student.status}
                    </span>
                  </td>
                  <td className="p-3 flex gap-2">
                    <button className="text-blue-600 hover:text-blue-800"><Edit size={18} /></button>
                    <button onClick={() => handleDelete(student._id)} className="text-red-600 hover:text-red-800"><Trash2 size={18} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {isModalOpen && (
        <StudentForm
          tutorData={form.tutorData}
          setTutorData={form.setTutorData}
          studentData={form.studentData}
          setStudentData={form.setStudentData}
          isLoading={form.isLoading}
          error={form.error}
          onSubmit={form.handleSubmit}
          onCancel={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}