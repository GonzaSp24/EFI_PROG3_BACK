const express = require("express")
const router = express.Router()
const { verifyToken } = require("../middleware/auth.middleware")
const {
  getAllCustomers,
  getCustomerById,
  getCustomerWithOrders,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} = require("../controllers/customer.controller")

// All routes require authentication
router.use(verifyToken)

router.get("/", getAllCustomers)
router.get("/:id", getCustomerById)
router.get("/:id/orders", getCustomerWithOrders) // Special endpoint to get customer with all repair orders
router.post("/", createCustomer)
router.put("/:id", updateCustomer)
router.delete("/:id", deleteCustomer)

module.exports = router
