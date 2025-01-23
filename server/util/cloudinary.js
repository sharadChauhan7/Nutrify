// Import cloudinary v2
import {v2 as cloudinary} from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import dotenv from 'dotenv';

dotenv.config();

// cloudinary config
cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET, 
  });

  const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'Meal_Image',
      allowerdFormat:['jpg,png,jpeg'], // supports promises as well
      public_id: (req, file) => {
        return `image-${Date.now()}`;
      },
    },
  });
export {cloudinary,storage};