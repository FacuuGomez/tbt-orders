import multer from 'multer';
import path from 'path';

const storage = multer.memoryStorage(); // Almacenamiento en memoria para manejar archivos

const upload = multer({
	storage,
	limits: { fileSize: 5 * 1024 * 1024 }, // Límite de tamaño del archivo (5 MB)
	fileFilter: (req, file, cb) => {
		const ext = path.extname(file.originalname);
		if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
			return cb(new Error('Solo se permiten imágenes PNG y JPG') as any, false); // Cast a 'any'
		}
		cb(null, true);
	},
});

export default upload;
