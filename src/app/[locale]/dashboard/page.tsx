// src/app/[locale]/dashboard/page.tsx
'use client';
import { useAuth } from '@/context/AuthContext';
import { useTranslations } from 'next-intl';
import { UsersRound, UserPlus, Search, LogOut } from 'lucide-react';

export default function DashboardHomePage() {
  const { user } = useAuth();
  const t = useTranslations('Dashboard');

  return (
    <div>
      {/* --- SECCIÓN DE BIENVENIDA Y LOGOUT --- */}
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">{t('welcome', { name: user?.fullName })}</h1>
          <p className="text-gray-500">{t('role', { role: user?.role })}</p>
        </div>
        
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4">
            <div className="bg-red-100 p-3 rounded-full">
              <UsersRound className="h-6 w-6 text-red-800" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">{t('totalStudents')}</p>
              <p className="text-2xl font-bold text-gray-800">432</p>
            </div>
          </div>
          {/* ... más tarjetas ... */}
        </div>
      
      {/* ... El resto de tu dashboard con tarjetas y acciones ... */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-gray-800 mb-4">{t('quickActions')}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <button className="flex flex-col items-center justify-center p-4 bg-[#621333] text-white rounded-lg hover:bg-red-700 transition-colors">
            <UserPlus className="h-8 w-8 mb-2" />
            <span className="font-semibold text-sm">{t('registerStudent')}</span>
          </button>
          <button className="flex flex-col items-center justify-center p-4 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
            <Search className="h-8 w-8 mb-2" />
            <span className="font-semibold text-sm">{t('searchStudent')}</span>
          </button>
        </div>
      </div>
    </div>
  );
}