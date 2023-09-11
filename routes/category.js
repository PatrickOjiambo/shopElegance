import express from "express"
import { createCategoryController } from "../controllers/createCategory"
const router = express.Router()
router.post('/', createCategoryController)
export default router;