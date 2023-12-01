import express from 'express';
import { getProductController } from '../controllers/getProduct.js';
import { getOneProductController } from '../controllers/getProduct.js';
const router = express.Router();
router.get('/', getProductController)
router.get('/:id', getOneProductController)
export default router;
