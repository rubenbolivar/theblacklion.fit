import { getRequestConfig } from 'next-intl/server';

// Idiomas soportados
export const locales = ['es', 'en', 'pt'];
export const defaultLocale = 'es';

export default getRequestConfig(async ({ locale }) => {
  return {
    messages: (await import(`./messages/${locale}.json`)).default
  };
});
