import express from "express"
const router = express.Router()
import { verifyToken } from "../middleware/auth.middleware.js"
import {
  getAllDeviceModels,
  getDeviceModelById,
  createDeviceModel,
  updateDeviceModel,
  deleteDeviceModel,
} from "../controllers/deviceModel.controller.js"

router.use(verifyToken)

router.get("/", getAllDeviceModels)
router.get("/:id", getDeviceModelById)
router.post("/", createDeviceModel)
router.put("/:id", updateDeviceModel)
router.delete("/:id", deleteDeviceModel)

export default router
