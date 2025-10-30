import createIntlMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import { locales, defaultLocale } from './i18n';

// Crear middleware de next-intl
const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'as-needed',
  localeDetection: true
});

export default function middleware(request) {
  const { pathname } = request.nextUrl;

  // Rutas admin no necesitan i18n (siempre en español)
  if (pathname.startsWith('/admin') || pathname.startsWith('/api')) {
    return NextResponse.next();
  }

  // Aplicar middleware de i18n para el resto de rutas
  return intlMiddleware(request);
}

export const config = {
  // Matcher para todas las rutas públicas excepto archivos estáticos
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|logo.png|og-image.png|.*\\..*|admin).*)',
    '/',
    '/(es|en|pt)/:path*'
  ]
};