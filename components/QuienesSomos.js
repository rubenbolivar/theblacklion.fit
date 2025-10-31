'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Dumbbell, Zap, Crown, ChevronDown, ChevronUp } from 'lucide-react';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';

export default function QuienesSomos() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [showTrayectoria, setShowTrayectoria] = useState(false);
  const { t } = useLanguage();

  const valores = [
    {
      icon: Dumbbell,
      title: t('about.values.discipline.title'),
      description: t('about.values.discipline.description')
    },
    {
      icon: Zap,
      title: t('about.values.energy.title'),
      description: t('about.values.energy.description')
    },
    {
      icon: Crown,
      title: t('about.values.confidence.title'),
      description: t('about.values.confidence.description')
    }
  ];

  return (
    <section id="quienes-somos" className="section-padding bg-lion-black" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">{t('about.title')}</h2>
          <div className="section-divider" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Imagen de Luis Rondón */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-square rounded-lg overflow-hidden border-4 border-lion-gold shadow-gold-lg">
              <Image
                src="/luis-rondon.jpg"
                alt="Luis Rondón - Entrenador Personal y Nutricionista"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>

            {/* Badge flotante */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute -bottom-6 -right-6 bg-lion-gold text-lion-black px-6 py-4 rounded-lg shadow-gold-lg"
            >
              <div className="text-center">
                <div className="text-3xl font-heading font-bold">10+</div>
                <div className="text-xs font-medium uppercase">{t('about.yearsExperience')}</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Contenido */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            <h3 className="text-3xl md:text-4xl font-heading font-bold text-lion-white">
              {t('about.movementHeading')}{' '}
              <span className="text-gradient-gold">{t('about.movementHeadingSpan')}</span>
            </h3>

            <p className="text-lg text-gray-300 leading-relaxed">
              {t('about.intro')}
            </p>

            <p className="text-lg text-gray-300 leading-relaxed">
              {t('about.description')}
            </p>

            {/* Mi Trayectoria - Expandible */}
            <div className="bg-lion-gray border border-lion-gold rounded-lg overflow-hidden">
              <button
                onClick={() => setShowTrayectoria(!showTrayectoria)}
                className="w-full p-6 flex items-center justify-between hover:bg-lion-black transition-colors"
              >
                <p className="text-lion-gold font-heading font-bold text-xl">
                  {t('about.trajectoryTitle')}
                </p>
                {showTrayectoria ? (
                  <ChevronUp className="w-6 h-6 text-lion-gold" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-lion-gold" />
                )}
              </button>

              <AnimatePresence>
                {showTrayectoria && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 space-y-4 text-gray-300 leading-relaxed">
                      <p>{t('about.trajectory.p1')}</p>
                      <p>{t('about.trajectory.p2')}</p>
                      <p>{t('about.trajectory.p3')}</p>
                      <p className="text-lion-gold font-medium">{t('about.trajectory.p4')}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="bg-lion-gray border border-lion-gold rounded-lg p-6">
              <p className="text-lion-gold font-heading font-bold text-xl mb-2">
                {t('about.missionTitle')}
              </p>
              <p className="text-gray-300">
                {t('about.mission')}
              </p>
            </div>

            {/* Valores */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6">
              {valores.map((valor, index) => (
                <motion.div
                  key={valor.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  className="text-center p-4 bg-lion-gray rounded-lg border border-gray-800 hover:border-lion-gold transition-colors"
                >
                  <valor.icon className="w-10 h-10 text-lion-gold mx-auto mb-3" />
                  <h4 className="font-heading font-bold text-lion-white mb-2">
                    {valor.title}
                  </h4>
                  <p className="text-sm text-gray-400">
                    {valor.description}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Credenciales */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-wrap gap-3 pt-4"
            >
              <span className="badge-gold">{t('about.credentials.trainer')}</span>
              <span className="badge-gold">{t('about.credentials.nutritionist')}</span>
              <span className="badge-gold">{t('about.credentials.athlete')}</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}