const multer = require('multer');
const path = require('path');
const fs = require('fs');

const localUploadsDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(localUploadsDir)) {
  fs.mkdirSync(localUploadsDir, { recursive: true });
}

const localStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, localUploadsDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const localMulter = multer({ storage: localStorage });
let cloudinaryMulter = null;

// Clean check: exclude placeholder cloud names like 'LUMINA' or 'your_cloud_name'
const isCloudinaryActive = 
  process.env.CLOUDINARY_CLOUD_NAME && 
  process.env.CLOUDINARY_CLOUD_NAME.trim() !== '' && 
  process.env.CLOUDINARY_CLOUD_NAME.toUpperCase() !== 'LUMINA' && 
  process.env.CLOUDINARY_CLOUD_NAME.toLowerCase() !== 'your_cloud_name' &&
  process.env.CLOUDINARY_API_KEY && 
  process.env.CLOUDINARY_API_SECRET;

if (isCloudinaryActive) {
  try {
    const cloudinary = require('cloudinary').v2;
    const { CloudinaryStorage } = require('multer-storage-cloudinary');

    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET
    });

    const storage = new CloudinaryStorage({
      cloudinary: cloudinary,
      params: async (req, file) => {
        const isVideo = file.mimetype && file.mimetype.startsWith('video');
        return {
          folder: 'lumina_production',
          resource_type: isVideo ? 'video' : 'image',
          format: isVideo ? undefined : 'webp',
          transformation: isVideo ? undefined : [{ quality: '80' }]
        };
      }
    });

    cloudinaryMulter = multer({ storage: storage });
    console.log('\x1b[32m[Storage Connected] Cloudinary storage configured successfully.\x1b[0m');
  } catch (error) {
    console.warn(`\x1b[33m[Storage Warning] Cloudinary setup failed, falling back to local disk: ${error.message}\x1b[0m`);
  }
} else {
  console.log('\x1b[35m[Storage Notice] Cloudinary config is missing or placeholder ("LUMINA"). Using local disk storage.\x1b[0m');
}

// Create a bulletproof wrapper middleware that catches Cloudinary errors and falls back to local uploads
const dynamicUpload = {
  single: (fieldName) => {
    return (req, res, next) => {
      if (cloudinaryMulter) {
        cloudinaryMulter.single(fieldName)(req, res, (err) => {
          if (err) {
            console.warn(`\x1b[33m[Upload Fallback] Cloudinary upload failed (${err.message}). Retrying with local disk storage...\x1b[0m`);
            localMulter.single(fieldName)(req, res, next);
          } else {
            next();
          }
        });
      } else {
        localMulter.single(fieldName)(req, res, next);
      }
    };
  },
  fields: (fieldsArray) => {
    return (req, res, next) => {
      if (cloudinaryMulter) {
        cloudinaryMulter.fields(fieldsArray)(req, res, (err) => {
          if (err) {
            console.warn(`\x1b[33m[Upload Fallback] Cloudinary fields upload failed (${err.message}). Retrying with local disk storage...\x1b[0m`);
            localMulter.fields(fieldsArray)(req, res, next);
          } else {
            next();
          }
        });
      } else {
        localMulter.fields(fieldsArray)(req, res, next);
      }
    };
  }
};

module.exports = dynamicUpload;
