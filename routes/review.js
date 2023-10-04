
import express from 'express';
import { createReviewController } from '../controllers/Reviews/createReviewController.js';
const router = express.Router();
router.post('/', createReviewController);
export default router;