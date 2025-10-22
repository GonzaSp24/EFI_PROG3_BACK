const express = require("express")
const router = express.Router()
const { verifyToken, isAdmin } = require("../middleware/auth.middleware")
const {
  getAllOrderStatuses,
  getOrderStatusById,
  createOrderStatus,
  updateOrderStatus,
  deleteOrderStatus,
} = require("../controllers/orderStatus.controller")

// All routes require authentication
router.use(verifyToken)

router.get("/", getAllOrderStatuses)
router.get("/:id", getOrderStatusById)

// Only admins can create, update, or delete statuses
router.post("/", isAdmin, createOrderStatus)
router.put("/:id", isAdmin, updateOrderStatus)
router.delete("/:id", isAdmin, deleteOrderStatus)

module.exports = router
