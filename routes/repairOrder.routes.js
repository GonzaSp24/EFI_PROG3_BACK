const express = require("express")
const router = express.Router()
const { verifyToken } = require("../middleware/auth.middleware")
const {
  getAllRepairOrders,
  getOrdersByCustomer,
  getRepairOrderById,
  createRepairOrder,
  updateRepairOrder,
  deleteRepairOrder,
  updateOrderStatus,
} = require("../controllers/repairOrder.controller")

router.use(verifyToken)

router.get("/", getAllRepairOrders)
router.get("/customer/:customerId", getOrdersByCustomer) // Special endpoint to get orders by customer
router.get("/:id", getRepairOrderById)
router.post("/", createRepairOrder)
router.put("/:id", updateRepairOrder)
router.delete("/:id", deleteRepairOrder)
router.patch("/:id/status", updateOrderStatus)

module.exports = router
