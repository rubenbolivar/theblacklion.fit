const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function removeDuplicatePlanes() {
  try {
    console.log('🔍 Buscando planes duplicados...\n');

    // IDs de los planes duplicados (los más recientes - segundo seed)
    const duplicateIds = [
      'cmh44uj6x0001rqrulg0dm3e2', // BÁSICO MENSUAL duplicado
      'cmh44uj8y0002rqru6rccezvf'  // TRIMESTRAL duplicado
    ];

    for (const id of duplicateIds) {
      const plan = await prisma.plan.findUnique({
        where: { id },
        select: { nombre: true }
      });

      await prisma.plan.delete({
        where: { id }
      });

      console.log(`✅ Eliminado plan duplicado: ${plan.nombre} (${id})`);
    }

    console.log('\n🎉 Planes duplicados eliminados exitosamente!');

    // Verificar cuántos quedan
    const count = await prisma.plan.count();
    const planes = await prisma.plan.findMany({
      select: { nombre: true, createdAt: true }
    });

    console.log(`\n📊 Total de planes: ${count}`);
    console.log('\nPlanes actuales:');
    planes.forEach(p => {
      console.log(`  - ${p.nombre} (creado: ${p.createdAt.toISOString()})`);
    });

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

removeDuplicatePlanes();
