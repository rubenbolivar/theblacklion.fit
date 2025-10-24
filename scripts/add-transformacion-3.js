const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function addTransformacion3() {
  try {
    console.log('🦁 Agregando tercera transformación a Black Lion Empire...\n');

    // Verificar transformaciones actuales
    const currentCount = await prisma.transformacion.count();
    console.log(`📊 Transformaciones actuales: ${currentCount}\n`);

    // Crear la tercera transformación
    const transformacion3 = await prisma.transformacion.create({
      data: {
        nombreCliente: 'Cliente 3',
        edad: null,
        imagenAntes: '/transformaciones/transformacion-3-antes.jpg',
        imagenDespues: '/transformaciones/transformacion-3-despues.jpg',
        categoria: 'recomposicion',
        tiempoTransformacion: '6 meses',
        testimonial: 'Ganancia muscular y recomposición corporal. Los resultados hablan por sí mismos con Black Lion Empire.',
        visible: true,
        orden: 3
      }
    });

    console.log('✅ Transformación 3 creada:', transformacion3.nombreCliente);

    // Verificar total
    const newCount = await prisma.transformacion.count();
    console.log(`\n📊 Total de transformaciones: ${newCount}`);

    console.log('\n🎉 Tercera transformación agregada exitosamente!');
    console.log('\n📁 Asegúrate de que las imágenes estén en:');
    console.log('   public/transformaciones/transformacion-3-antes.jpg');
    console.log('   public/transformaciones/transformacion-3-despues.jpg');

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

addTransformacion3();
