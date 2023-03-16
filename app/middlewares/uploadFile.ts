import multer from 'multer';
const maxSize = 20 * 1024 * 1024;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './app/assets');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }

});

export const uploadFile = multer({
  storage: storage,
  limits: { fileSize: maxSize }
}).array("photo");


