'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Dumbbell, Apple, Pill, Activity, MessageCircle, Globe } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Servicios() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  const servicios = [
    {
      icon: Dumbbell,
      title: t('services.items.training.title'),
      description: t('services.items.training.description')
    },
    {
      icon: Apple,
      title: t('services.items.nutrition.title'),
      description: t('services.items.nutrition.description')
    },
    {
      icon: Pill,
      title: t('services.items.supplements.title'),
      description: t('services.items.supplements.description')
    },
    {
      icon: Activity,
      title: t('services.items.tracking.title'),
      description: t('services.items.tracking.description')
    },
    {
      icon: MessageCircle,
      title: t('services.items.whatsapp.title'),
      description: t('services.items.whatsapp.description')
    },
    {
      icon: Globe,
      title: t('services.items.online.title'),
      description: t('services.items.online.description')
    }
  ];

  return (
    <section id="servicios" className="section-padding bg-lion-gray" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">{t('services.title')}</h2>
          <p className="section-subtitle">
            {t('services.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicios.map((servicio, index) => (
            <motion.div
              key={servicio.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="card-hover group"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="w-20 h-20 bg-lion-black rounded-full flex items-center justify-center border-2 border-lion-gold group-hover:shadow-gold transition-all"
                >
                  <servicio.icon className="w-10 h-10 text-lion-gold" />
                </motion.div>

                <h3 className="text-xl font-heading font-bold text-lion-white group-hover:text-lion-gold transition-colors">
                  {servicio.title}
                </h3>

                <p className="text-gray-400 leading-relaxed">
                  {servicio.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA adicional */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-lion-black via-lion-gray to-lion-black border border-lion-gold rounded-lg p-8 max-w-3xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-heading font-bold text-lion-gold mb-4">
              {t('services.cta.title')}
            </h3>
            <p className="text-gray-300 mb-6">
              {t('services.cta.description')}
            </p>
            <button
              onClick={() => {
                const element = document.querySelector('#planes');
                if (element) {
                  const offset = 80;
                  const elementPosition = element.getBoundingClientRect().top;
                  const offsetPosition = elementPosition + window.pageYOffset - offset;
                  window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                }
              }}
              className="btn-gold"
            >
              {t('services.cta.button')}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}