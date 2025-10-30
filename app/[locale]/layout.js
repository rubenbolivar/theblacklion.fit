import { Inter, Montserrat } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n';
import '../globals.css';
import { Providers } from '../providers';

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

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const { locale } = params;

  const titles = {
    es: 'Black Lion Empire | Transformación Física y Mental Online',
    en: 'Black Lion Empire | Online Physical and Mental Transformation',
    pt: 'Black Lion Empire | Transformação Física e Mental Online'
  };

  const descriptions = {
    es: 'Programas de entrenamiento y nutrición personalizados 100% online. Entrena como un león, vive como un rey.',
    en: '100% online personalized training and nutrition programs. Train like a lion, live like a king.',
    pt: 'Programas personalizados de treinamento e nutrição 100% online. Treine como um leão, viva como um rei.'
  };

  const ogTitles = {
    es: 'Black Lion Empire - Entrena como un león, Vive como un rey',
    en: 'Black Lion Empire - Train like a lion, Live like a king',
    pt: 'Black Lion Empire - Treine como um leão, Viva como um rei'
  };

  const ogDescriptions = {
    es: 'Transformación física y mental desde cualquier lugar del mundo. Programas personalizados de entrenamiento y nutrición 100% online.',
    en: 'Physical and mental transformation from anywhere in the world. 100% online personalized training and nutrition programs.',
    pt: 'Transformação física e mental de qualquer lugar do mundo. Programas personalizados de treinamento e nutrição 100% online.'
  };

  return {
    title: titles[locale] || titles.es,
    description: descriptions[locale] || descriptions.es,
    keywords: 'entrenamiento personal, nutrición online, transformación física, coaching fitness, Luis Rondón, Black Lion Empire',
    authors: [{ name: 'Luis Rondón' }],
    creator: 'Luis Rondón',
    publisher: 'Black Lion Empire',
    metadataBase: new URL(process.env.SITE_URL || 'http://localhost:3000'),
    openGraph: {
      title: ogTitles[locale] || ogTitles.es,
      description: ogDescriptions[locale] || ogDescriptions.es,
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
      locale: locale === 'es' ? 'es_ES' : locale === 'en' ? 'en_US' : 'pt_BR',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Black Lion Empire',
      description: descriptions[locale] || descriptions.es,
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
    alternates: {
      canonical: `/${locale}`,
      languages: {
        'es': '/es',
        'en': '/en',
        'pt': '/pt',
      },
    },
  };
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = params;

  // Validar que el locale es válido
  if (!locales.includes(locale)) {
    notFound();
  }

  // Obtener mensajes de traducción
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${inter.variable} ${montserrat.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="antialiased">
        <NextIntlClientProvider messages={messages}>
          <Providers>{children}</Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
