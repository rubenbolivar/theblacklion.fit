import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

// Idiomas soportados
export const locales = ['es', 'en', 'pt'];
export const defaultLocale = 'es';

export default getRequestConfig(async ({ locale }) => {
  // Validar que el locale es soportado
  if (!locales.includes(locale)) notFound();

  return {
    messages: (await import(`./messages/${locale}.json`)).default
  };
});
