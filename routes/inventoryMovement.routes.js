const express = require("express")
const router = express.Router()
const { verifyToken } = require("../middleware/auth.middleware")
const {
  getAllInventoryMovements,
  getInventoryMovementById,
  createInventoryMovement,
  updateInventoryMovement,
  deleteInventoryMovement,
} = require("../controllers/inventoryMovement.controller")

router.use(verifyToken)

router.get("/", getAllInventoryMovements)
router.get("/:id", getInventoryMovementById)
router.post("/", createInventoryMovement)
router.put("/:id", updateInventoryMovement)
router.delete("/:id", deleteInventoryMovement)

module.exports = router
