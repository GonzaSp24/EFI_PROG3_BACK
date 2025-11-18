import express from "express"
const router = express.Router()
import { verifyToken } from "../middleware/auth.middleware.js"
import {
  getAllRepairOrders,
  getOrdersByCustomer,
  getRepairOrderById,
  createRepairOrder,
  updateRepairOrder,
  deleteRepairOrder,
  updateOrderStatus,
} from "../controllers/repairOrder.controller.js"

router.use(verifyToken)

/**
 * @swagger
 * /api/repair-orders:
 *   get:
 *     summary: Obtener todas las órdenes de reparación
 *     tags:
 *       - Repair Orders
 *     responses:
 *       200:
 *         description: Lista de órdenes de reparación
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/RepairOrder'
 */
router.get("/", getAllRepairOrders)

/**
 * @swagger
 * /api/repair-orders/customer/{customerId}:
 *   get:
 *     summary: Obtener órdenes de reparación por cliente
 *     tags:
 *       - Repair Orders
 *     parameters:
 *       - name: customerId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Órdenes del cliente
 */
router.get("/customer/:customerId", getOrdersByCustomer)

/**
 * @swagger
 * /api/repair-orders/{id}:
 *   get:
 *     summary: Obtener orden de reparación por ID
 *     tags:
 *       - Repair Orders
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Orden encontrada
 */
router.get("/:id", getRepairOrderById)

/**
 * @swagger
 * /api/repair-orders:
 *   post:
 *     summary: Crear nueva orden de reparación
 *     tags:
 *       - Repair Orders
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customerId:
 *                 type: integer
 *               deviceId:
 *                 type: integer
 *               description:
 *                 type: string
 *               estimatedCost:
 *                 type: number
 *     responses:
 *       201:
 *         description: Orden creada
 */
router.post("/", createRepairOrder)

/**
 * @swagger
 * /api/repair-orders/{id}:
 *   put:
 *     summary: Actualizar orden de reparación
 *     tags:
 *       - Repair Orders
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
 *             $ref: '#/components/schemas/RepairOrder'
 *     responses:
 *       200:
 *         description: Orden actualizada
 */
router.put("/:id", updateRepairOrder)

/**
 * @swagger
 * /api/repair-orders/{id}:
 *   delete:
 *     summary: Eliminar orden de reparación
 *     tags:
 *       - Repair Orders
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Orden eliminada
 */
router.delete("/:id", deleteRepairOrder)

/**
 * @swagger
 * /api/repair-orders/{id}/status:
 *   patch:
 *     summary: Actualizar estado de orden de reparación
 *     tags:
 *       - Repair Orders
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
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: ['pending', 'in_progress', 'completed', 'cancelled']
 *     responses:
 *       200:
 *         description: Estado actualizado
 */
router.patch("/:id/status", updateOrderStatus)

export default router
