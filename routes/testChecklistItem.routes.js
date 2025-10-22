const express = require("express")
const router = express.Router()
const { verifyToken } = require("../middleware/auth.middleware")
const {
  getAllTestChecklistItems,
  getTestChecklistItemById,
  createTestChecklistItem,
  updateTestChecklistItem,
  deleteTestChecklistItem,
} = require("../controllers/testChecklistItem.controller")

router.use(verifyToken)

router.get("/", getAllTestChecklistItems)
router.get("/:id", getTestChecklistItemById)
router.post("/", createTestChecklistItem)
router.put("/:id", updateTestChecklistItem)
router.delete("/:id", deleteTestChecklistItem)

module.exports = router
