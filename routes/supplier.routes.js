const express = require("express")
const router = express.Router()
const { verifyToken } = require("../middleware/auth.middleware")
const {
  getAllSuppliers,
  getSupplierById,
  createSupplier,
  updateSupplier,
  deleteSupplier,
} = require("../controllers/supplier.controller")

router.use(verifyToken)

router.get("/", getAllSuppliers)
router.get("/:id", getSupplierById)
router.post("/", createSupplier)
router.put("/:id", updateSupplier)
router.delete("/:id", deleteSupplier)

module.exports = router
