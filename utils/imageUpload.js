const multer = require('multer');
const IMAGE_MAX_SIZE = require('../backendConfig');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/uploads');
  },
  filename: (req, file, cb) => {
    const [name, ext] = file.originalname.split('.');
    cb(null, `${name}-${Date.now()}.${ext}`);
  },
});

const imageUpload = multer({ storage, limits: { fileSize: IMAGE_MAX_SIZE } });

module.exports = imageUpload;
