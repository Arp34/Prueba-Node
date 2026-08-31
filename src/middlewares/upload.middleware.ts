// Multer middleware configuration for JSON file uploads
// Configuración del middleware Multer para la carga de archivos JSON
import multer from "multer";
import path from "path";

// Define disk storage engine for temporary JSON seed file uploads
// Define el motor de almacenamiento en disco para cargas temporales del archivo JSON del seeder
const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, "uploads/");
    },
    filename: (_req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
    }
});

export const uploadJson = multer({ storage });