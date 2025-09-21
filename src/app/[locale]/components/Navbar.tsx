import {Menu, LogIn} from 'lucide-react';
import LocaleSwitcher from './LocaleSwitcher';
import Image from 'next/image';
import {getTranslations} from 'next-intl/server';
// ¡Importante! Usamos el Link de nuestro archivo de navegación
import {Link} from '@/i18n/navigation';

const Navbar = async () => {

  const t = await getTranslations('Home'); // 'Navbar' es la clave principal en messages.json

  return (
    <nav className="bg-[#621333] text-white shadow-md sticky top-0 z-50">
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
                <Link href="/login" className="flex items-center gap-2 bg-white text-red-800 font-bold py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
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
  );
};

export default Navbar;