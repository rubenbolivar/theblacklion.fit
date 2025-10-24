const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function addTransformaciones() {
  console.log('🦁 Agregando transformaciones a Black Lion Empire...\n');

  const transformaciones = [
    {
      nombreCliente: 'Cliente 1',
      edad: null,
      imagenAntes: '/transformaciones/transformacion-1-antes.jpg',
      imagenDespues: '/transformaciones/transformacion-1-despues.jpg',
      categoria: 'perdida_peso',
      tiempoTransformacion: '3 meses',
      testimonial: 'Transformación increíble con Black Lion Empire. Los resultados hablan por sí mismos.',
      visible: true,
      orden: 1
    },
    {
      nombreCliente: 'Cliente 2',
      edad: null,
      imagenAntes: '/transformaciones/transformacion-2-antes.jpg',
      imagenDespues: '/transformaciones/transformacion-2-despues.jpg',
      categoria: 'ganancia_muscular',
      tiempoTransformacion: '4 meses',
      testimonial: 'Resultados excepcionales. El programa de Black Lion Empire realmente funciona.',
      visible: true,
      orden: 2
    }
  ];

  for (const transformacion of transformaciones) {
    const created = await prisma.transformacion.create({
      data: transformacion
    });
    console.log(`✅ Transformación creada: ${created.nombreCliente} (${created.categoria})`);
  }

  console.log('\n🎉 Transformaciones agregadas exitosamente!');
  console.log('\n📁 Coloca las imágenes en las siguientes ubicaciones:');
  console.log('   public/transformaciones/transformacion-1-antes.jpg');
  console.log('   public/transformaciones/transformacion-1-despues.jpg');
  console.log('   public/transformaciones/transformacion-2-antes.jpg');
  console.log('   public/transformaciones/transformacion-2-despues.jpg');
}

addTransformaciones()
  .catch((e) => {
    console.error('❌ Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });