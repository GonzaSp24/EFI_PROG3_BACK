import express from "express"
const router = express.Router()
import { verifyToken } from "../middleware/auth.middleware.js"
import { getAllParts, getPartById, createPart, updatePart, deletePart } from "../controllers/part.controller.js"

router.use(verifyToken)

router.get("/", getAllParts)
router.get("/:id", getPartById)
router.post("/", createPart)
router.put("/:id", updatePart)
router.delete("/:id", deletePart)

export default router
