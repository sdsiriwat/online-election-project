import express from 'express';
import multer from 'multer';
import { uploadFile } from '../services/UploadFileService';


const upload = multer({ storage: multer.memoryStorage() });
const router = express.Router();


router.post('/uploads', upload.single('file'), async (req: any, res: any) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).send('No file uploaded.');
    }

    const bucket = 'images';
    const filePath = `uploads/${file.originalname}`;
 
    await uploadFile(bucket, filePath, file);

    res.status(200).send('File uploaded successfully.');
  } catch (error) {
    res.status(500).send('Error uploading file.');
  }
});

export default router;