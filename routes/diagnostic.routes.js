const express = require("express")
const router = express.Router()
const { verifyToken } = require("../middleware/auth.middleware")
const {
  getAllDiagnostics,
  getDiagnosticById,
  createDiagnostic,
  updateDiagnostic,
  deleteDiagnostic,
} = require("../controllers/diagnostic.controller")

router.use(verifyToken)

router.get("/", getAllDiagnostics)
router.get("/:id", getDiagnosticById)
router.post("/", createDiagnostic)
router.put("/:id", updateDiagnostic)
router.delete("/:id", deleteDiagnostic)

module.exports = router
