const express = require("express")
const router = express.Router()
const { verifyToken } = require("../middleware/auth.middleware")
const {
  getAllPayments,
  getPaymentById,
  createPayment,
  updatePayment,
  deletePayment,
} = require("../controllers/payment.controller")

router.use(verifyToken)

router.get("/", getAllPayments)
router.get("/:id", getPaymentById)
router.post("/", createPayment)
router.put("/:id", updatePayment)
router.delete("/:id", deletePayment)

module.exports = router
