// src/app/[locale]/dashboard/page.tsx
'use client';

import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Home, UsersRound, UserPlus, FileText, Search, LogOut } from 'lucide-react';

export default function DashboardPage() {
  // 1. Usamos el contexto para obtener el estado de autenticación y los datos del usuario
  const { user, isLoggedIn, isLoading, logoutUser } = useAuth();
  const router = useRouter();
  const t = useTranslations('Dashboard');

  // 2. Efecto para proteger la ruta
  // Se ejecuta cada vez que el estado de carga o de login cambia.
  useEffect(() => {
    // Si la carga inicial terminó y el usuario NO está logueado...
    if (!isLoading && !isLoggedIn) {
      // ...lo redirigimos a la página de login.
      router.push('/login');
    }
  }, [isLoading, isLoggedIn, router]);

  // 3. Muestra un estado de carga mientras se verifica la sesión
  // Esto evita un parpadeo donde se muestra contenido protegido a un usuario no logueado.
  if (isLoading || !isLoggedIn) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>{t('loading')}</p>
      </div>
    );
  }

  // 4. Si el usuario está verificado, muestra el contenido del Dashboard
  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* --- SECCIÓN DE BIENVENIDA Y LOGOUT --- */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{t('welcome', { name: user?.fullName })}</h1>
            <p className="text-gray-500">{t('role', { role: user?.role })}</p>
          </div>
          <button 
            onClick={logoutUser}
            className="flex items-center gap-2 bg-red-800 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
          >
            <LogOut size={18} />
            <span>{t('logoutButton')}</span>
          </button>
        </div>

        {/* --- TARJETAS DE ESTADÍSTICAS RÁPIDAS (ejemplo) --- */}
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

        {/* --- SECCIÓN DE ACCIONES RÁPIDAS --- */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-800 mb-4">{t('quickActions')}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <button className="flex flex-col items-center justify-center p-4 bg-red-800 text-white rounded-lg hover:bg-red-700 transition-colors">
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
    </div>
  );
}