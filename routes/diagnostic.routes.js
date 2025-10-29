import express from "express"
const router = express.Router()
import { verifyToken } from "../middleware/auth.middleware.js"
import {
  getAllDiagnostics,
  getDiagnosticById,
  createDiagnostic,
  updateDiagnostic,
  deleteDiagnostic,
} from "../controllers/diagnostic.controller.js"

router.use(verifyToken)

router.get("/", getAllDiagnostics)
router.get("/:id", getDiagnosticById)
router.post("/", createDiagnostic)
router.put("/:id", updateDiagnostic)
router.delete("/:id", deleteDiagnostic)

export default router
