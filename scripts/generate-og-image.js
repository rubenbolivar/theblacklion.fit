const sharp = require('sharp');
const path = require('path');

async function generateOGImage() {
  try {
    // Crear fondo negro de 1200x630 (dimensión estándar OG)
    const background = await sharp({
      create: {
        width: 1200,
        height: 630,
        channels: 4,
        background: { r: 13, g: 13, b: 13, alpha: 1 } // #0D0D0D (lion-black)
      }
    }).png().toBuffer();

    // Cargar el logo y redimensionarlo
    const logo = await sharp(path.join(__dirname, '../public/logo.png'))
      .resize(600, null, { // 600px de ancho, altura automática
        fit: 'inside',
        withoutEnlargement: true
      })
      .toBuffer();

    // Combinar fondo + logo centrado
    const finalImage = await sharp(background)
      .composite([{
        input: logo,
        gravity: 'center'
      }])
      .png()
      .toFile(path.join(__dirname, '../public/og-image.png'));

    console.log('✅ OG Image generated successfully:', finalImage);

    // Crear también la versión para Twitter (misma imagen)
    await sharp(path.join(__dirname, '../public/og-image.png'))
      .toFile(path.join(__dirname, '../public/twitter-image.png'));

    console.log('✅ Twitter Image generated successfully');
  } catch (error) {
    console.error('❌ Error generating OG image:', error);
  }
}

generateOGImage();
