'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Send, CheckCircle, AlertCircle, MessageCircle, Mail, MapPin } from 'lucide-react';

export default function Contacto() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Guardar en base de datos (opcional, para registro)
      await fetch('/api/contacto', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      // Crear mensaje para WhatsApp
      const objetivoTexto = {
        'pérdida_de_peso': 'Pérdida de peso',
        'ganancia_muscular': 'Ganancia muscular',
        'recomposición_corporal': 'Recomposición corporal',
        'rendimiento_deportivo': 'Rendimiento deportivo',
        'otro': 'Otro'
      };

      const mensaje = `🦁 *Nueva Consulta - Black Lion Empire*

📝 *Nombre:* ${data.nombre}
📧 *Email:* ${data.email}
📱 *Teléfono:* ${data.telefono}
${data.pais ? `🌍 *País:* ${data.pais}` : ''}
${data.ciudad ? `🏙️ *Ciudad:* ${data.ciudad}` : ''}
🎯 *Objetivo:* ${objetivoTexto[data.objetivo] || data.objetivo}

💬 *Mensaje:*
${data.mensaje}`;

      // Redirigir a WhatsApp
      const whatsappNumber = '13213144332';
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(mensaje)}`;

      window.open(whatsappUrl, '_blank');

      setSubmitStatus('success');
      reset();
      setTimeout(() => setSubmitStatus(null), 5000);
    } catch (error) {
      console.error('Error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const objetivos = [
    'Pérdida de peso',
    'Ganancia muscular',
    'Recomposición corporal',
    'Rendimiento deportivo',
    'Otro'
  ];

  return (
    <section id="contacto" className="section-padding bg-lion-gray" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">COMIENZA TU TRANSFORMACIÓN</h2>
          <p className="section-subtitle">
            Da el primer paso hacia tu mejor versión
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Formulario */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Nombre */}
              <div>
                <label htmlFor="nombre" className="form-label">
                  Nombre Completo *
                </label>
                <input
                  id="nombre"
                  type="text"
                  className={`form-input ${errors.nombre ? 'border-red-500' : ''}`}
                  {...register('nombre', { required: 'El nombre es requerido' })}
                />
                {errors.nombre && (
                  <p className="text-red-500 text-sm mt-1">{errors.nombre.message}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="form-label">
                  Email *
                </label>
                <input
                  id="email"
                  type="email"
                  className={`form-input ${errors.email ? 'border-red-500' : ''}`}
                  {...register('email', {
                    required: 'El email es requerido',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Email inválido'
                    }
                  })}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              {/* Teléfono */}
              <div>
                <label htmlFor="telefono" className="form-label">
                  Teléfono (WhatsApp) *
                </label>
                <input
                  id="telefono"
                  type="tel"
                  placeholder="+1234567890"
                  className={`form-input ${errors.telefono ? 'border-red-500' : ''}`}
                  {...register('telefono', { required: 'El teléfono es requerido' })}
                />
                {errors.telefono && (
                  <p className="text-red-500 text-sm mt-1">{errors.telefono.message}</p>
                )}
              </div>

              {/* País y Ciudad */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="pais" className="form-label">
                    País
                  </label>
                  <input
                    id="pais"
                    type="text"
                    className="form-input"
                    {...register('pais')}
                  />
                </div>
                <div>
                  <label htmlFor="ciudad" className="form-label">
                    Ciudad
                  </label>
                  <input
                    id="ciudad"
                    type="text"
                    className="form-input"
                    {...register('ciudad')}
                  />
                </div>
              </div>

              {/* Objetivo */}
              <div>
                <label htmlFor="objetivo" className="form-label">
                  Objetivo *
                </label>
                <select
                  id="objetivo"
                  className={`form-input ${errors.objetivo ? 'border-red-500' : ''}`}
                  {...register('objetivo', { required: 'Selecciona un objetivo' })}
                >
                  <option value="">Selecciona tu objetivo</option>
                  {objetivos.map((obj) => (
                    <option key={obj} value={obj.toLowerCase().replace(/ /g, '_')}>
                      {obj}
                    </option>
                  ))}
                </select>
                {errors.objetivo && (
                  <p className="text-red-500 text-sm mt-1">{errors.objetivo.message}</p>
                )}
              </div>

              {/* Mensaje */}
              <div>
                <label htmlFor="mensaje" className="form-label">
                  Mensaje *
                </label>
                <textarea
                  id="mensaje"
                  rows="4"
                  className={`form-textarea ${errors.mensaje ? 'border-red-500' : ''}`}
                  placeholder="Cuéntanos sobre tus objetivos y expectativas..."
                  {...register('mensaje', { required: 'El mensaje es requerido' })}
                />
                {errors.mensaje && (
                  <p className="text-red-500 text-sm mt-1">{errors.mensaje.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-gold w-full flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="spinner" />
                    <span>Enviando...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Enviar Consulta</span>
                  </>
                )}
              </button>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-green-500 bg-opacity-10 border border-green-500 text-green-500 p-4 rounded-lg flex items-center space-x-2"
                >
                  <CheckCircle className="w-5 h-5" />
                  <span>¡Mensaje enviado! Te contactaremos pronto.</span>
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-500 bg-opacity-10 border border-red-500 text-red-500 p-4 rounded-lg flex items-center space-x-2"
                >
                  <AlertCircle className="w-5 h-5" />
                  <span>Error al enviar. Intenta nuevamente.</span>
                </motion.div>
              )}
            </form>
          </motion.div>

          {/* Información de contacto */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-heading font-bold text-lion-gold mb-6">
                Información de Contacto
              </h3>
              <p className="text-gray-400 mb-8">
                ¿Tienes preguntas? Estamos aquí para ayudarte. Contáctanos directamente 
                o llena el formulario y te responderemos lo antes posible.
              </p>
            </div>

            {/* WhatsApp */}
            <div className="bg-lion-black border border-lion-gold rounded-lg p-6 hover:shadow-gold transition-all">
              <div className="flex items-start space-x-4">
                <MessageCircle className="w-8 h-8 text-lion-gold flex-shrink-0" />
                <div>
                  <h4 className="font-heading font-bold text-lion-white mb-2">
                    WhatsApp
                  </h4>
                  <p className="text-gray-400 mb-3">
                    Contacto directo con Luis Rondón
                  </p>
                  <a
                    href="https://wa.me/13213144332"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lion-gold hover:text-yellow-500 transition-colors font-medium"
                  >
                    +1 (321) 314-4332 →
                  </a>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="bg-lion-black border border-gray-800 rounded-lg p-6 hover:border-lion-gold transition-all">
              <div className="flex items-start space-x-4">
                <Mail className="w-8 h-8 text-lion-gold flex-shrink-0" />
                <div>
                  <h4 className="font-heading font-bold text-lion-white mb-2">
                    Email
                  </h4>
                  <a
                    href="mailto:info@theblacklion.fit"
                    className="text-gray-400 hover:text-lion-gold transition-colors"
                  >
                    info@theblacklion.fit
                  </a>
                </div>
              </div>
            </div>

            {/* Ubicación */}
            <div className="bg-lion-black border border-gray-800 rounded-lg p-6 hover:border-lion-gold transition-all">
              <div className="flex items-start space-x-4">
                <MapPin className="w-8 h-8 text-lion-gold flex-shrink-0" />
                <div>
                  <h4 className="font-heading font-bold text-lion-white mb-2">
                    Ubicación
                  </h4>
                  <p className="text-gray-400">
                    100% Online - Disponible en todo el mundo
                  </p>
                </div>
              </div>
            </div>

            {/* Horario */}
            <div className="bg-gradient-to-r from-lion-black to-lion-gray border border-lion-gold rounded-lg p-6">
              <h4 className="font-heading font-bold text-lion-gold mb-3">
                Horario de Atención
              </h4>
              <p className="text-gray-300">
                Lunes a Domingo: 24/7
              </p>
              <p className="text-gray-500 text-sm mt-2">
                Respuesta garantizada en menos de 24 horas
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}