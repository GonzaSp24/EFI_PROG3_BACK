const express = require("express")
const router = express.Router()
const { verifyToken, isAdmin } = require("../middleware/auth.middleware")
const { getAllRoles, getRoleById, createRole, updateRole, deleteRole } = require("../controllers/role.controller")

// All routes require authentication
router.use(verifyToken)

router.get("/", getAllRoles)
router.get("/:id", getRoleById)

// Only admins can create, update, or delete roles
router.post("/", isAdmin, createRole)
router.put("/:id", isAdmin, updateRole)
router.delete("/:id", isAdmin, deleteRole)

module.exports = router
