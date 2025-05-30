const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Cloudinary storage
const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'posted-images',
        allowed_formats: ['jpg', 'jpeg', 'png','webp'],
    },
});

// File filter for MIME type
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png','image/webp'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Only JPEG, JPG and PNG images are allowed.'), false);
    }
};

// Multer upload with limits
const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 2 * 1024 * 1024 }
});

module.exports = { cloudinary, upload };