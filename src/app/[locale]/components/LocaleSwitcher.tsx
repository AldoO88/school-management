// src/app/[locale]/components/LocaleSwitcher.tsx
'use client';

import { Globe } from 'lucide-react';
import { useLocaleSwitcher } from '@/hooks/useLocaleSwitcher'; // <-- 1. Importamos nuestro nuevo custom hook

export default function LocaleSwitcher() {
  // 2. Usamos el hook para obtener la lógica y los datos.
  const { currentLocale, changeLocale } = useLocaleSwitcher();

  return (
    <div className="relative">
      {/* 3. La UI sigue igual, pero ahora llama a la función del hook */}
      <button
        onClick={() => changeLocale(currentLocale === 'es' ? 'en' : 'es')}
        className="flex items-center gap-2 bg-white text-red-800 font-semibold py-1.5 px-3 rounded-md hover:bg-gray-100 transition-colors cursor-pointer"
      >
        <Globe size={18} />
        <span>{currentLocale === 'es' ? 'English' : 'Español'}</span>
      </button>
    </div>
  );
}