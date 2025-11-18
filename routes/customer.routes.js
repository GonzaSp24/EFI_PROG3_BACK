import express from "express"
const router = express.Router()
import { verifyToken } from "../middleware/auth.middleware.js"
import {
  getAllCustomers,
  getCustomerById,
  getCustomerWithOrders,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from "../controllers/customer.controller.js"

// All routes require authentication
router.use(verifyToken)

/**
 * @swagger
 * /api/customers:
 *   get:
 *     summary: Obtener todos los clientes
 *     tags:
 *       - Customers
 *     responses:
 *       200:
 *         description: Lista de clientes obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Customer'
 */
router.get("/", getAllCustomers)

/**
 * @swagger
 * /api/customers/{id}:
 *   get:
 *     summary: Obtener cliente por ID
 *     tags:
 *       - Customers
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Cliente encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Customer'
 */
router.get("/:id", getCustomerById)

/**
 * @swagger
 * /api/customers/{id}/orders:
 *   get:
 *     summary: Obtener cliente con todas sus órdenes de reparación
 *     tags:
 *       - Customers
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Cliente con órdenes encontrado
 */
router.get("/:id/orders", getCustomerWithOrders)

/**
 * @swagger
 * /api/customers:
 *   post:
 *     summary: Crear nuevo cliente
 *     tags:
 *       - Customers
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               address:
 *                 type: string
 *               city:
 *                 type: string
 *               state:
 *                 type: string
 *               zipCode:
 *                 type: string
 *     responses:
 *       201:
 *         description: Cliente creado exitosamente
 */
router.post("/", createCustomer)

/**
 * @swagger
 * /api/customers/{id}:
 *   put:
 *     summary: Actualizar cliente
 *     tags:
 *       - Customers
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
 *             $ref: '#/components/schemas/Customer'
 *     responses:
 *       200:
 *         description: Cliente actualizado
 */
router.put("/:id", updateCustomer)

/**
 * @swagger
 * /api/customers/{id}:
 *   delete:
 *     summary: Eliminar cliente
 *     tags:
 *       - Customers
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Cliente eliminado
 */
router.delete("/:id", deleteCustomer)

export default router
