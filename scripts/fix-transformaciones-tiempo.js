const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function fixTransformacionesTiempo() {
  try {
    console.log('🔧 Corrigiendo tiempos de transformaciones...\n');

    // Obtener las transformaciones actuales
    const transformaciones = await prisma.transformacion.findMany({
      orderBy: { orden: 'asc' },
      select: { id: true, nombreCliente: true, tiempoTransformacion: true, orden: true }
    });

    console.log('📊 Transformaciones actuales:');
    transformaciones.forEach(t => {
      console.log(`  ${t.orden}. ${t.nombreCliente} - ${t.tiempoTransformacion}`);
    });

    console.log('\n🔄 Aplicando correcciones...\n');

    // Actualizar Transformación 1: 3 meses → 4 meses
    const trans1 = transformaciones.find(t => t.orden === 1);
    if (trans1) {
      await prisma.transformacion.update({
        where: { id: trans1.id },
        data: { tiempoTransformacion: '4 meses' }
      });
      console.log(`✅ Transformación 1: ${trans1.tiempoTransformacion} → 4 meses`);
    }

    // Actualizar Transformación 2: 4 meses → 6 meses
    const trans2 = transformaciones.find(t => t.orden === 2);
    if (trans2) {
      await prisma.transformacion.update({
        where: { id: trans2.id },
        data: { tiempoTransformacion: '6 meses' }
      });
      console.log(`✅ Transformación 2: ${trans2.tiempoTransformacion} → 6 meses`);
    }

    // Transformación 3 ya está correcta (6 meses)
    const trans3 = transformaciones.find(t => t.orden === 3);
    if (trans3) {
      console.log(`✓  Transformación 3: ${trans3.tiempoTransformacion} (correcto)`);
    }

    console.log('\n📊 Transformaciones actualizadas:');
    const updated = await prisma.transformacion.findMany({
      orderBy: { orden: 'asc' },
      select: { nombreCliente: true, tiempoTransformacion: true, orden: true }
    });

    updated.forEach(t => {
      console.log(`  ${t.orden}. ${t.nombreCliente} - ${t.tiempoTransformacion}`);
    });

    console.log('\n🎉 Tiempos corregidos exitosamente!');

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

fixTransformacionesTiempo();
