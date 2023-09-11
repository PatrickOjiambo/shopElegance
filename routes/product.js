import express from "express";
import { createProductController } from "../controllers/createProduct";
const router = express.Router()
router.post("/", createProductController)
export default router;