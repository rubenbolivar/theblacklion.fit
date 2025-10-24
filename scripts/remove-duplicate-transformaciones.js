const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function removeDuplicates() {
  try {
    // IDs de las transformaciones duplicadas (las más recientes)
    const duplicateIds = [
      'cmh44util0000skdqpeczjsxo', // Cliente 1 duplicado
      'cmh44utit0001skdqa230w0oo'  // Cliente 2 duplicado
    ];

    for (const id of duplicateIds) {
      await prisma.transformacion.delete({
        where: { id }
      });
      console.log(`✅ Eliminada transformación duplicada: ${id}`);
    }

    console.log('\n🎉 Duplicados eliminados exitosamente!');

    // Verificar cuántas quedan
    const count = await prisma.transformacion.count();
    console.log(`📊 Total de transformaciones: ${count}`);

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

removeDuplicates();
