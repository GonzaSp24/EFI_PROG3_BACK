const express = require("express")
const router = express.Router()
const { verifyToken } = require("../middleware/auth.middleware")
const {
  getAllOrderHistory,
  getOrderHistoryById,
  createOrderHistory,
} = require("../controllers/orderHistory.controller")

router.use(verifyToken)

router.get("/", getAllOrderHistory)
router.get("/:id", getOrderHistoryById)
router.post("/", createOrderHistory)

module.exports = router
