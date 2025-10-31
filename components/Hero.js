'use client';

import { motion } from 'framer-motion';
import { ChevronRight, Zap } from 'lucide-react';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Hero() {
  const { t } = useLanguage();
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
  };

  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Imagen de fondo hero */}
      <div className="absolute inset-0 z-0">
        {/* Imagen de fondo */}
        <Image
          src="/hero-bg.jpg"
          alt="Black Lion Empire Hero"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        
        {/* Overlay oscuro para legibilidad */}
        <div className="hero-overlay" />
        
        {/* Partículas doradas animadas superpuestas */}
        <div className="absolute inset-0 z-10">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-lion-gold rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </div>

      {/* Contenido */}
      <div className="relative z-20 container-custom text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center mb-8"
        >
          <Image
            src="/logo.png"
            alt="Black Lion Empire"
            width={300}
            height={150}
            className="h-32 md:h-40 w-auto animate-glow"
            priority
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-3xl md:text-5xl lg:text-6xl font-heading font-black mb-6"
        >
          <span className="text-lion-white">{t('hero.title')}</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex items-center justify-center space-x-3 mb-6"
        >
          <Zap className="w-6 h-6 text-lion-red" />
          <p className="text-xl md:text-2xl lg:text-3xl font-heading font-bold text-lion-gold">
            {t('hero.tagline')}
          </p>
          <Zap className="w-6 h-6 text-lion-red" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg md:text-xl text-gray-300 mb-12 max-w-2xl mx-auto"
        >
          {t('hero.description')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={() => scrollToSection('#contacto')}
            className="btn-gold flex items-center space-x-2 group"
          >
            <span>{t('hero.ctaStart')}</span>
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => scrollToSection('#quienes-somos')}
            className="btn-outline-gold"
          >
            {t('hero.ctaMeet')}
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
        >
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-heading font-bold text-lion-gold mb-2">
              500+
            </div>
            <div className="text-gray-400 uppercase tracking-wide text-sm">
              {t('hero.stats.transformations')}
            </div>
          </div>

          <div className="text-center">
            <div className="text-4xl md:text-5xl font-heading font-bold text-lion-gold mb-2">
              50+
            </div>
            <div className="text-gray-400 uppercase tracking-wide text-sm">
              {t('hero.stats.countries')}
            </div>
          </div>

          <div className="text-center">
            <div className="text-4xl md:text-5xl font-heading font-bold text-lion-gold mb-2">
              100%
            </div>
            <div className="text-gray-400 uppercase tracking-wide text-sm">
              {t('hero.stats.online')}
            </div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 border-2 border-lion-gold rounded-full flex items-start justify-center p-2"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-3 bg-lion-gold rounded-full"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}