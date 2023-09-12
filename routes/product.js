import express from "express";
import { createProductController } from "../controllers/Products/createProduct.js";
const router = express.Router()
router.post("/", createProductController)
export default router;