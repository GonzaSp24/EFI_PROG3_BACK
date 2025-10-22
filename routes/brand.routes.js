const express = require("express")
const router = express.Router()
const { verifyToken } = require("../middleware/auth.middleware")
const { getAllBrands, getBrandById, createBrand, updateBrand, deleteBrand } = require("../controllers/brand.controller")

router.use(verifyToken)

router.get("/", getAllBrands)
router.get("/:id", getBrandById)
router.post("/", createBrand)
router.put("/:id", updateBrand)
router.delete("/:id", deleteBrand)

module.exports = router
