// src/context/AuthContext.tsx
'use client';

import React, { useState, useEffect, createContext, useContext } from 'react';
import authService from '@/services/authService';
import { IUser } from '@/types';
import { useRouter } from '@/i18n/navigation';
import Cookies from 'js-cookie';

interface AuthContextType {
  isLoggedIn: boolean;
  isLoading: boolean;
  user: IUser | null;
  loginUser: (email, password) => Promise<void>;
  logoutUser: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<IUser | null>(null);
  const router = useRouter();

  useEffect(() => {
    const authenticateUser = async () => {
      const storedToken = Cookies.get('authToken');

      if (!storedToken) {
        setIsLoggedIn(false);
        setUser(null);
        setIsLoading(false);
        return;
      }

      try {
        const response = await authService.verify();
        // La respuesta exitosa de Axios tiene los datos en la propiedad `data`
        setUser(response.data.user);
        setIsLoggedIn(true);
      } catch (error) {
        // Si el token es inválido, el servicio dará error y entraremos aquí
        Cookies.remove('authToken');
        setIsLoggedIn(false);
        setUser(null);
        console.error('Error verificando el token:', error);
      } finally {
        // Este bloque se ejecuta siempre, garantizando que la carga termine
        setIsLoading(false);
      }
    };

    authenticateUser();
  }, []);

  const loginUser = async (email, password) => {
    const response = await authService.login({email, password});
    Cookies.set('authToken', response.data.token, { expires: 1/3, secure: process.env.NODE_ENV === 'production' });
    setUser(response.data.user);
    setIsLoggedIn(true);
    router.push('/dashboard');
  };

  const logoutUser = () => {
    Cookies.remove('authToken');
    setIsLoggedIn(false);
    setUser(null);
    router.push('/login');
  };

  const contextValue = { isLoggedIn, isLoading, user, loginUser, logoutUser };

  return (
    <AuthContext.Provider value={contextValue}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};
