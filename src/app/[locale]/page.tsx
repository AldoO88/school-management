// src/app/[locale]/page.tsx
import './globals.css';
import {getTranslations} from 'next-intl/server';
import Image from 'next/image';
import {Menu, LogIn} from 'lucide-react';
import LocaleSwitcher from './components/LocaleSwitcher';

// ¡Importante! Usamos el Link de nuestro archivo de navegación
import {Link} from '@/i18n/navigation';
 

export default async function HomePage( {params}) {
 // 'Home' es la clave principal en messages.json
  const t = await getTranslations('Home');
4
  return (
    <div className="bg-white min-h-screen">
      {/* --- BARRA DE NAVEGACIÓN (Navbar Guinda) --- */}
      <nav className="bg-red-800 text-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo y Nombre de la Escuela */}
            <div className="flex-shrink-0 flex items-center gap-2">
              <Image 
                src="/logo-escuela.png" // Asegúrate de tener este logo en tu carpeta /public
                alt="School Logo"
                width={40}
                height={40}
              />
              <span className="font-bold text-xl">{t('brandName')}</span> {/* Texto traducido */}
            </div>

            {/* Enlaces de Navegación (para pantallas grandes) */}
            <div className="hidden md:flex md:items-center md:space-x-8">
              <Link href="/oferta-educativa" className="text-white hover:text-red-200 font-medium transition-colors">
                {t('nav.educationalOffer')} {/* Texto traducido */}
              </Link>
              <Link href="/galeria" className="text-white hover:text-red-200 font-medium transition-colors">
                {t('nav.gallery')} {/* Texto traducido */}
              </Link>
              <Link href="/contacto" className="text-white hover:text-red-200 font-medium transition-colors">
                {t('nav.contact')} {/* Texto traducido */}
              </Link>
            </div>

            {/* Botón de Idioma y Botón de Iniciar Sesión */}
            <div className="flex items-center gap-4">
              <LocaleSwitcher /> {/* Componente de cambio de idioma */}
              <div className="hidden md:block">
                <Link href="/login" className="flex items-center gap-2 bg-white text-red-800 font-bold py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors">
                  <LogIn size={18} />
                  <span>{t('nav.login')}</span> {/* Texto traducido */}
                </Link>
              </div>
            </div>

            {/* Botón de Menú (para móviles) */}
            <div className="md:hidden">
              <button className="text-white hover:text-red-200">
                <Menu size={24} />
              </button>
            </div>
            
          </div>
        </div>
      </nav>

      {/* --- SECCIÓN HÉROE --- */}
      <main>
        <div 
          className="relative h-[60vh] flex items-center justify-center text-white bg-cover bg-center"
          style={{ backgroundImage: "url('/foto-escuela.jpg')" }} // Asegúrate de tener esta imagen en /public
        >
          {/* Capa oscura para legibilidad del texto */}
          <div className="absolute inset-0 bg-black opacity-50"></div>
          
          <div className="relative z-10 text-center px-4">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
              {t('hero.title')} {/* Texto traducido */}
            </h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto">
              {t('hero.subtitle')} {/* Texto traducido */}
            </p>
          </div>
        </div>

        {/* --- PRÓXIMAMENTE MÁS CONTENIDO --- */}
        <div className="py-16 px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800">{t('comingSoon')}</h2> {/* Texto traducido */}
        </div>
      </main>

    </div>
  );
}