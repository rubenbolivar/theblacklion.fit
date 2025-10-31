'use client';

import { useState, useRef, useEffect } from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const languages = {
  es: { name: 'Español', flag: '🇪🇸' },
  en: { name: 'English', flag: '🇺🇸' },
  pt: { name: 'Português', flag: '🇧🇷' }
};

export default function LanguageSwitcher() {
  const { language, changeLanguage } = useLanguage();
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

  const handleLanguageChange = (lang) => {
    changeLanguage(lang);
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
          {language}
        </span>
        <span className="text-lg sm:hidden">{languages[language].flag}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-lion-gray border border-lion-gold/20 rounded-lg shadow-lg z-50 overflow-hidden">
          {Object.entries(languages).map(([code, { name, flag }]) => (
            <button
              key={code}
              onClick={() => handleLanguageChange(code)}
              className={`w-full flex items-center space-x-3 px-4 py-3 text-left transition-colors ${
                language === code
                  ? 'bg-lion-gold/10 text-lion-gold'
                  : 'text-gray-300 hover:bg-lion-black hover:text-lion-gold'
              }`}
            >
              <span className="text-xl">{flag}</span>
              <div className="flex-1">
                <div className="text-sm font-medium">{name}</div>
                <div className="text-xs text-gray-500 uppercase">{code}</div>
              </div>
              {language === code && (
                <div className="w-2 h-2 bg-lion-gold rounded-full"></div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
