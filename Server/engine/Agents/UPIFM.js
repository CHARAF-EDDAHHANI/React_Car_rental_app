import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Create absolute path to avoid issues
const uploadDir = path.join(process.cwd(), 'engine', 'uploadedImages');

// Ensure directory exists
if (!fs.existsSync(uploadDir)) {
  console.log('this is UPFM upDir doesnt exist');
  //fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

export default upload;
