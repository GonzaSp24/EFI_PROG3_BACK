import express from "express"
const router = express.Router()
import { verifyToken, isAdmin } from "../middleware/auth.middleware.js"
import {
  getAllPaymentMethods,
  getPaymentMethodById,
  createPaymentMethod,
  updatePaymentMethod,
  deletePaymentMethod,
} from "../controllers/paymentMethod.controller.js"

// All routes require authentication
router.use(verifyToken)

router.get("/", getAllPaymentMethods)
router.get("/:id", getPaymentMethodById)

// Only admins can create, update, or delete payment methods
router.post("/", isAdmin, createPaymentMethod)
router.put("/:id", isAdmin, updatePaymentMethod)
router.delete("/:id", isAdmin, deletePaymentMethod)

export default router
