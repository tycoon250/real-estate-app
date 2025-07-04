// /controllers/uploadController.js
import cloudinary from './cloudinary.controller.js';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

export const cloudinaryStorage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const folder =
      file.fieldname === 'displayImage'
        ? 'uploads/display-image'
        : file.fieldname === 'newImages' || file.fieldname === 'images'
        ? 'uploads/product-image'
        : 'uploads/other';

    return {
      folder,
      allowed_formats: ['jpg', 'jpeg', 'png', 'webp','pdf','docx'],
      public_id: `${file.fieldname}-${Date.now()}-${Math.round(Math.random() * 1e9)}`
    };
  }
});


export function extractPublicId(url) {
    const parts = url.split('/');
    const fileName = parts.pop();
    const folder = parts.slice(-2).join('/'); 
    const fileNameWithoutExt = fileName.replace(/\.[^/.]+$/, '');
    return `${folder}/${fileNameWithoutExt}`;
  }
  
