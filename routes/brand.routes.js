import express from "express"
const router = express.Router()
import { verifyToken } from "../middleware/auth.middleware.js"
import { getAllBrands, getBrandById, createBrand, updateBrand, deleteBrand } from "../controllers/brand.controller.js"

router.use(verifyToken)

router.get("/", getAllBrands)
router.get("/:id", getBrandById)
router.post("/", createBrand)
router.put("/:id", updateBrand)
router.delete("/:id", deleteBrand)

export default router
