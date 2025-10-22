const express = require("express")
const router = express.Router()
const { verifyToken, isAdmin } = require("../middleware/auth.middleware")
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  toggleUserStatus,
} = require("../controllers/user.controller")

// All routes require authentication
router.use(verifyToken)

router.get("/", getAllUsers)
router.get("/:id", getUserById)

// Only admins can manage users
router.post("/", isAdmin, createUser)
router.put("/:id", isAdmin, updateUser)
router.delete("/:id", isAdmin, deleteUser)
router.patch("/:id/toggle-status", isAdmin, toggleUserStatus)

module.exports = router
