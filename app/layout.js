import { Inter, Montserrat } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

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

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata = {
  title: 'Black Lion Empire | Transformación Física y Mental Online',
  description: 'Programas de entrenamiento y nutrición personalizados 100% online. Entrena como un león, vive como un rey. Creado por Luis Rondón, entrenador personal y nutricionista.',
  keywords: 'entrenamiento personal, nutrición online, transformación física, coaching fitness, Luis Rondón, Black Lion Empire, entrenamiento online, plan nutricional',
  authors: [{ name: 'Luis Rondón' }],
  creator: 'Luis Rondón',
  publisher: 'Black Lion Empire',
  metadataBase: new URL(process.env.SITE_URL || 'http://localhost:3000'),
  openGraph: {
    title: 'Black Lion Empire - Entrena como un león, Vive como un rey',
    description: 'Transformación física y mental desde cualquier lugar del mundo. Programas personalizados de entrenamiento y nutrición 100% online.',
    url: process.env.SITE_URL || 'http://localhost:3000',
    siteName: 'Black Lion Empire',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Black Lion Empire - Logo',
      },
    ],
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Black Lion Empire',
    description: 'Transformación física y mental 100% online',
    images: ['/twitter-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${inter.variable} ${montserrat.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}