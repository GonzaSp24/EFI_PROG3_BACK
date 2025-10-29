import express from "express"
const router = express.Router()
import { verifyToken, isAdmin } from "../middleware/auth.middleware.js"
import {
  getAllOrderStatuses,
  getOrderStatusById,
  createOrderStatus,
  updateOrderStatus,
  deleteOrderStatus,
} from "../controllers/orderStatus.controller.js"

// All routes require authentication
router.use(verifyToken)

router.get("/", getAllOrderStatuses)
router.get("/:id", getOrderStatusById)

// Only admins can create, update, or delete statuses
router.post("/", isAdmin, createOrderStatus)
router.put("/:id", isAdmin, updateOrderStatus)
router.delete("/:id", isAdmin, deleteOrderStatus)

export default router
