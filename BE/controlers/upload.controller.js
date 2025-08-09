// /controllers/uploadController.js

import multer from 'multer';
import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import multerS3 from "multer-s3";
import path from 'path';
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  endpoint: `https://s3.${process.env.AWS_REGION}.amazonaws.com`,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});
export const multerUpload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      const folder =
        file.fieldname === 'displayImage'
          ? 'uploads/display-image'
          : file.fieldname === 'newImages' || file.fieldname === 'images'
          ? 'uploads/product-image'
          : 'uploads/other';

      const base = path.parse(file.originalname).name.replace(/\s+/g, '_');
      const ext = path.extname(file.originalname).toLowerCase();
      const fileName = `${file.fieldname}-${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
      const key = `${folder}/${fileName}`;

      cb(null, key);
    }
  }),
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|webp|pdf|docx/;
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = fileTypes.test(file.mimetype);

    if (extName && mimeType) {
      return cb(null, true);
    } else {
      return cb(new Error("Only images, PDFs, and DOCX files are allowed!"));
    }
  },
});
export function extractPublicId(url) {
    const parts = url.split('/');
    const fileName = parts.pop();
    const folder = parts.slice(-2).join('/'); 
    const fileNameWithoutExt = fileName.replace(/\.[^/.]+$/, '');
    return `${folder}/${fileNameWithoutExt}`;
  }
  export let uploads = async (req, res) => {
    const key = `${req.params[0]}`;
    try {
      let data = await getAWSS3File(key)
      const { Body, ContentType, ContentLength } = data
      // Set the headers for the response
      res.set({
        'Content-Type': ContentType,
        'Content-Length': ContentLength,
      });
      Body.pipe(res);
    }catch (error) {
      console.error(error);
      res.status(500).send({message: 'internal server error'});
    }
  };  
  export async function getAWSS3File(filename) {
    try {
      const params = {
        Bucket: process.env.AWS_BUCKET_NAME, 
        Key: `uploads/${filename}`,
      };
      const data = await s3.send(new GetObjectCommand(params));
      return data
    } catch (error) {
      throw error
    }
    
  }