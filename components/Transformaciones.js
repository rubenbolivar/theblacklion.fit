'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { 
  ReactCompareSlider, 
  ReactCompareSliderImage 
} from 'react-compare-slider';
import { ChevronLeft, ChevronRight, Filter } from 'lucide-react';

export default function Transformaciones() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [transformaciones, setTransformaciones] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCategoria, setSelectedCategoria] = useState('todos');

  useEffect(() => {
    // Fetch transformaciones desde la API
    fetch('/api/transformaciones')
      .then(res => res.json())
      .then(data => setTransformaciones(data))
      .catch(err => console.error('Error fetching transformaciones:', err));
  }, []);

  const categorias = [
    { value: 'todos', label: 'Todos' },
    { value: 'perdida_peso', label: 'Pérdida de Peso' },
    { value: 'ganancia_muscular', label: 'Ganancia Muscular' },
    { value: 'recomposicion', label: 'Recomposición' },
  ];

  const transformacionesFiltradas = selectedCategoria === 'todos'
    ? transformaciones
    : transformaciones.filter(t => t.categoria === selectedCategoria);

  const currentTransformacion = transformacionesFiltradas[currentIndex];

  const handlePrevious = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? transformacionesFiltradas.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) => 
      prev === transformacionesFiltradas.length - 1 ? 0 : prev + 1
    );
  };

  // Si no hay transformaciones, mostrar placeholder
  if (transformaciones.length === 0) {
    return (
      <section id="transformaciones" className="section-padding bg-lion-black" ref={ref}>
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="section-title">TRANSFORMACIONES REALES</h2>
            <p className="section-subtitle">
              Resultados comprobados de nuestros clientes
            </p>
            
            <div className="max-w-2xl mx-auto bg-lion-gray border border-lion-gold rounded-lg p-12 mt-12">
              <p className="text-gray-400 mb-4">
                Las transformaciones se agregarán próximamente desde el panel administrativo.
              </p>
              <p className="text-sm text-gray-500">
                Aquí verás comparaciones antes/después con slider interactivo.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="transformaciones" className="section-padding bg-lion-black" ref={ref}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">TRANSFORMACIONES REALES</h2>
          <p className="section-subtitle">
            Resultados comprobados de nuestros clientes
          </p>
        </motion.div>

        {/* Filtros */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          <Filter className="w-5 h-5 text-lion-gold self-center" />
          {categorias.map((cat) => (
            <button
              key={cat.value}
              onClick={() => {
                setSelectedCategoria(cat.value);
                setCurrentIndex(0);
              }}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                selectedCategoria === cat.value
                  ? 'bg-lion-gold text-lion-black'
                  : 'bg-lion-gray text-gray-400 hover:text-lion-gold border border-gray-800 hover:border-lion-gold'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {transformacionesFiltradas.length === 0 ? (
          <div className="text-center text-gray-400 py-12">
            No hay transformaciones en esta categoría
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="max-w-4xl mx-auto"
          >
            {/* Slider de comparación */}
            <div className="relative bg-lion-gray rounded-lg overflow-hidden border-4 border-lion-gold shadow-gold-lg mb-8">
              <ReactCompareSlider
                itemOne={
                  <ReactCompareSliderImage
                    src={currentTransformacion.imagenAntes}
                    alt="Antes"
                    style={{ objectFit: 'cover' }}
                  />
                }
                itemTwo={
                  <ReactCompareSliderImage
                    src={currentTransformacion.imagenDespues}
                    alt="Después"
                    style={{ objectFit: 'cover' }}
                  />
                }
                position={50}
                className="h-[400px] md:h-[600px]"
              />
              
              {/* Labels Antes/Después */}
              <div className="absolute top-4 left-4 bg-lion-black bg-opacity-75 px-4 py-2 rounded-lg">
                <span className="text-lion-gold font-bold">ANTES</span>
              </div>
              <div className="absolute top-4 right-4 bg-lion-black bg-opacity-75 px-4 py-2 rounded-lg">
                <span className="text-lion-gold font-bold">DESPUÉS</span>
              </div>
            </div>

            {/* Información del cliente */}
            <div className="bg-lion-gray border border-gray-800 rounded-lg p-6 mb-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-heading font-bold text-lion-white mb-1">
                    {currentTransformacion.nombreCliente}
                  </h3>
                  {currentTransformacion.edad && (
                    <p className="text-gray-400">
                      {currentTransformacion.edad} años
                    </p>
                  )}
                </div>
                <div className="mt-4 md:mt-0">
                  <div className="badge-gold">
                    {currentTransformacion.tiempoTransformacion}
                  </div>
                </div>
              </div>

              {/* Testimonial */}
              <div className="bg-lion-black rounded-lg p-6 border-l-4 border-lion-gold">
                <p className="text-gray-300 italic leading-relaxed">
                  "{currentTransformacion.testimonial}"
                </p>
              </div>
            </div>

            {/* Navegación */}
            <div className="flex items-center justify-between">
              <button
                onClick={handlePrevious}
                className="flex items-center space-x-2 text-lion-gold hover:text-yellow-500 transition-colors disabled:opacity-50"
                disabled={transformacionesFiltradas.length <= 1}
              >
                <ChevronLeft className="w-6 h-6" />
                <span className="hidden md:inline">Anterior</span>
              </button>

              <div className="text-center">
                <p className="text-gray-400 text-sm">
                  {currentIndex + 1} de {transformacionesFiltradas.length}
                </p>
              </div>

              <button
                onClick={handleNext}
                className="flex items-center space-x-2 text-lion-gold hover:text-yellow-500 transition-colors disabled:opacity-50"
                disabled={transformacionesFiltradas.length <= 1}
              >
                <span className="hidden md:inline">Siguiente</span>
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Indicadores de puntos */}
            {transformacionesFiltradas.length > 1 && (
              <div className="flex justify-center space-x-2 mt-6">
                {transformacionesFiltradas.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentIndex
                        ? 'bg-lion-gold w-8'
                        : 'bg-gray-600 hover:bg-gray-500'
                    }`}
                    aria-label={`Ver transformación ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl md:text-3xl font-heading font-bold text-lion-white mb-4">
            ¿Listo para tu propia transformación?
          </h3>
          <button
            onClick={() => {
              const element = document.querySelector('#contacto');
              if (element) {
                const offset = 80;
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - offset;
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
              }
            }}
            className="btn-gold"
          >
            Comienza Ahora
          </button>
        </motion.div>
      </div>
    </section>
  );
}