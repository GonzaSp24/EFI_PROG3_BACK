import express from "express"
const router = express.Router()
import { verifyToken, isAdmin } from "../middleware/auth.middleware.js"
import { getAllRoles, getRoleById, createRole, updateRole, deleteRole } from "../controllers/role.controller.js"

// All routes require authentication
router.use(verifyToken)

router.get("/", getAllRoles)
router.get("/:id", getRoleById)

// Only admins can create, update, or delete roles
router.post("/", isAdmin, createRole)
router.put("/:id", isAdmin, updateRole)
router.delete("/:id", isAdmin, deleteRole)

export default router
