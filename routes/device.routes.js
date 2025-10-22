const express = require("express")
const router = express.Router()
const { verifyToken } = require("../middleware/auth.middleware")
const {
  getAllDevices,
  getDeviceById,
  getDeviceWithHistory,
  createDevice,
  updateDevice,
  deleteDevice,
} = require("../controllers/device.controller")

router.use(verifyToken)

router.get("/", getAllDevices)
router.get("/:id", getDeviceById)
router.get("/:id/history", getDeviceWithHistory)
router.post("/", createDevice)
router.put("/:id", updateDevice)
router.delete("/:id", deleteDevice)

module.exports = router
