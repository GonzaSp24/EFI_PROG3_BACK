const express = require("express")
const router = express.Router()
const { verifyToken, isAdmin } = require("../middleware/auth.middleware")
const {
  getAllPaymentMethods,
  getPaymentMethodById,
  createPaymentMethod,
  updatePaymentMethod,
  deletePaymentMethod,
} = require("../controllers/paymentMethod.controller")

// All routes require authentication
router.use(verifyToken)

router.get("/", getAllPaymentMethods)
router.get("/:id", getPaymentMethodById)

// Only admins can create, update, or delete payment methods
router.post("/", isAdmin, createPaymentMethod)
router.put("/:id", isAdmin, updatePaymentMethod)
router.delete("/:id", isAdmin, deletePaymentMethod)

module.exports = router
