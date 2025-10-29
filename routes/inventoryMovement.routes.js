import express from "express"
const router = express.Router()
import { verifyToken } from "../middleware/auth.middleware.js"
import {
  getAllInventoryMovements,
  getInventoryMovementById,
  createInventoryMovement,
  updateInventoryMovement,
  deleteInventoryMovement,
} from "../controllers/inventoryMovement.controller.js"

router.use(verifyToken)

router.get("/", getAllInventoryMovements)
router.get("/:id", getInventoryMovementById)
router.post("/", createInventoryMovement)
router.put("/:id", updateInventoryMovement)
router.delete("/:id", deleteInventoryMovement)

export default router
