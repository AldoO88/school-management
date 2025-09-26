// src/app/[locale]/dashboard/students/components/StudentForm.tsx
'use client';
import { useTranslations } from 'next-intl';
import { StudentFormData, TutorFormData } from '@/types';
import { UserPlus, X } from 'lucide-react';

// Definimos los tipos de las props que el componente espera recibir
interface StudentFormProps {
  tutorData: TutorFormData;
  setTutorData: React.Dispatch<React.SetStateAction<TutorFormData>>;
  studentData: StudentFormData;
  setStudentData: React.Dispatch<React.SetStateAction<StudentFormData>>;
  isLoading: boolean;
  error: string | null;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

export default function StudentForm({
  tutorData, setTutorData, studentData, setStudentData,
  isLoading, error, onSubmit, onCancel
}: StudentFormProps) {
  const t = useTranslations('Dashboard.students.form');

  const handleTutorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTutorData({ ...tutorData, [e.target.name]: e.target.value });
  };

  const handleStudentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setStudentData({ ...studentData, [e.target.name]: e.target.valueAsNumber || e.target.value });
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800">{t('title')}</h2>
          <button onClick={onCancel} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>
        
        <form onSubmit={onSubmit} className="overflow-y-auto">
          <div className="p-6 space-y-6">
            {/* --- SECCIÓN DEL TUTOR --- */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-4">{t('tutorSection')}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input required name="fullName" value={tutorData.fullName} onChange={handleTutorChange} placeholder={t('tutorName')} className="p-2 border rounded" />
                <input required name="phone" value={tutorData.phone} onChange={handleTutorChange} placeholder={t('tutorPhone')} className="p-2 border rounded" />
                <input type="email" name="email" value={tutorData.email} onChange={handleTutorChange} placeholder={t('tutorEmail')} className="p-2 border rounded md:col-span-2" />
              </div>
            </div>

            {/* --- SECCIÓN DEL ALUMNO --- */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-4">{t('studentSection')}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input required name="name" value={studentData.name} onChange={handleStudentChange} placeholder={t('firstName')} className="p-2 border rounded" />
                <input required name="lastName" value={studentData.lastName} onChange={handleStudentChange} placeholder={t('paternalLastName')} className="p-2 border rounded" />
                <input name="secondLastName" value={studentData.secondLastName} onChange={handleStudentChange} placeholder={t('maternalLastName')} className="p-2 border rounded" />
                <input required name="CURP" value={studentData.CURP} onChange={handleStudentChange} placeholder={t('CURP')} className="p-2 border rounded" />
                <input required name="noControl" value={studentData.noControl} onChange={handleStudentChange} placeholder={t('noControl')} className="p-2 border rounded" />
                <select name="grade" value={studentData.grade} onChange={handleStudentChange} className="p-2 border rounded bg-white">
                  <option value={1}>{t('grade1')}</option>
                  <option value={2}>{t('grade2')}</option>
                  <option value={3}>{t('grade3')}</option>
                </select>
                <input required name="group" value={studentData.group} onChange={handleStudentChange} placeholder={t('group')} className="p-2 border rounded" />
              </div>
            </div>
            
            {error && <p className="text-red-600 text-center bg-red-100 p-2 rounded">{error}</p>}
          </div>

          <div className="bg-gray-50 px-6 py-4 flex justify-end gap-4 border-t">
            <button type="button" onClick={onCancel} className="py-2 px-4 rounded-lg bg-gray-200 hover:bg-gray-300">
              {t('cancelButton')}
            </button>
            <button type="submit" disabled={isLoading} className="flex items-center gap-2 py-2 px-4 rounded-lg bg-red-800 text-white hover:bg-red-700 disabled:bg-red-400">
              <UserPlus size={18} />
              {isLoading ? t('saving') : t('saveButton')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}