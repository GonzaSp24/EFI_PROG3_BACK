import express from "express"
const router = express.Router()
import { verifyToken } from "../middleware/auth.middleware.js"
import {
  getAllRepairTasks,
  getRepairTaskById,
  createRepairTask,
  updateRepairTask,
  deleteRepairTask,
} from "../controllers/repairTask.controller.js"

router.use(verifyToken)

router.get("/", getAllRepairTasks)
router.get("/:id", getRepairTaskById)
router.post("/", createRepairTask)
router.put("/:id", updateRepairTask)
router.delete("/:id", deleteRepairTask)

export default router
