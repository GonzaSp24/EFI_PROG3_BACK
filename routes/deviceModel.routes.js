const express = require("express")
const router = express.Router()
const { verifyToken } = require("../middleware/auth.middleware")
const {
  getAllDeviceModels,
  getDeviceModelById,
  createDeviceModel,
  updateDeviceModel,
  deleteDeviceModel,
} = require("../controllers/deviceModel.controller")

router.use(verifyToken)

router.get("/", getAllDeviceModels)
router.get("/:id", getDeviceModelById)
router.post("/", createDeviceModel)
router.put("/:id", updateDeviceModel)
router.delete("/:id", deleteDeviceModel)

module.exports = router
