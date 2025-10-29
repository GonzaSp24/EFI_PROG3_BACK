import express from "express"
const router = express.Router()
import { verifyToken } from "../middleware/auth.middleware.js"
import {
  getAllSuppliers,
  getSupplierById,
  createSupplier,
  updateSupplier,
  deleteSupplier,
} from "../controllers/supplier.controller.js"

router.use(verifyToken)

router.get("/", getAllSuppliers)
router.get("/:id", getSupplierById)
router.post("/", createSupplier)
router.put("/:id", updateSupplier)
router.delete("/:id", deleteSupplier)

export default router
