'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff,
  Crown,
  X,
  Check
} from 'lucide-react';

export default function PlanesPage() {
  const [planes, setPlanes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    precio: '',
    duracionMeses: '',
    descripcion: '',
    caracteristicas: '',
    destacado: false,
    activo: true,
    terminosCondiciones: '',
    orden: 0
  });

  useEffect(() => {
    fetchPlanes();
  }, []);

  const fetchPlanes = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/planes');
      const data = await res.json();
      // Parsear características
      const planesConCaracteristicas = data.map(plan => ({
        ...plan,
        caracteristicas: typeof plan.caracteristicas === 'string' 
          ? JSON.parse(plan.caracteristicas) 
          : plan.caracteristicas
      }));
      setPlanes(planesConCaracteristicas);
    } catch (error) {
      console.error('Error fetching planes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (plan) => {
    setEditingPlan(plan);
    setFormData({
      nombre: plan.nombre,
      precio: plan.precio.toString(),
      duracionMeses: plan.duracionMeses.toString(),
      descripcion: plan.descripcion,
      caracteristicas: Array.isArray(plan.caracteristicas) 
        ? plan.caracteristicas.join('\n') 
        : plan.caracteristicas,
      destacado: plan.destacado,
      activo: plan.activo,
      terminosCondiciones: plan.terminosCondiciones || '',
      orden: plan.orden
    });
    setShowModal(true);
  };

  const handleNew = () => {
    setEditingPlan(null);
    setFormData({
      nombre: '',
      precio: '',
      duracionMeses: '',
      descripcion: '',
      caracteristicas: '',
      destacado: false,
      activo: true,
      terminosCondiciones: '',
      orden: planes.length
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const caracteristicasArray = formData.caracteristicas
        .split('\n')
        .filter(c => c.trim() !== '');

      const planData = {
        ...formData,
        precio: parseFloat(formData.precio),
        duracionMeses: parseInt(formData.duracionMeses),
        caracteristicas: JSON.stringify(caracteristicasArray),
        orden: parseInt(formData.orden)
      };

      if (editingPlan) {
        // Actualizar
        await fetch('/api/planes', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingPlan.id, ...planData }),
        });
      } else {
        // Crear
        await fetch('/api/planes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(planData),
        });
      }

      setShowModal(false);
      fetchPlanes();
    } catch (error) {
      console.error('Error saving plan:', error);
      alert('Error al guardar el plan');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('¿Estás seguro de eliminar este plan?')) return;

    try {
      await fetch(`/api/planes?id=${id}`, {
        method: 'DELETE',
      });
      fetchPlanes();
    } catch (error) {
      console.error('Error deleting plan:', error);
    }
  };

  const toggleActivo = async (plan) => {
    try {
      await fetch('/api/planes', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          id: plan.id, 
          activo: !plan.activo 
        }),
      });
      fetchPlanes();
    } catch (error) {
      console.error('Error updating plan:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold text-lion-gold mb-2">
            Planes y Precios
          </h1>
          <p className="text-gray-400">
            Gestiona los planes de entrenamiento disponibles
          </p>
        </div>
        <button
          onClick={handleNew}
          className="btn-gold flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Nuevo Plan</span>
        </button>
      </div>

      {/* Lista de planes */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="spinner" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {planes.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={`bg-lion-gray rounded-lg overflow-hidden ${
                plan.destacado
                  ? 'border-4 border-lion-gold shadow-gold'
                  : 'border-2 border-gray-800'
              }`}
            >
              {plan.destacado && (
                <div className="bg-lion-gold text-lion-black px-4 py-2 font-bold text-sm flex items-center justify-center space-x-2">
                  <Crown className="w-4 h-4" />
                  <span>PLAN DESTACADO</span>
                </div>
              )}

              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-heading font-bold text-lion-white mb-1">
                      {plan.nombre}
                    </h3>
                    <p className="text-gray-400 text-sm">{plan.descripcion}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => toggleActivo(plan)}
                      className={`p-2 rounded ${
                        plan.activo
                          ? 'text-green-400 hover:bg-green-500 hover:bg-opacity-10'
                          : 'text-gray-600 hover:bg-gray-700'
                      }`}
                      title={plan.activo ? 'Activo' : 'Inactivo'}
                    >
                      {plan.activo ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="text-3xl font-heading font-bold text-lion-gold">
                    ${plan.precio}
                  </div>
                  <p className="text-gray-500 text-sm">
                    {plan.duracionMeses === 1 ? 'Por mes' : `Por ${plan.duracionMeses} meses`}
                  </p>
                </div>

                <div className="space-y-2 mb-6">
                  {Array.isArray(plan.caracteristicas) && plan.caracteristicas.map((car, idx) => (
                    <div key={idx} className="flex items-start space-x-2 text-sm">
                      <Check className="w-4 h-4 text-lion-gold flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">{car}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => handleEdit(plan)}
                    className="flex-1 bg-lion-black border border-lion-gold text-lion-gold hover:bg-lion-gold hover:text-lion-black transition-all py-2 rounded-lg font-medium text-sm flex items-center justify-center space-x-2"
                  >
                    <Edit className="w-4 h-4" />
                    <span>Editar</span>
                  </button>
                  <button
                    onClick={() => handleDelete(plan.id)}
                    className="px-4 py-2 text-red-400 hover:bg-red-500 hover:bg-opacity-10 rounded-lg transition-all"
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
            className="modal-content max-w-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-gray-800 flex items-center justify-between">
              <h2 className="text-2xl font-heading font-bold text-lion-gold">
                {editingPlan ? 'Editar Plan' : 'Nuevo Plan'}
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
                  <label className="form-label">Nombre del Plan</label>
                  <input
                    type="text"
                    value={formData.nombre}
                    onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                    className="form-input"
                    required
                  />
                </div>
                <div>
                  <label className="form-label">Precio (USD)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.precio}
                    onChange={(e) => setFormData({...formData, precio: e.target.value})}
                    className="form-input"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Duración (meses)</label>
                  <input
                    type="number"
                    value={formData.duracionMeses}
                    onChange={(e) => setFormData({...formData, duracionMeses: e.target.value})}
                    className="form-input"
                    required
                  />
                </div>
                <div>
                  <label className="form-label">Orden</label>
                  <input
                    type="number"
                    value={formData.orden}
                    onChange={(e) => setFormData({...formData, orden: e.target.value})}
                    className="form-input"
                  />
                </div>
              </div>

              <div>
                <label className="form-label">Descripción</label>
                <input
                  type="text"
                  value={formData.descripcion}
                  onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
                  className="form-input"
                  required
                />
              </div>

              <div>
                <label className="form-label">Características (una por línea)</label>
                <textarea
                  value={formData.caracteristicas}
                  onChange={(e) => setFormData({...formData, caracteristicas: e.target.value})}
                  className="form-textarea"
                  rows="6"
                  placeholder="Plan de entrenamiento&#10;Plan nutricional&#10;Soporte WhatsApp"
                  required
                />
              </div>

              <div>
                <label className="form-label">Términos y Condiciones</label>
                <textarea
                  value={formData.terminosCondiciones}
                  onChange={(e) => setFormData({...formData, terminosCondiciones: e.target.value})}
                  className="form-textarea"
                  rows="3"
                />
              </div>

              <div className="flex items-center space-x-6">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.destacado}
                    onChange={(e) => setFormData({...formData, destacado: e.target.checked})}
                    className="w-4 h-4 text-lion-gold bg-lion-black border-gray-700 rounded focus:ring-lion-gold"
                  />
                  <span className="text-gray-300">Plan Destacado</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.activo}
                    onChange={(e) => setFormData({...formData, activo: e.target.checked})}
                    className="w-4 h-4 text-lion-gold bg-lion-black border-gray-700 rounded focus:ring-lion-gold"
                  />
                  <span className="text-gray-300">Activo</span>
                </label>
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
                  {editingPlan ? 'Actualizar Plan' : 'Crear Plan'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}