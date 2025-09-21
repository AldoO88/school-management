// src/app/[locale]/components/Footer.tsx
import {getTranslations} from 'next-intl/server';
// ¡Importante! Usamos el Link de nuestro archivo de navegación
import {Link} from '@/i18n/navigation';

export const Footer = async() => {
  const t = await getTranslations('Home'); // Podemos reusar las traducciones

  return (
    <footer className="bg-[#621333] text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="font-bold text-lg">{t('brandName')}</p>
        <p className="mt-2 text-sm text-red-200">
          © {new Date().getFullYear()} Todos los derechos reservados.
        </p>
        <div className="mt-4 flex justify-center space-x-6">
        </div>
      </div>
    </footer>
  );
}