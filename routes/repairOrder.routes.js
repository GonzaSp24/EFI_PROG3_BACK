import express from "express"
const router = express.Router()
import { verifyToken } from "../middleware/auth.middleware.js"
import {
  getAllRepairOrders,
  getOrdersByCustomer,
  getRepairOrderById,
  createRepairOrder,
  updateRepairOrder,
  deleteRepairOrder,
  updateOrderStatus,
} from "../controllers/repairOrder.controller.js"

router.use(verifyToken)

router.get("/", getAllRepairOrders)
router.get("/customer/:customerId", getOrdersByCustomer) // Special endpoint to get orders by customer
router.get("/:id", getRepairOrderById)
router.post("/", createRepairOrder)
router.put("/:id", updateRepairOrder)
router.delete("/:id", deleteRepairOrder)
router.patch("/:id/status", updateOrderStatus)

export default router
