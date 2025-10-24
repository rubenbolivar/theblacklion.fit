'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { signOut } from 'next-auth/react';
import { 
  LayoutDashboard, 
  CreditCard, 
  Users, 
  MessageSquare, 
  LogOut,
  TrendingUp
} from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    {
      name: 'Dashboard',
      href: '/admin/dashboard',
      icon: LayoutDashboard
    },
    {
      name: 'Planes',
      href: '/admin/planes',
      icon: CreditCard
    },
    {
      name: 'Transformaciones',
      href: '/admin/transformaciones',
      icon: TrendingUp
    },
    {
      name: 'Contactos',
      href: '/admin/contactos',
      icon: MessageSquare
    },
  ];

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' });
  };

  return (
    <aside className="w-64 bg-lion-gray border-r border-gray-800 min-h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-800">
        <Link href="/admin/dashboard">
          <Image
            src="/logo.png"
            alt="Black Lion Empire"
            width={150}
            height={75}
            className="h-12 w-auto"
          />
        </Link>
        <p className="text-xs text-gray-500 mt-2">Panel Administrativo</p>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                    isActive
                      ? 'bg-lion-gold text-lion-black font-bold'
                      : 'text-gray-400 hover:bg-lion-black hover:text-lion-gold'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-800">
        <button
          onClick={handleLogout}
          className="flex items-center space-x-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500 hover:bg-opacity-10 hover:text-red-300 transition-all w-full"
        >
          <LogOut className="w-5 h-5" />
          <span>Cerrar Sesión</span>
        </button>

        {/* Link al sitio */}
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-center mt-3 text-xs text-gray-500 hover:text-lion-gold transition-colors"
        >
          Ver sitio web →
        </Link>
      </div>
    </aside>
  );
}