import express from "express"
const router = express.Router()
import { verifyToken } from "../middleware/auth.middleware.js"
import {
  getAllInvoices,
  getInvoiceById,
  createInvoice,
  updateInvoice,
  deleteInvoice,
} from "../controllers/invoice.controller.js"

router.use(verifyToken)

/**
 * @swagger
 * /api/invoices:
 *   get:
 *     summary: Obtener todas las facturas
 *     tags:
 *       - Invoices
 *     responses:
 *       200:
 *         description: Lista de facturas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Invoice'
 */
router.get("/", getAllInvoices)

/**
 * @swagger
 * /api/invoices/{id}:
 *   get:
 *     summary: Obtener factura por ID
 *     tags:
 *       - Invoices
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Factura encontrada
 */
router.get("/:id", getInvoiceById)

/**
 * @swagger
 * /api/invoices:
 *   post:
 *     summary: Crear nueva factura
 *     tags:
 *       - Invoices
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               repairOrderId:
 *                 type: integer
 *               totalAmount:
 *                 type: number
 *               taxAmount:
 *                 type: number
 *               dueDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Factura creada
 */
router.post("/", createInvoice)

/**
 * @swagger
 * /api/invoices/{id}:
 *   put:
 *     summary: Actualizar factura
 *     tags:
 *       - Invoices
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
 *             $ref: '#/components/schemas/Invoice'
 *     responses:
 *       200:
 *         description: Factura actualizada
 */
router.put("/:id", updateInvoice)

/**
 * @swagger
 * /api/invoices/{id}:
 *   delete:
 *     summary: Eliminar factura
 *     tags:
 *       - Invoices
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Factura eliminada
 */
router.delete("/:id", deleteInvoice)

export default router
