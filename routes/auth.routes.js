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


/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Registrar nuevo usuario
 *     tags:
 *       - Autenticación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - name
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: usuario@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: Password123!
 *               name:
 *                 type: string
 *                 example: Juan
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Datos inválidos
 *       409:
 *         description: El email ya está registrado
 */
router.post("/register", validate(registerSchema), register)

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Iniciar sesión
 *     tags:
 *       - Autenticación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: usuario@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: Password123!
 *     responses:
 *       200:
 *         description: Login exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 token:
 *                   type: string
 *                   description: JWT token
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       400:
 *         description: Credenciales inválidas
 *       404:
 *         description: Usuario no encontrado
 */
router.post("/login", validate(loginSchema), login)

/**
 * @swagger
 * /api/auth/forgot-password:
 *   post:
 *     summary: Solicitar restablecimiento de contraseña
 *     tags:
 *       - Autenticación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *     responses:
 *       200:
 *         description: Email de restablecimiento enviado
 *       404:
 *         description: Usuario no encontrado
 */
router.post("/forgot-password", validate(forgotPasswordSchema), forgotPassword)

/**
 * @swagger
 * /api/auth/reset-password:
 *   post:
 *     summary: Restablecer contraseña
 *     tags:
 *       - Autenticación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *               - password
 *             properties:
 *               token:
 *                 type: string
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: Contraseña restablecida exitosamente
 *       400:
 *         description: Token inválido o expirado
 */
router.post("/reset-password", validate(resetPasswordSchema), resetPassword)

export default router
