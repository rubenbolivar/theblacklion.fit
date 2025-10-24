// Middleware deshabilitado temporalmente
// Para habilitar protección de rutas admin, descomentar el código siguiente
// y crear la página de login en app/admin/login/page.js

/*
import { withAuth } from 'next-auth/middleware';

export default withAuth({
  pages: {
    signIn: '/admin/login',
  },
});

export const config = {
  matcher: ['/admin/:path*']
};
*/

export function middleware() {
  // Sin protección por ahora
  return null;
}

export const config = {
  matcher: []
};