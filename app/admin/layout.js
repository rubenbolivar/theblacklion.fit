import { Inter, Montserrat } from 'next/font/google';
import { Providers } from '../providers';
import '../globals.css';
import AdminLayoutClient from '@/components/admin/AdminLayoutClient';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
});

export const metadata = {
  title: 'Admin - Black Lion Empire',
  description: 'Panel administrativo de Black Lion Empire',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({ children }) {
  return (
    <html lang="es" className={`${inter.variable} ${montserrat.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="antialiased">
        <Providers>
          <AdminLayoutClient>{children}</AdminLayoutClient>
        </Providers>
      </body>
    </html>
  );
}
