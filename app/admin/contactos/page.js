'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Eye, 
  EyeOff, 
  MessageSquare, 
  Phone, 
  Mail, 
  MapPin,
  Filter,
  X,
  ExternalLink
} from 'lucide-react';

export default function ContactosPage() {
  const [contactos, setContactos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedContacto, setSelectedContacto] = useState(null);
  const [filterLeido, setFilterLeido] = useState('todos');
  const [filterObjetivo, setFilterObjetivo] = useState('todos');

  useEffect(() => {
    fetchContactos();
  }, [filterLeido, filterObjetivo]);

  const fetchContactos = async () => {
    setLoading(true);
    try {
      let url = '/api/contacto?';
      if (filterLeido !== 'todos') {
        url += `leido=${filterLeido === 'leidos'}&`;
      }
      if (filterObjetivo !== 'todos') {
        url += `objetivo=${filterObjetivo}`;
      }

      const res = await fetch(url);
      const data = await res.json();
      setContactos(data);
    } catch (error) {
      console.error('Error fetching contactos:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleLeido = async (id, currentStatus) => {
    try {
      await fetch('/api/contacto', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, leido: !currentStatus }),
      });
      fetchContactos();
    } catch (error) {
      console.error('Error updating contacto:', error);
    }
  };

  const deleteContacto = async (id) => {
    if (!confirm('¿Estás seguro de eliminar este contacto?')) return;

    try {
      await fetch(`/api/contacto?id=${id}`, {
        method: 'DELETE',
      });
      fetchContactos();
      setSelectedContacto(null);
    } catch (error) {
      console.error('Error deleting contacto:', error);
    }
  };

  const objetivos = [
    { value: 'todos', label: 'Todos' },
    { value: 'perdida_peso', label: 'Pérdida de Peso' },
    { value: 'ganancia_muscular', label: 'Ganancia Muscular' },
    { value: 'recomposicion', label: 'Recomposición' },
    { value: 'rendimiento', label: 'Rendimiento' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold text-lion-gold mb-2">
            Contactos
          </h1>
          <p className="text-gray-400">
            Gestiona los mensajes recibidos desde el formulario de contacto
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-lion-white">
            {contactos.length}
          </div>
          <div className="text-sm text-gray-400">Total contactos</div>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-lion-gray border border-gray-800 rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-4">
          <Filter className="w-5 h-5 text-lion-gold" />
          <span className="font-medium text-lion-white">Filtros</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Filtro por estado */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">Estado</label>
            <select
              value={filterLeido}
              onChange={(e) => setFilterLeido(e.target.value)}
              className="form-input"
            >
              <option value="todos">Todos</option>
              <option value="no-leidos">No leídos</option>
              <option value="leidos">Leídos</option>
            </select>
          </div>

          {/* Filtro por objetivo */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">Objetivo</label>
            <select
              value={filterObjetivo}
              onChange={(e) => setFilterObjetivo(e.target.value)}
              className="form-input"
            >
              {objetivos.map(obj => (
                <option key={obj.value} value={obj.value}>
                  {obj.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Lista de contactos */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="spinner" />
        </div>
      ) : contactos.length === 0 ? (
        <div className="bg-lion-gray border border-gray-800 rounded-lg p-12 text-center">
          <MessageSquare className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400">No hay contactos con estos filtros</p>
        </div>
      ) : (
        <div className="bg-lion-gray border border-gray-800 rounded-lg overflow-hidden">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Estado</th>
                <th>Fecha</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Teléfono</th>
                <th>Objetivo</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {contactos.map((contacto) => (
                <tr key={contacto.id}>
                  <td>
                    <button
                      onClick={() => toggleLeido(contacto.id, contacto.leido)}
                      className="flex items-center space-x-2 text-sm"
                    >
                      {contacto.leido ? (
                        <>
                          <EyeOff className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-500">Leído</span>
                        </>
                      ) : (
                        <>
                          <Eye className="w-4 h-4 text-lion-gold" />
                          <span className="text-lion-gold font-medium">Nuevo</span>
                        </>
                      )}
                    </button>
                  </td>
                  <td className="text-sm text-gray-400">
                    {new Date(contacto.createdAt).toLocaleDateString('es-ES', {
                      day: '2-digit',
                      month: 'short',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </td>
                  <td className="font-medium text-lion-white">
                    {contacto.nombre}
                  </td>
                  <td className="text-sm text-gray-400">
                    {contacto.email}
                  </td>
                  <td className="text-sm text-gray-400">
                    {contacto.telefono}
                  </td>
                  <td>
                    <span className="text-xs bg-lion-black px-2 py-1 rounded text-gray-400">
                      {contacto.objetivo.replace(/_/g, ' ')}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => setSelectedContacto(contacto)}
                      className="text-lion-gold hover:text-yellow-500 transition-colors text-sm font-medium"
                    >
                      Ver detalles
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal de detalles */}
      {selectedContacto && (
        <div className="modal-overlay" onClick={() => setSelectedContacto(null)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-gray-800 flex items-center justify-between">
              <h2 className="text-2xl font-heading font-bold text-lion-gold">
                Detalles del Contacto
              </h2>
              <button
                onClick={() => setSelectedContacto(null)}
                className="text-gray-400 hover:text-lion-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Información personal */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-400 mb-1 block">Nombre</label>
                  <p className="text-lion-white font-medium">{selectedContacto.nombre}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-1 block">Fecha</label>
                  <p className="text-lion-white">
                    {new Date(selectedContacto.createdAt).toLocaleDateString('es-ES', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-400 mb-1 block flex items-center space-x-2">
                    <Mail className="w-4 h-4" />
                    <span>Email</span>
                  </label>
                  <a
                    href={`mailto:${selectedContacto.email}`}
                    className="text-lion-gold hover:text-yellow-500 transition-colors"
                  >
                    {selectedContacto.email}
                  </a>
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-1 block flex items-center space-x-2">
                    <Phone className="w-4 h-4" />
                    <span>Teléfono</span>
                  </label>
                  <a
                    href={`https://wa.me/${selectedContacto.telefono.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lion-gold hover:text-yellow-500 transition-colors flex items-center space-x-2"
                  >
                    <span>{selectedContacto.telefono}</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {selectedContacto.pais && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-400 mb-1 block flex items-center space-x-2">
                      <MapPin className="w-4 h-4" />
                      <span>País</span>
                    </label>
                    <p className="text-lion-white">{selectedContacto.pais}</p>
                  </div>
                  {selectedContacto.ciudad && (
                    <div>
                      <label className="text-sm text-gray-400 mb-1 block">Ciudad</label>
                      <p className="text-lion-white">{selectedContacto.ciudad}</p>
                    </div>
                  )}
                </div>
              )}

              <div>
                <label className="text-sm text-gray-400 mb-1 block">Objetivo</label>
                <span className="badge-gold">
                  {selectedContacto.objetivo.replace(/_/g, ' ')}
                </span>
              </div>

              <div>
                <label className="text-sm text-gray-400 mb-2 block">Mensaje</label>
                <div className="bg-lion-black border border-gray-800 rounded-lg p-4">
                  <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                    {selectedContacto.mensaje}
                  </p>
                </div>
              </div>

              {/* Acciones */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                <button
                  onClick={() => toggleLeido(selectedContacto.id, selectedContacto.leido)}
                  className="btn-outline-gold text-sm"
                >
                  {selectedContacto.leido ? 'Marcar como no leído' : 'Marcar como leído'}
                </button>

                <div className="flex items-center space-x-3">
                  <a
                    href={`https://wa.me/${selectedContacto.telefono.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-gold text-sm flex items-center space-x-2"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Contactar por WhatsApp</span>
                  </a>

                  <button
                    onClick={() => deleteContacto(selectedContacto.id)}
                    className="text-red-400 hover:text-red-300 transition-colors text-sm"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}