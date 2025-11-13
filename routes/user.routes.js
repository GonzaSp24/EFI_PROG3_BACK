import express from "express"
const router = express.Router()
import { verifyToken, isAdmin } from "../middleware/auth.middleware.js"
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  toggleUserStatus,
  getUserProfile,
} from "../controllers/user.controller.js"

// All routes require authentication
router.use(verifyToken)

router.get("/profile", getUserProfile)

router.get("/", getAllUsers)
router.get("/:id", getUserById)

// Only admins can manage users
router.post("/", isAdmin, createUser)
router.put("/:id", isAdmin, updateUser)
router.delete("/:id", isAdmin, deleteUser)
router.patch("/:id/toggle-status", isAdmin, toggleUserStatus)

export default router
