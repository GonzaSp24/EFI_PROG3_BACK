const express = require("express")
const router = express.Router()
const { verifyToken } = require("../middleware/auth.middleware")
const {
  getAllPartCompatibilities,
  getPartCompatibilityById,
  createPartCompatibility,
  deletePartCompatibility,
} = require("../controllers/partCompatibility.controller")

router.use(verifyToken)

router.get("/", getAllPartCompatibilities)
router.get("/:id", getPartCompatibilityById)
router.post("/", createPartCompatibility)
router.delete("/:id", deletePartCompatibility)

module.exports = router
