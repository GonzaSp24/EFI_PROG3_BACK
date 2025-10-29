import express from "express"
const router = express.Router()
import { verifyToken } from "../middleware/auth.middleware.js"
import {
  getAllInvoices,
  getInvoiceById,
  createInvoice,
  updateInvoice,
  deleteInvoice,
} from "../controllers/invoice.controller.js"

router.use(verifyToken)

router.get("/", getAllInvoices)
router.get("/:id", getInvoiceById)
router.post("/", createInvoice)
router.put("/:id", updateInvoice)
router.delete("/:id", deleteInvoice)

export default router
