const multer = require('multer');

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    // Define los tipos de archivos permitidos
    const allowedFileTypes = ['image/jpeg', 'image/png'];

    // Verifica si el tipo de archivo es permitido
    if (allowedFileTypes.includes(file.mimetype)) {
      // Acepta el archivo
      cb(null, true);
    } else {
      // Rechaza el archivo
      cb(new Error('Tipo de archivo no permitido'));
    }
  },
});

module.exports = { upload };
