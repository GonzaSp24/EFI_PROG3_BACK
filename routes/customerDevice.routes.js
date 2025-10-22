const express = require("express")
const router = express.Router()
const { verifyToken } = require("../middleware/auth.middleware")
const {
  getAllCustomerDevices,
  getCustomerDeviceById,
  createCustomerDevice,
  updateCustomerDevice,
  deleteCustomerDevice,
} = require("../controllers/customerDevice.controller")

router.use(verifyToken)

router.get("/", getAllCustomerDevices)
router.get("/:id", getCustomerDeviceById)
router.post("/", createCustomerDevice)
router.put("/:id", updateCustomerDevice)
router.delete("/:id", deleteCustomerDevice)

module.exports = router
