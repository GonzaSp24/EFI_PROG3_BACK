import express from "express"
const router = express.Router()
import { register, login, forgotPassword, resetPassword } from "../controllers/auth.controller.js"
import {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  validate,
} from "../validators/auth.validator.js"

router.post("/register", validate(registerSchema), register)
router.post("/login", validate(loginSchema), login)
router.post("/forgot-password", validate(forgotPasswordSchema), forgotPassword)
router.post("/reset-password", validate(resetPasswordSchema), resetPassword)

export default router
