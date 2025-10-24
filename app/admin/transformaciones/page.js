'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Eye, EyeOff, X, Upload } from 'lucide-react';
import Image from 'next/image';

export default function TransformacionesPage() {
  const [transformaciones, setTransformaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingTransformacion, setEditingTransformacion] = useState(null);
  const [formData, setFormData] = useState({
    nombreCliente: '',
    edad: '',
    imagenAntes: '',
    imagenDespues: '',
    categoria: 'perdida_peso',
    tiempoTransformacion: '',
    testimonial: '',
    visible: true,
    orden: 0
  });

  useEffect(() => {
    fetchTransformaciones();
  }, []);

  const fetchTransformaciones = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/transformaciones');
      const data = await res.json();
      setTransformaciones(data);
    } catch (error) {
      console.error('Error fetching transformaciones:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (transformacion) => {
    setEditingTransformacion(transformacion);
    setFormData({
      nombreCliente: transformacion.nombreCliente,
      edad: transformacion.edad?.toString() || '',
      imagenAntes: transformacion.imagenAntes,
      imagenDespues: transformacion.imagenDespues,
      categoria: transformacion.categoria,
      tiempoTransformacion: transformacion.tiempoTransformacion,
      testimonial: transformacion.testimonial,
      visible: transformacion.visible,
      orden: transformacion.orden
    });
    setShowModal(true);
  };

  const handleNew = () => {
    setEditingTransformacion(null);
    setFormData({
      nombreCliente: '',
      edad: '',
      imagenAntes: '',
      imagenDespues: '',
      categoria: 'perdida_peso',
      tiempoTransformacion: '',
      testimonial: '',
      visible: true,
      orden: transformaciones.length
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const transformacionData = {
        ...formData,
        edad: formData.edad ? parseInt(formData.edad) : null,
        orden: parseInt(formData.orden)
      };

      if (editingTransformacion) {
        await fetch('/api/transformaciones', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingTransformacion.id, ...transformacionData }),
        });
      } else {
        await fetch('/api/transformaciones', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(transformacionData),
        });
      }

      setShowModal(false);
      fetchTransformaciones();
    } catch (error) {
      console.error('Error saving transformacion:', error);
      alert('Error al guardar la transformación');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('¿Estás seguro de eliminar esta transformación?')) return;

    try {
      await fetch(`/api/transformaciones?id=${id}`, {
        method: 'DELETE',
      });
      fetchTransformaciones();
    } catch (error) {
      console.error('Error deleting transformacion:', error);
    }
  };

  const toggleVisible = async (transformacion) => {
    try {
      await fetch('/api/transformaciones', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          id: transformacion.id, 
          visible: !transformacion.visible 
        }),
      });
      fetchTransformaciones();
    } catch (error) {
      console.error('Error updating transformacion:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold text-lion-gold mb-2">
            Transformaciones
          </h1>
          <p className="text-gray-400">
            Gestiona las transformaciones antes/después de tus clientes
          </p>
        </div>
        <button
          onClick={handleNew}
          className="btn-gold flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Nueva Transformación</span>
        </button>
      </div>

      {/* Lista de transformaciones */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="spinner" />
        </div>
      ) : transformaciones.length === 0 ? (
        <div className="bg-lion-gray border border-gray-800 rounded-lg p-12 text-center">
          <Upload className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400 mb-4">No hay transformaciones aún</p>
          <button onClick={handleNew} className="btn-gold">
            Agregar Primera Transformación
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {transformaciones.map((transformacion, index) => (
            <motion.div
              key={transformacion.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-lion-gray border border-gray-800 rounded-lg overflow-hidden hover:border-lion-gold transition-all"
            >
              {/* Imágenes */}
              <div className="grid grid-cols-2 gap-1 p-2">
                <div className="relative aspect-square bg-lion-black rounded overflow-hidden">
                  {transformacion.imagenAntes ? (
                    <Image
                      src={transformacion.imagenAntes}
                      alt="Antes"
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-600">
                      <span className="text-xs">ANTES</span>
                    </div>
                  )}
                  <div className="absolute top-2 left-2 bg-lion-black bg-opacity-75 px-2 py-1 rounded text-xs text-lion-gold font-bold">
                    ANTES
                  </div>
                </div>
                <div className="relative aspect-square bg-lion-black rounded overflow-hidden">
                  {transformacion.imagenDespues ? (
                    <Image
                      src={transformacion.imagenDespues}
                      alt="Después"
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-600">
                      <span className="text-xs">DESPUÉS</span>
                    </div>
                  )}
                  <div className="absolute top-2 right-2 bg-lion-black bg-opacity-75 px-2 py-1 rounded text-xs text-lion-gold font-bold">
                    DESPUÉS
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-heading font-bold text-lion-white">
                      {transformacion.nombreCliente}
                    </h3>
                    {transformacion.edad && (
                      <p className="text-sm text-gray-400">{transformacion.edad} años</p>
                    )}
                  </div>
                  <button
                    onClick={() => toggleVisible(transformacion)}
                    className={`p-1 rounded ${
                      transformacion.visible
                        ? 'text-green-400 hover:bg-green-500 hover:bg-opacity-10'
                        : 'text-gray-600 hover:bg-gray-700'
                    }`}
                  >
                    {transformacion.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>
                </div>

                <div className="flex items-center space-x-2 mb-3">
                  <span className="text-xs bg-lion-black px-2 py-1 rounded text-gray-400">
                    {transformacion.categoria.replace(/_/g, ' ')}
                  </span>
                  <span className="text-xs bg-lion-gold text-lion-black px-2 py-1 rounded font-bold">
                    {transformacion.tiempoTransformacion}
                  </span>
                </div>

                <p className="text-sm text-gray-400 line-clamp-2 mb-4">
                  {transformacion.testimonial}
                </p>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleEdit(transformacion)}
                    className="flex-1 bg-lion-black border border-lion-gold text-lion-gold hover:bg-lion-gold hover:text-lion-black transition-all py-2 rounded font-medium text-sm flex items-center justify-center space-x-2"
                  >
                    <Edit className="w-4 h-4" />
                    <span>Editar</span>
                  </button>
                  <button
                    onClick={() => handleDelete(transformacion.id)}
                    className="px-3 py-2 text-red-400 hover:bg-red-500 hover:bg-opacity-10 rounded transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="modal-content max-w-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-gray-800 flex items-center justify-between">
              <h2 className="text-2xl font-heading font-bold text-lion-gold">
                {editingTransformacion ? 'Editar Transformación' : 'Nueva Transformación'}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-lion-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Nombre del Cliente</label>
                  <input
                    type="text"
                    value={formData.nombreCliente}
                    onChange={(e) => setFormData({...formData, nombreCliente: e.target.value})}
                    className="form-input"
                    required
                  />
                </div>
                <div>
                  <label className="form-label">Edad (opcional)</label>
                  <input
                    type="number"
                    value={formData.edad}
                    onChange={(e) => setFormData({...formData, edad: e.target.value})}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Categoría</label>
                  <select
                    value={formData.categoria}
                    onChange={(e) => setFormData({...formData, categoria: e.target.value})}
                    className="form-input"
                    required
                  >
                    <option value="perdida_peso">Pérdida de Peso</option>
                    <option value="ganancia_muscular">Ganancia Muscular</option>
                    <option value="recomposicion">Recomposición</option>
                  </select>
                </div>
                <div>
                  <label className="form-label">Tiempo de Transformación</label>
                  <input
                    type="text"
                    value={formData.tiempoTransformacion}
                    onChange={(e) => setFormData({...formData, tiempoTransformacion: e.target.value})}
                    className="form-input"
                    placeholder="3 meses"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="form-label">URL Imagen ANTES</label>
                  <input
                    type="url"
                    value={formData.imagenAntes}
                    onChange={(e) => setFormData({...formData, imagenAntes: e.target.value})}
                    className="form-input"
                    placeholder="https://..."
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Sube la imagen a Cloudinary y pega la URL aquí
                  </p>
                </div>
                <div>
                  <label className="form-label">URL Imagen DESPUÉS</label>
                  <input
                    type="url"
                    value={formData.imagenDespues}
                    onChange={(e) => setFormData({...formData, imagenDespues: e.target.value})}
                    className="form-input"
                    placeholder="https://..."
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Sube la imagen a Cloudinary y pega la URL aquí
                  </p>
                </div>
              </div>

              <div>
                <label className="form-label">Testimonial</label>
                <textarea
                  value={formData.testimonial}
                  onChange={(e) => setFormData({...formData, testimonial: e.target.value})}
                  className="form-textarea"
                  rows="4"
                  placeholder="Testimonio del cliente sobre su transformación..."
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Orden</label>
                  <input
                    type="number"
                    value={formData.orden}
                    onChange={(e) => setFormData({...formData, orden: e.target.value})}
                    className="form-input"
                  />
                </div>
                <div className="flex items-end">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.visible}
                      onChange={(e) => setFormData({...formData, visible: e.target.checked})}
                      className="w-4 h-4 text-lion-gold bg-lion-black border-gray-700 rounded focus:ring-lion-gold"
                    />
                    <span className="text-gray-300">Visible en el sitio</span>
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-800">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-6 py-2 text-gray-400 hover:text-lion-white transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="btn-gold"
                >
                  {editingTransformacion ? 'Actualizar' : 'Crear Transformación'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}