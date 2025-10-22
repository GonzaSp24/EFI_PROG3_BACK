const express = require("express")
const router = express.Router()
const { verifyToken } = require("../middleware/auth.middleware")
const {
  getAllInvoices,
  getInvoiceById,
  createInvoice,
  updateInvoice,
  deleteInvoice,
} = require("../controllers/invoice.controller")

router.use(verifyToken)

router.get("/", getAllInvoices)
router.get("/:id", getInvoiceById)
router.post("/", createInvoice)
router.put("/:id", updateInvoice)
router.delete("/:id", deleteInvoice)

module.exports = router
