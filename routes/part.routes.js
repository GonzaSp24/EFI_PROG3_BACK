const express = require("express")
const router = express.Router()
const { verifyToken } = require("../middleware/auth.middleware")
const { getAllParts, getPartById, createPart, updatePart, deletePart } = require("../controllers/part.controller")

router.use(verifyToken)

router.get("/", getAllParts)
router.get("/:id", getPartById)
router.post("/", createPart)
router.put("/:id", updatePart)
router.delete("/:id", deletePart)

module.exports = router
