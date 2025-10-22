const express = require("express")
const router = express.Router()
const { register, login, forgotPassword, resetPassword } = require("../controllers/auth.controller")
const {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  validate,
} = require("../validators/auth.validator")

router.post("/register", validate(registerSchema), register)
router.post("/login", validate(loginSchema), login)
router.post("/forgot-password", validate(forgotPasswordSchema), forgotPassword)
router.post("/reset-password", validate(resetPasswordSchema), resetPassword)

module.exports = router
