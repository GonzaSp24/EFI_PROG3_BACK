import express from "express"
const router = express.Router()
import { verifyToken } from "../middleware/auth.middleware.js"
import {
  getAllTestChecklistItems,
  getTestChecklistItemById,
  createTestChecklistItem,
  updateTestChecklistItem,
  deleteTestChecklistItem,
} from "../controllers/testChecklistItem.controller.js"

router.use(verifyToken)

router.get("/", getAllTestChecklistItems)
router.get("/:id", getTestChecklistItemById)
router.post("/", createTestChecklistItem)
router.put("/:id", updateTestChecklistItem)
router.delete("/:id", deleteTestChecklistItem)

export default router
