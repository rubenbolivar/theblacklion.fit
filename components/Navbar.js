'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import LanguageSwitcher from './LanguageSwitcher';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const t = useTranslations('nav');
  const tHero = useTranslations('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('home'), href: '#inicio' },
    { name: t('about'), href: '#quienes-somos' },
    { name: t('services'), href: '#servicios' },
    { name: t('plans'), href: '#planes' },
    { name: t('transformations'), href: '#transformaciones' },
    { name: t('gallery'), href: '#galeria' },
    { name: t('contact'), href: '#contacto' },
  ];

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`navbar-sticky ${
          isScrolled ? 'scrolled' : 'bg-transparent'
        }`}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-20">
            {/* Logo - Oculto en móvil cuando no hay scroll */}
            <div
              className={`cursor-pointer transition-opacity duration-300 ${
                !isScrolled ? 'opacity-0 lg:opacity-100' : 'opacity-100'
              }`}
              onClick={() => scrollToSection('#inicio')}
            >
              <Image
                src="/logo.png"
                alt="Black Lion Empire"
                width={120}
                height={60}
                className="h-12 w-auto"
                priority
              />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-6">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className="link-gold text-sm font-medium uppercase tracking-wide"
                >
                  {link.name}
                </button>
              ))}
              <LanguageSwitcher />
            </div>

            {/* Mobile: Language Switcher + Menu Button */}
            <div className="lg:hidden flex items-center space-x-3">
              <LanguageSwitcher />
              <button
                className="text-lion-gold"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="mobile-menu lg:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full space-y-8">
              <div className="mb-8">
                <Image
                  src="/logo.png"
                  alt="Black Lion Empire"
                  width={180}
                  height={90}
                  className="h-20 w-auto"
                />
              </div>

              {navLinks.map((link, index) => (
                <motion.button
                  key={link.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => scrollToSection(link.href)}
                  className="text-2xl font-heading font-bold text-lion-white hover:text-lion-gold transition-colors"
                >
                  {link.name}
                </motion.button>
              ))}

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                onClick={() => scrollToSection('#contacto')}
                className="btn-gold mt-8"
              >
                {tHero('ctaStartNow')}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}