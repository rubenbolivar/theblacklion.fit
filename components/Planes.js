'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Check, Crown, ChevronDown, ChevronUp } from 'lucide-react';

export default function Planes() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [planes, setPlanes] = useState([]);
  const [expandedTerms, setExpandedTerms] = useState({});

  useEffect(() => {
    // Fetch planes desde la API
    fetch('/api/planes')
      .then(res => res.json())
      .then(data => {
        // Parsear las características de JSON string a array
        const planesConCaracteristicas = data.map(plan => ({
          ...plan,
          caracteristicas: typeof plan.caracteristicas === 'string'
            ? JSON.parse(plan.caracteristicas)
            : plan.caracteristicas
        }));
        setPlanes(planesConCaracteristicas);
      })
      .catch(err => console.error('Error fetching planes:', err));
  }, []);

  const toggleTerms = (planId) => {
    setExpandedTerms(prev => ({
      ...prev,
      [planId]: !prev[planId]
    }));
  };

  const scrollToContacto = () => {
    const element = document.querySelector('#contacto');
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <section id="planes" className="section-padding bg-lion-black" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">PLANES Y PRECIOS</h2>
          <p className="section-subtitle">
            Elige el plan que mejor se adapte a tus objetivos
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {planes.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`relative bg-lion-gray rounded-lg overflow-hidden ${
                plan.destacado
                  ? 'border-4 border-lion-gold shadow-gold-lg'
                  : 'border-2 border-gray-800'
              }`}
            >
              {/* Badge de recomendado */}
              {plan.destacado && (
                <div className="absolute top-0 right-0 bg-lion-gold text-lion-black px-6 py-2 font-heading font-bold text-sm uppercase tracking-wide flex items-center space-x-2">
                  <Crown className="w-4 h-4" />
                  <span>Más Popular</span>
                </div>
              )}

              <div className="p-8">
                {/* Nombre del plan */}
                <h3 className="text-2xl font-heading font-bold text-lion-white mb-2">
                  {plan.nombre}
                </h3>

                {/* Descripción */}
                <p className="text-gray-400 mb-6">
                  {plan.descripcion}
                </p>

                {/* Precio */}
                <div className="mb-6">
                  <div className="flex items-baseline space-x-2">
                    <span className="text-5xl font-heading font-bold text-lion-gold">
                      ${plan.precio}
                    </span>
                    <span className="text-gray-400">USD</span>
                  </div>
                  <p className="text-gray-500 text-sm mt-1">
                    {plan.duracionMeses === 1 ? 'Por mes' : `Por ${plan.duracionMeses} meses`}
                  </p>
                  {plan.destacado && (
                    <div className="mt-2 inline-block bg-lion-red text-white px-3 py-1 rounded-full text-sm font-bold">
                      Ahorra $50 USD
                    </div>
                  )}
                </div>

                {/* Características */}
                <div className="space-y-3 mb-8">
                  {Array.isArray(plan.caracteristicas) && plan.caracteristicas.map((caracteristica, idx) => (
                    <div key={idx} className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-lion-gold flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">{caracteristica}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <button
                  onClick={scrollToContacto}
                  className={`w-full py-4 rounded-lg font-heading font-bold text-lg transition-all duration-300 ${
                    plan.destacado
                      ? 'bg-lion-gold text-lion-black hover:bg-yellow-500 hover:scale-105 shadow-gold'
                      : 'bg-lion-gray border-2 border-lion-gold text-lion-gold hover:bg-lion-gold hover:text-lion-black'
                  }`}
                >
                  Elegir Plan {plan.nombre.split(' ')[0]}
                </button>

                {/* Términos y condiciones */}
                {plan.terminosCondiciones && (
                  <div className="mt-6">
                    <button
                      onClick={() => toggleTerms(plan.id)}
                      className="flex items-center justify-between w-full text-sm text-gray-400 hover:text-lion-gold transition-colors"
                    >
                      <span>Términos y condiciones</span>
                      {expandedTerms[plan.id] ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>
                    
                    {expandedTerms[plan.id] && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-3 text-xs text-gray-500 bg-lion-black p-4 rounded-lg"
                      >
                        {plan.terminosCondiciones}
                      </motion.div>
                    )}
                  </div>
                )}
              </div>

              {/* Efecto de brillo para plan destacado */}
              {plan.destacado && (
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-lion-gold to-transparent opacity-10 animate-glow" />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Garantía o nota adicional */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 text-center max-w-3xl mx-auto"
        >
          <div className="bg-lion-gray border border-lion-gold rounded-lg p-6">
            <Crown className="w-12 h-12 text-lion-gold mx-auto mb-4" />
            <h4 className="text-xl font-heading font-bold text-lion-white mb-2">
              Inversión en tu mejor versión
            </h4>
            <p className="text-gray-400">
              Cada plan incluye seguimiento personalizado, ajustes continuos y soporte directo 
              con Luis Rondón. Tu transformación comienza aquí.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}