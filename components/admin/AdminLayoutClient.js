'use client';

import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import Sidebar from '@/components/admin/Sidebar';

export default function AdminLayoutClient({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Si no está autenticado y no está en la página de login, redirigir
    if (status === 'unauthenticated' && pathname !== '/admin/login') {
      router.push('/admin/login');
    }

    // Si está autenticado y está en login, redirigir al dashboard
    if (status === 'authenticated' && pathname === '/admin/login') {
      router.push('/admin/dashboard');
    }
  }, [status, pathname, router]);

  // Si está en la página de login, no mostrar el sidebar
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  // Mostrar loading mientras verifica la sesión
  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-lion-black flex items-center justify-center">
        <div className="text-center">
          <div className="spinner mx-auto mb-4" />
          <p className="text-gray-400">Cargando...</p>
        </div>
      </div>
    );
  }

  // Si no está autenticado, no mostrar nada (se redirigirá)
  if (status === 'unauthenticated') {
    return null;
  }

  // Layout con sidebar para páginas autenticadas
  return (
    <div className="flex min-h-screen bg-lion-black">
      <Sidebar />
      <main className="flex-1 overflow-x-hidden">
        {/* Header */}
        <header className="bg-lion-gray border-b border-gray-800 px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-heading font-bold text-lion-gold">
              Black Lion Empire
            </h1>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-400">Bienvenido,</p>
                <p className="text-sm font-medium text-lion-white">
                  {session?.user?.name || session?.user?.email}
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
