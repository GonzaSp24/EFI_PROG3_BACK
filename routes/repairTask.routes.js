const express = require("express")
const router = express.Router()
const { verifyToken } = require("../middleware/auth.middleware")
const {
  getAllRepairTasks,
  getRepairTaskById,
  createRepairTask,
  updateRepairTask,
  deleteRepairTask,
} = require("../controllers/repairTask.controller")

router.use(verifyToken)

router.get("/", getAllRepairTasks)
router.get("/:id", getRepairTaskById)
router.post("/", createRepairTask)
router.put("/:id", updateRepairTask)
router.delete("/:id", deleteRepairTask)

module.exports = router
