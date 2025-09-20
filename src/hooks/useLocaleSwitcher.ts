// src/hooks/useLocaleSwitcher.ts
'use client'; // Los hooks que usan hooks de cliente también deben serlo.

import { useLocale } from 'next-intl';// Importamos los hooks de NextIntl
import { useRouter, usePathname } from '@/i18n/navigation'

// Este es nuestro custom hook. Contiene toda la lógica.
export function useLocaleSwitcher() {
  // 1. Obtenemos la información necesaria con los hooks existentes.
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();

  // 2. Definimos la función que realiza la acción de cambiar el idioma.
  const changeLocale = (newLocale: string) => {
    // Usamos el router para navegar a la misma página pero con el nuevo 'locale'.
    router.replace(pathname, { locale: newLocale });
  };

  // 3. Devolvemos los datos y funciones que el componente necesitará.
  return {
    currentLocale,
    changeLocale,
  };
}