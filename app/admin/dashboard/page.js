'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  CreditCard, 
  TrendingUp, 
  MessageSquare,
  Eye,
  EyeOff,
  ExternalLink
} from 'lucide-react';

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalContactos: 0,
    contactosNoLeidos: 0,
    totalPlanes: 0,
    totalTransformaciones: 0,
  });
  const [recentContactos, setRecentContactos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch contactos
      const contactosRes = await fetch('/api/contacto');
      const contactos = await contactosRes.json();
      
      // Fetch planes
      const planesRes = await fetch('/api/planes');
      const planes = await planesRes.json();
      
      // Fetch transformaciones
      const transformacionesRes = await fetch('/api/transformaciones');
      const transformaciones = await transformacionesRes.json();

      setStats({
        totalContactos: contactos.length,
        contactosNoLeidos: contactos.filter(c => !c.leido).length,
        totalPlanes: planes.length,
        totalTransformaciones: transformaciones.length,
      });

      // Últimos 5 contactos
      setRecentContactos(contactos.slice(0, 5));
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const statsCards = [
    {
      title: 'Total Contactos',
      value: stats.totalContactos,
      icon: MessageSquare,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500 bg-opacity-10',
      href: '/admin/contactos'
    },
    {
      title: 'Contactos Nuevos',
      value: stats.contactosNoLeidos,
      icon: Eye,
      color: 'text-green-400',
      bgColor: 'bg-green-500 bg-opacity-10',
      href: '/admin/contactos?filter=no-leidos'
    },
    {
      title: 'Planes Activos',
      value: stats.totalPlanes,
      icon: CreditCard,
      color: 'text-lion-gold',
      bgColor: 'bg-lion-gold bg-opacity-10',
      href: '/admin/planes'
    },
    {
      title: 'Transformaciones',
      value: stats.totalTransformaciones,
      icon: TrendingUp,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500 bg-opacity-10',
      href: '/admin/transformaciones'
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="spinner mx-auto mb-4" />
          <p className="text-gray-400">Cargando dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-heading font-bold text-lion-gold mb-2">
          Dashboard
        </h1>
        <p className="text-gray-400">
          Bienvenido al panel de administración de Black Lion Empire
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => (
          <motion.a
            key={stat.title}
            href={stat.href}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="block"
          >
            <div className={`${stat.bgColor} border border-gray-800 rounded-lg p-6 hover:border-lion-gold transition-all cursor-pointer group`}>
              <div className="flex items-center justify-between mb-4">
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
                <ExternalLink className="w-4 h-4 text-gray-600 group-hover:text-lion-gold transition-colors" />
              </div>
              <div className="text-3xl font-heading font-bold text-lion-white mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-400">
                {stat.title}
              </div>
            </div>
          </motion.a>
        ))}
      </div>

      {/* Recent Contactos */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
        className="bg-lion-gray border border-gray-800 rounded-lg overflow-hidden"
      >
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-heading font-bold text-lion-white">
              Últimos Contactos
            </h2>
            <a
              href="/admin/contactos"
              className="text-sm text-lion-gold hover:text-yellow-500 transition-colors"
            >
              Ver todos →
            </a>
          </div>
        </div>

        {recentContactos.length === 0 ? (
          <div className="p-8 text-center text-gray-400">
            No hay contactos aún
          </div>
        ) : (
          <div className="divide-y divide-gray-800">
            {recentContactos.map((contacto) => (
              <div
                key={contacto.id}
                className="p-6 hover:bg-lion-black transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-medium text-lion-white">
                        {contacto.nombre}
                      </h3>
                      {!contacto.leido && (
                        <span className="badge-gold text-xs">Nuevo</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-400 mb-2">
                      {contacto.email} • {contacto.telefono}
                    </p>
                    <p className="text-sm text-gray-500 line-clamp-2">
                      {contacto.mensaje}
                    </p>
                  </div>
                  <div className="text-right ml-4">
                    <p className="text-xs text-gray-500">
                      {new Date(contacto.createdAt).toLocaleDateString('es-ES', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <a
          href="/admin/transformaciones"
          className="bg-lion-gray border border-gray-800 rounded-lg p-6 hover:border-lion-gold transition-all group"
        >
          <TrendingUp className="w-8 h-8 text-lion-gold mb-4" />
          <h3 className="font-heading font-bold text-lion-white mb-2 group-hover:text-lion-gold transition-colors">
            Agregar Transformación
          </h3>
          <p className="text-sm text-gray-400">
            Sube nuevas fotos antes/después
          </p>
        </a>

        <a
          href="/admin/contactos"
          className="bg-lion-gray border border-gray-800 rounded-lg p-6 hover:border-lion-gold transition-all group"
        >
          <MessageSquare className="w-8 h-8 text-blue-400 mb-4" />
          <h3 className="font-heading font-bold text-lion-white mb-2 group-hover:text-lion-gold transition-colors">
            Ver Contactos
          </h3>
          <p className="text-sm text-gray-400">
            Revisa mensajes recibidos
          </p>
        </a>

        <a
          href="/admin/planes"
          className="bg-lion-gray border border-gray-800 rounded-lg p-6 hover:border-lion-gold transition-all group"
        >
          <CreditCard className="w-8 h-8 text-green-400 mb-4" />
          <h3 className="font-heading font-bold text-lion-white mb-2 group-hover:text-lion-gold transition-colors">
            Editar Planes
          </h3>
          <p className="text-sm text-gray-400">
            Actualiza precios y características
          </p>
        </a>
      </motion.div>
    </div>
  );
}