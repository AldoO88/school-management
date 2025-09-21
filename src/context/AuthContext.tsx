// src/context/AuthContext.tsx
'use client';

import React, { useState, useEffect, createContext, useContext } from 'react';
import authService from '@/services/authService';
import { IUser } from '@/types';
import { useRouter } from 'next/navigation';

// 1. Definimos la forma de nuestro contexto
interface AuthContextType {
  isLoggedIn: boolean;
  isLoading: boolean;
  user: IUser | null;
  storeToken: (token: string) => void;
  authenticateUser: () => Promise<void>;
  logoutUser: () => void;
  loginUser: (email, password) => Promise<IUser>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<IUser | null>(null);
   const router = useRouter();

  const storeToken = (token: string) => {
    localStorage.setItem('authToken', token);
  };

  const authenticateUser = async () => {
    const storedToken = localStorage.getItem('authToken');
    if (!storedToken) {
      setIsLoading(false);
      return;
    }
    try {
      const response = await authService.verify();
      setIsLoggedIn(true);
      setUser(response.data.user);
    } catch (error) {
      setIsLoggedIn(false);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const loginUser = async (email, password) => {
    try {
      const response = await authService.login({email, password});
      storeToken(response.data.token);
      await authenticateUser(); // Re-autentica para establecer el estado
      router.push('/dashboard');
      return response.data.user;
    } catch (error) {
      // Lanza el error para que el formulario de login pueda manejarlo
      throw error;
    }
  };

  const logoutUser = () => {
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
    setUser(null);
     router.push('/login');
  };

  useEffect(() => {
    authenticateUser();
  }, []);

  const contextValue = { isLoggedIn, isLoading, user, storeToken, authenticateUser, logoutUser, loginUser };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
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