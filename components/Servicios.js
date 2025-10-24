'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Dumbbell, Apple, Pill, Activity, MessageCircle, Globe } from 'lucide-react';

export default function Servicios() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const servicios = [
    {
      icon: Dumbbell,
      title: 'Plan de Entrenamiento Personalizado',
      description: 'Programas adaptados a tu nivel y objetivo específico'
    },
    {
      icon: Apple,
      title: 'Plan Nutricional Personalizado',
      description: 'Alimentación diseñada según tu objetivo y estilo de vida'
    },
    {
      icon: Pill,
      title: 'Asesoramiento de Suplementación',
      description: 'Guía profesional para optimizar tus resultados'
    },
    {
      icon: Activity,
      title: 'Seguimiento Continuo',
      description: 'Control bisemanal con ajustes necesarios'
    },
    {
      icon: MessageCircle,
      title: 'Soporte Directo WhatsApp',
      description: 'Contacto directo con Luis Rondón'
    },
    {
      icon: Globe,
      title: '100% Online',
      description: 'Entrena desde cualquier lugar del mundo'
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
          <h2 className="section-title">NUESTROS SERVICIOS</h2>
          <p className="section-subtitle">
            Todo lo que necesitas para tu transformación en un solo lugar
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
              ¿Listo para comenzar tu transformación?
            </h3>
            <p className="text-gray-300 mb-6">
              Únete a cientos de personas que ya están transformando sus vidas con Black Lion Empire
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
              Ver Planes y Precios
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}