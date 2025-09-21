// src/app/[locale]/login/page.tsx
'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { LogIn } from 'lucide-react';
import { useAuth } from '@/context/AuthContext'; // 1. Importamos el hook de nuestro contexto

const LoginPage = () => {
  // 2. Usamos el contexto para obtener la función de login
  const { loginUser } = useAuth();
  // Hook para las traducciones de esta página
const t = useTranslations('LoginPage');
const tErrors = useTranslations('LoginPage.errorsLoginApi');

  // 3. El estado local ahora solo maneja la UI del formulario
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // 4. La función que maneja el envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // 5. Llamamos a la función de login del contexto
      await loginUser(email, password);
      // La redirección al dashboard la maneja el contexto automáticamente
      
    } catch (err: any) {
      const messageKey = err.response?.data?.messageKey || 'server_error';
      // 3. Usamos la clave para obtener el mensaje traducido
      setError(tErrors(messageKey)); 
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">{t('title')}</h1>
          <p className="text-gray-500">{t('subtitle')}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Campo de Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              {t('emailLabel')}
            </label>
            <input
              id="email"
              type="email"
              required
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
          </div>

          {/* Campo de Contraseña */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              {t('passwordLabel')}
            </label>
            <input
              id="password"
              type="password"
              required
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
          </div>

          {/* Mensaje de Error */}
          {error && (
            <div className="p-3 text-sm text-center text-red-700 bg-red-100 border border-red-200 rounded-md">
              {error}
            </div>
          )}

          {/* Botón de Enviar */}
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-800 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:bg-red-400 disabled:cursor-not-allowed transition-colors"
            >
              <LogIn className="w-5 h-5 mr-2" />
              {isLoading ? t('loading') : t('submitButton')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;