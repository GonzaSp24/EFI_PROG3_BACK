import express from "express"
const router = express.Router()
import { verifyToken } from "../middleware/auth.middleware.js"
import {
  getAllCustomerDevices,
  getCustomerDeviceById,
  createCustomerDevice,
  updateCustomerDevice,
  deleteCustomerDevice,
} from "../controllers/customerDevice.controller.js"

router.use(verifyToken)

router.get("/", getAllCustomerDevices)
router.get("/:id", getCustomerDeviceById)
router.post("/", createCustomerDevice)
router.put("/:id", updateCustomerDevice)
router.delete("/:id", deleteCustomerDevice)

export default router
