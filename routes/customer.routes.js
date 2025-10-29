import express from "express"
const router = express.Router()
import { verifyToken } from "../middleware/auth.middleware.js"
import {
  getAllCustomers,
  getCustomerById,
  getCustomerWithOrders,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from "../controllers/customer.controller.js"

// All routes require authentication
router.use(verifyToken)

router.get("/", getAllCustomers)
router.get("/:id", getCustomerById)
router.get("/:id/orders", getCustomerWithOrders) // Special endpoint to get customer with all repair orders
router.post("/", createCustomer)
router.put("/:id", updateCustomer)
router.delete("/:id", deleteCustomer)

export default router
