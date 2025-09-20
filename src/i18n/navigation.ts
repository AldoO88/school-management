// src/navigation.ts
import { createNavigation } from 'next-intl/navigation';

// 1. Define tus idiomas
export const locales = ['es', 'en'] as const;

// 2. Define un prefijo de idioma por defecto (opcional)
export const localePrefix = 'always'; // O 'as-needed'

// 3. Define la traducción de tus rutas (opcional, pero buena práctica)
// Por ahora lo dejaremos simple
export const pathnames = {
  '/': '/',
  // Ejemplo de cómo traducirías rutas en el futuro:
  // '/about': {
  //   en: '/about',
  //   es: '/sobre-nosotros'
  // }
};

// 4. Llama a la función de `next-intl` para crear tus herramientas de navegación
export const { Link, redirect, usePathname, useRouter } =
  createNavigation({
    locales,
    localePrefix,
    pathnames,
  });