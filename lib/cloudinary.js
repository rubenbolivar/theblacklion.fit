import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;

/**
 * Sube una imagen a Cloudinary
 * @param {string} file - Base64 string o buffer de la imagen
 * @param {string} folder - Carpeta en Cloudinary
 * @returns {Promise<object>} - Resultado del upload
 */
export async function uploadImage(file, folder = 'black-lion-empire') {
  try {
    const result = await cloudinary.uploader.upload(file, {
      folder: folder,
      resource_type: 'auto',
      transformation: [
        { width: 1200, height: 1200, crop: 'limit' },
        { quality: 'auto:good' },
        { fetch_format: 'auto' }
      ]
    });
    return result;
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    throw error;
  }
}

/**
 * Elimina una imagen de Cloudinary
 * @param {string} publicId - Public ID de la imagen
 * @returns {Promise<object>} - Resultado de la eliminación
 */
export async function deleteImage(publicId) {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.error('Error deleting from Cloudinary:', error);
    throw error;
  }
}