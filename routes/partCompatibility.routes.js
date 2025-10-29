import express from "express"
const router = express.Router()
import { verifyToken } from "../middleware/auth.middleware.js"
import {
  getAllPartCompatibilities,
  getPartCompatibilityById,
  createPartCompatibility,
  deletePartCompatibility,
} from "../controllers/partCompatibility.controller.js"

router.use(verifyToken)

router.get("/", getAllPartCompatibilities)
router.get("/:id", getPartCompatibilityById)
router.post("/", createPartCompatibility)
router.delete("/:id", deletePartCompatibility)

export default router
