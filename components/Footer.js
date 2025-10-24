'use client';

import { Instagram } from 'lucide-react';
import Image from 'next/image';

// Componente SVG personalizado para TikTok
const TikTokIcon = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const quickLinks = [
    { name: 'Inicio', href: '#inicio' },
    { name: 'Quiénes Somos', href: '#quienes-somos' },
    { name: 'Servicios', href: '#servicios' },
    { name: 'Planes', href: '#planes' },
    { name: 'Transformaciones', href: '#transformaciones' },
    { name: 'Contacto', href: '#contacto' },
  ];

  const socialLinks = [
    {
      name: 'Instagram',
      icon: Instagram,
      href: 'https://www.instagram.com/theblacklionempire',
      color: 'hover:text-pink-500'
    },
    {
      name: 'TikTok',
      icon: TikTokIcon,
      href: 'https://www.tiktok.com/@luisjrondond_',
      color: 'hover:text-white'
    },
  ];

  return (
    <footer className="bg-lion-black border-t border-lion-gold">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Logo y lema */}
          <div className="space-y-4">
            <Image
              src="/logo.png"
              alt="Black Lion Empire"
              width={150}
              height={75}
              className="h-16 w-auto"
            />
            <p className="text-gray-400 text-sm italic">
              &quot;Entrena como un león, Vive como un rey&quot;
            </p>
            <p className="text-gray-500 text-xs">
              Transformación física y mental 100% online desde cualquier lugar del mundo.
            </p>
          </div>

          {/* Links rápidos */}
          <div>
            <h3 className="text-lion-gold font-heading font-bold mb-4">
              Links Rápidos
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="link-gold text-sm"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="text-lion-gold font-heading font-bold mb-4">
              Contacto
            </h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a
                  href="https://wa.me/13213144332"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-gold flex items-center space-x-2"
                >
                  <span>WhatsApp: +1 (321) 314-4332</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@theblacklion.fit"
                  className="link-gold"
                >
                  info@theblacklion.fit
                </a>
              </li>
              <li className="text-gray-500">
                Disponible 24/7
              </li>
            </ul>
          </div>

          {/* Redes sociales */}
          <div>
            <h3 className="text-lion-gold font-heading font-bold mb-4">
              Síguenos
            </h3>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-gray-400 transition-colors ${social.color}`}
                  aria-label={social.name}
                >
                  <social.icon className="w-6 h-6" />
                </a>
              ))}
            </div>
            <p className="text-gray-500 text-xs mt-4">
              Únete a nuestra comunidad y mantente actualizado con tips, 
              transformaciones y contenido exclusivo.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-8" />

        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-gray-500 text-sm text-center md:text-left">
            © {currentYear} Black Lion Empire. Todos los derechos reservados.
          </p>
          <p className="text-gray-500 text-sm text-center md:text-right">
            Developed by{' '}
            <a
              href="https://thetreeway.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lion-gold font-bold hover:text-yellow-500 transition-colors"
            >
              thetreeway.com
            </a>
          </p>
        </div>

        {/* Admin link (oculto) */}
        <div className="mt-4 text-center">
          <a
            href="/admin"
            className="text-gray-700 hover:text-gray-600 text-xs transition-colors"
          >
            Admin
          </a>
        </div>
      </div>
    </footer>
  );
}