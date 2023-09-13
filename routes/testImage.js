import express from 'express';
import { handleImageUpload, upload } from '../middleware/imageUpload.js';

const router = express.Router();
router.post('/', upload.single('image'), handleImageUpload);
export default router;
