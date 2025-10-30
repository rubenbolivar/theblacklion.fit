'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { locales } from '@/i18n';
import { Globe } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const languageNames = {
  es: 'Español',
  en: 'English',
  pt: 'Português'
};

const languageFlags = {
  es: '🇪🇸',
  en: '🇺🇸',
  pt: '🇧🇷'
};

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const switchLocale = (newLocale) => {
    // Obtener el path sin el locale actual
    const pathWithoutLocale = pathname.replace(`/${locale}`, '');

    // Construir nueva ruta con el nuevo locale
    const newPath = `/${newLocale}${pathWithoutLocale || ''}`;

    router.push(newPath);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-lion-gray hover:bg-lion-black border border-lion-gold/20 hover:border-lion-gold/40 transition-all"
        aria-label="Change language"
      >
        <Globe className="w-4 h-4 text-lion-gold" />
        <span className="text-sm font-medium text-lion-white uppercase hidden sm:inline">
          {locale}
        </span>
        <span className="text-lg sm:hidden">{languageFlags[locale]}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-lion-gray border border-lion-gold/20 rounded-lg shadow-lg z-50 overflow-hidden">
          {locales.map((loc) => (
            <button
              key={loc}
              onClick={() => switchLocale(loc)}
              className={`w-full flex items-center space-x-3 px-4 py-3 text-left transition-colors ${
                locale === loc
                  ? 'bg-lion-gold/10 text-lion-gold'
                  : 'text-gray-300 hover:bg-lion-black hover:text-lion-gold'
              }`}
            >
              <span className="text-xl">{languageFlags[loc]}</span>
              <div className="flex-1">
                <div className="text-sm font-medium">{languageNames[loc]}</div>
                <div className="text-xs text-gray-500 uppercase">{loc}</div>
              </div>
              {locale === loc && (
                <div className="w-2 h-2 bg-lion-gold rounded-full"></div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
