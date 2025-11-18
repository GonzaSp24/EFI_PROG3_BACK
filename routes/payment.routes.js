import express from "express"
const router = express.Router()
import { verifyToken } from "../middleware/auth.middleware.js"
import {
  getAllPayments,
  getPaymentById,
  createPayment,
  updatePayment,
  deletePayment,
} from "../controllers/payment.controller.js"

router.use(verifyToken)

/**
 * @swagger
 * /api/payments:
 *   get:
 *     summary: Obtener todos los pagos
 *     tags:
 *       - Payments
 *     responses:
 *       200:
 *         description: Lista de pagos
 */
router.get("/", getAllPayments)

/**
 * @swagger
 * /api/payments/{id}:
 *   get:
 *     summary: Obtener pago por ID
 *     tags:
 *       - Payments
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Pago encontrado
 */
router.get("/:id", getPaymentById)

/**
 * @swagger
 * /api/payments:
 *   post:
 *     summary: Crear nuevo pago
 *     tags:
 *       - Payments
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Payment'
 *     responses:
 *       201:
 *         description: Pago creado
 */
router.post("/", createPayment)

/**
 * @swagger
 * /api/payments/{id}:
 *   put:
 *     summary: Actualizar pago
 *     tags:
 *       - Payments
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Payment'
 *     responses:
 *       200:
 *         description: Pago actualizado
 */
router.put("/:id", updatePayment)

/**
 * @swagger
 * /api/payments/{id}:
 *   delete:
 *     summary: Eliminar pago
 *     tags:
 *       - Payments
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Pago eliminado
 */
router.delete("/:id", deletePayment)

export default router
