// src/app/[locale]/page.tsx
import './globals.css';
import {getTranslations} from 'next-intl/server';
import Image from 'next/image';

import image_tecnica47 from '@/public/images/tecnica47_img.png';




export default async function HomePage( {params}) {
 // 'Home' es la clave principal en messages.json
  const t = await getTranslations('Home');
  return (
    <div className="bg-white min-h-screen">

      {/* --- SECCIÓN HÉROE --- */}
      <main>
        <div 
          className="relative h-[50vh] flex items-center justify-center text-white bg-cover bg-center" // Asegúrate de tener esta imagen en /public
        >
          <Image
          src={image_tecnica47} // La ruta a tu imagen en la carpeta /public
          alt={t('hero.image')} // Texto alternativo traducido
          fill // Hace que la imagen llene el contenedor padre
          style={{objectFit: "cover"}} // Equivalente a `bg-cover` esto hace que la imagen se ajuste a la altura del contenedor
          quality={100} // Calidad de la imagen (opcional) esto hace que la calidad de la imagen sea 100%
          priority // Carga esta imagen primero, ya que es importante
          className="z-0" // La ponemos en la capa de fondo
        />
          {/* Capa oscura para legibilidad del texto */}
          <div className="absolute inset-0 bg-black/50 z-10"></div> 
          
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
          <h2 className="text-3xl font-bold text-gray-800">{t('systemName')}</h2> {/* Texto traducido */}
        </div>
      </main>

    </div>
  );
}