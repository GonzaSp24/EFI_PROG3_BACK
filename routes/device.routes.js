import express from "express"
const router = express.Router()
import { verifyToken } from "../middleware/auth.middleware.js"
import {
  getAllDevices,
  getDeviceById,
  getDeviceWithHistory,
  createDevice,
  updateDevice,
  deleteDevice,
} from "../controllers/device.controller.js"

router.use(verifyToken)

router.get("/", getAllDevices)
router.get("/:id", getDeviceById)
router.get("/:id/history", getDeviceWithHistory)
router.post("/", createDevice)
router.put("/:id", updateDevice)
router.delete("/:id", deleteDevice)

export default router
