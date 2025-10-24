const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed de la base de datos...');

  // Crear usuario admin
  const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'admin123', 10);
  
  const admin = await prisma.usuario.upsert({
    where: { email: process.env.ADMIN_EMAIL || 'admin@blacklionempire.com' },
    update: {},
    create: {
      email: process.env.ADMIN_EMAIL || 'admin@blacklionempire.com',
      password: hashedPassword,
      nombre: 'Luis Rondón',
      role: 'admin',
    },
  });

  console.log('✅ Usuario admin creado:', admin.email);

  // Crear planes
  const planes = [
    {
      nombre: 'BÁSICO MENSUAL',
      precio: 100,
      duracionMeses: 1,
      descripcion: 'Plan perfecto para comenzar tu transformación',
      caracteristicas: JSON.stringify([
        'Plan de entrenamiento personalizado',
        'Plan nutricional según objetivo',
        'Asesoramiento de suplementación deportiva',
        'Control bisemanal con cambios (de ser necesarios)',
        'Contacto directo a través de WhatsApp'
      ]),
      destacado: false,
      activo: true,
      terminosCondiciones: 'No se admite el reembolso a no ser que sea por un motivo de causa mayor justificable.',
      orden: 1
    },
    {
      nombre: 'TRIMESTRAL',
      precio: 250,
      duracionMeses: 3,
      descripcion: 'Mejor valor - Ahorra $50 USD',
      caracteristicas: JSON.stringify([
        'Plan de entrenamiento personalizado',
        'Plan nutricional según objetivo',
        'Asesoramiento de suplementación deportiva',
        'Control bisemanal con cambios (de ser necesarios)',
        'Contacto directo a través de WhatsApp',
        'Ahorro de $50 USD comparado con el plan mensual'
      ]),
      destacado: true,
      activo: true,
      terminosCondiciones: 'No se admite el reembolso a no ser que sea por un motivo de causa mayor justificable.',
      orden: 2
    }
  ];

  for (const plan of planes) {
    const createdPlan = await prisma.plan.upsert({
      where: { id: plan.nombre },
      update: {},
      create: plan,
    });
    console.log('✅ Plan creado:', createdPlan.nombre);
  }

  // Crear configuraciones del sitio
  const configuraciones = [
    {
      clave: 'whatsapp_number',
      valor: process.env.WHATSAPP_NUMBER || '+123456789',
      descripcion: 'Número de WhatsApp para contacto'
    },
    {
      clave: 'instagram_url',
      valor: 'https://instagram.com/blacklionempire',
      descripcion: 'URL de Instagram'
    },
    {
      clave: 'facebook_url',
      valor: 'https://facebook.com/blacklionempire',
      descripcion: 'URL de Facebook'
    },
    {
      clave: 'youtube_url',
      valor: 'https://youtube.com/@blacklionempire',
      descripcion: 'URL de YouTube'
    },
    {
      clave: 'tiktok_url',
      valor: 'https://tiktok.com/@blacklionempire',
      descripcion: 'URL de TikTok'
    }
  ];

  for (const config of configuraciones) {
    const createdConfig = await prisma.configuracionSitio.upsert({
      where: { clave: config.clave },
      update: { valor: config.valor },
      create: config,
    });
    console.log('✅ Configuración creada:', createdConfig.clave);
  }

  console.log('🎉 Seed completado exitosamente!');
}

main()
  .catch((e) => {
    console.error('❌ Error en seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });