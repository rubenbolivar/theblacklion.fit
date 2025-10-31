'use client';

import { createContext, useContext, useState, useEffect } from 'react';

// Importar traducciones
import es from '@/messages/es.json';
import en from '@/messages/en.json';
import pt from '@/messages/pt.json';

const translations = { es, en, pt };

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('es');
  const [isLoaded, setIsLoaded] = useState(false);

  // Cargar idioma guardado al montar
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && ['es', 'en', 'pt'].includes(savedLanguage)) {
      setLanguage(savedLanguage);
    }
    setIsLoaded(true);
  }, []);

  // Guardar idioma cuando cambia
  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);

    // Actualizar html lang attribute
    if (typeof document !== 'undefined') {
      document.documentElement.lang = newLanguage;
    }
  };

  // Helper para obtener traducción anidada
  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];

    for (const k of keys) {
      value = value?.[k];
    }

    return value || key; // Return key if translation not found
  };

  const value = {
    language,
    changeLanguage,
    t,
    isLoaded
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
