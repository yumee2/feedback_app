import multer from 'multer';
import path from 'path';
import { mkdir } from 'fs/promises';

const uploadDir = path.join(__dirname, '../../../public/uploads');

(async () => {try {
    await mkdir(uploadDir, { recursive: true });
} catch (err) {
    console.error('Error creating upload directory:', err);
}})() // Проверям существует ли директория и если нет, мы ее создаем

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir); 
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

export default upload;