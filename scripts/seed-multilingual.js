const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('🌍 Starting multilingual seed...');

  // Buscar planes existentes
  const planes = await prisma.plan.findMany();

  if (planes.length === 0) {
    console.log('❌ No plans found in database. Please add plans first.');
    return;
  }

  console.log(`📦 Found ${planes.length} plans to update with multilingual content`);

  // Traducciones de ejemplo para los planes
  const traducciones = {
    'Plan Básico': {
      en: 'Basic Plan',
      pt: 'Plano Básico'
    },
    'Plan Élite': {
      en: 'Elite Plan',
      pt: 'Plano Elite'
    },
    'Plan Premium': {
      en: 'Premium Plan',
      pt: 'Plano Premium'
    }
  };

  // Actualizar cada plan con traducciones
  for (const plan of planes) {
    const traduccion = traducciones[plan.nombre];

    if (traduccion) {
      await prisma.plan.update({
        where: { id: plan.id },
        data: {
          nombre_en: traduccion.en,
          nombre_pt: traduccion.pt,
          descripcion_en: translateDescription(plan.descripcion, 'en'),
          descripcion_pt: translateDescription(plan.descripcion, 'pt'),
          caracteristicas_en: translateCaracteristicas(plan.caracteristicas, 'en'),
          caracteristicas_pt: translateCaracteristicas(plan.caracteristicas, 'pt'),
          terminosCondiciones_en: plan.terminosCondiciones ? translateTerms(plan.terminosCondiciones, 'en') : null,
          terminosCondiciones_pt: plan.terminosCondiciones ? translateTerms(plan.terminosCondiciones, 'pt') : null,
        }
      });
      console.log(`✅ Updated plan: ${plan.nombre}`);
    }
  }

  console.log('🎉 Multilingual seed completed!');
}

function translateDescription(desc, lang) {
  // Traducciones básicas de descripciones
  const translations = {
    en: {
      'Perfecto para comenzar tu transformación': 'Perfect to start your transformation',
      'La mejor opción para resultados serios': 'The best option for serious results',
      'Máximo nivel de coaching personalizado': 'Maximum level of personalized coaching'
    },
    pt: {
      'Perfecto para comenzar tu transformación': 'Perfeito para começar sua transformação',
      'La mejor opción para resultados serios': 'A melhor opção para resultados sérios',
      'Máximo nivel de coaching personalizado': 'Máximo nível de coaching personalizado'
    }
  };

  return translations[lang][desc] || desc;
}

function translateCaracteristicas(caracteristicasStr, lang) {
  try {
    const caracteristicas = JSON.parse(caracteristicasStr);
    const translations = {
      en: {
        'Plan de entrenamiento personalizado': 'Personalized training plan',
        'Plan nutricional adaptado': 'Adapted nutrition plan',
        'Seguimiento semanal': 'Weekly monitoring',
        'Seguimiento bisemanal': 'Bi-weekly monitoring',
        'Acceso a comunidad privada': 'Access to private community',
        'Soporte por WhatsApp': 'WhatsApp support',
        'Soporte prioritario 24/7': 'Priority 24/7 support',
        'Videollamadas mensuales': 'Monthly video calls',
        'Ajustes ilimitados': 'Unlimited adjustments'
      },
      pt: {
        'Plan de entrenamiento personalizado': 'Plano de treinamento personalizado',
        'Plan nutricional adaptado': 'Plano nutricional adaptado',
        'Seguimiento semanal': 'Acompanhamento semanal',
        'Seguimiento bisemanal': 'Acompanhamento quinzenal',
        'Acceso a comunidad privada': 'Acesso à comunidade privada',
        'Soporte por WhatsApp': 'Suporte por WhatsApp',
        'Soporte prioritario 24/7': 'Suporte prioritário 24/7',
        'Videollamadas mensuales': 'Videochamadas mensais',
        'Ajustes ilimitados': 'Ajustes ilimitados'
      }
    };

    const translated = caracteristicas.map(item => translations[lang][item] || item);
    return JSON.stringify(translated);
  } catch (e) {
    return caracteristicasStr;
  }
}

function translateTerms(terms, lang) {
  const translations = {
    en: {
      'Compromiso mínimo': 'Minimum commitment',
      'Renovación automática': 'Automatic renewal',
      'Cancelación con 15 días de anticipación': 'Cancellation with 15 days notice'
    },
    pt: {
      'Compromiso mínimo': 'Compromisso mínimo',
      'Renovación automática': 'Renovação automática',
      'Cancelación con 15 días de anticipación': 'Cancelamento com 15 dias de antecedência'
    }
  };

  let result = terms;
  for (const [es, translated] of Object.entries(translations[lang])) {
    result = result.replace(es, translated);
  }
  return result;
}

main()
  .catch((e) => {
    console.error('❌ Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
