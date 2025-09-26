'use client';
import { useState } from 'react';
import { Menu, X, LogIn, LogOut } from 'lucide-react';
import LocaleSwitcher from './LocaleSwitcher';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { useAuth } from '@/context/AuthContext';

import logo_escuela from '@/public/images/logo_escuela1.jpeg';

export default function Navbar() {
  const t = useTranslations('Home');
  const { isLoggedIn, isLoading, logoutUser } = useAuth();
  
  // 1. Estado para controlar si el menú móvil está abierto o cerrado
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-[#621333] text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          
          {/* Logo y Nombre */}
          <div className="flex-shrink-0 flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <Image 
                src={logo_escuela}
                alt="School Logo"
                width={80}
                height={80}
              />
              <span className="font-bold text-xl">{t('brandName')}</span>
            </Link>
          </div>

          {/* Enlaces de Navegación (Escritorio) */}
          {!isLoading && !isLoggedIn && (
            <div className="hidden md:flex md:items-center md:space-x-8">
              <Link href="/oferta-educativa" className="hover:text-red-200 font-medium">{t('nav.educationalOffer')}</Link>
              <Link href="/galeria" className="hover:text-red-200 font-medium">{t('nav.gallery')}</Link>
              <Link href="/contacto" className="hover:text-red-200 font-medium">{t('nav.contact')}</Link>
            </div>
          )}

          {/* Botones de la derecha (Escritorio) */}
          <div className="hidden md:flex items-center gap-4">
            <LocaleSwitcher />
            {isLoading ? (
              <div className="w-32 h-9 bg-red-700 animate-pulse rounded-lg"></div>
            ) : isLoggedIn ? (
              <button onClick={logoutUser} className="flex items-center gap-2 bg-white text-red-800 font-bold py-2 px-4 rounded-lg hover:bg-gray-100">
                <LogOut size={18} />
                <span>{t('nav.logout')}</span>
              </button>
            ) : (
              <Link href="/login" className="flex items-center gap-2 bg-white text-red-800 font-bold py-2 px-4 rounded-lg hover:bg-gray-100">
                <LogIn size={18} />
                <span>{t('nav.login')}</span>
              </Link>
            )}
          </div>

          {/* Botón de Menú (Móvil) */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white hover:text-red-200">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
          
        </div>
      </div>

      {/* --- MENÚ DESPLEGABLE (MÓVIL) --- */}
      {isMenuOpen && (
        <div className="md:hidden bg-red-800 border-t border-red-700">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col items-center">
            
            {!isLoading && !isLoggedIn && (
              <>
                <Link href="/oferta-educativa" className="w-full text-center block px-3 py-2 rounded-md hover:bg-red-700">{t('nav.educationalOffer')}</Link>
                <Link href="/galeria" className="w-full text-center block px-3 py-2 rounded-md hover:bg-red-700">{t('nav.gallery')}</Link>
                <Link href="/contacto" className="w-full text-center block px-3 py-2 rounded-md hover:bg-red-700">{t('nav.contact')}</Link>
              </>
            )}
            
            <div className="pt-4 pb-2 w-full flex flex-col items-center gap-4">
              <LocaleSwitcher />
              {isLoading ? (
                <div className="w-32 h-9 bg-red-700 animate-pulse rounded-lg"></div>
              ) : isLoggedIn ? (
                <button onClick={logoutUser} className="w-full flex items-center justify-center gap-2 bg-white text-red-800 font-bold py-2 px-4 rounded-lg hover:bg-gray-100">
                  <LogOut size={18} />
                  <span>{t('nav.logout')}</span>
                </button>
              ) : (
                <Link href="/login" className="w-full flex items-center justify-center gap-2 bg-white text-red-800 font-bold py-2 px-4 rounded-lg hover:bg-gray-100">
                  <LogIn size={18} />
                  <span>{t('nav.login')}</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};