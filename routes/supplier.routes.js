import express from "express"
const router = express.Router()
import { verifyToken } from "../middleware/auth.middleware.js"
import {
  getAllSuppliers,
  getSupplierById,
  createSupplier,
  updateSupplier,
  deleteSupplier,
} from "../controllers/supplier.controller.js"

router.use(verifyToken)

/**
 * @swagger
 * /api/suppliers:
 *   get:
 *     summary: Obtener todos los proveedores
 *     tags:
 *       - Suppliers
 *     responses:
 *       200:
 *         description: Lista de proveedores
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Supplier'
 */
router.get("/", getAllSuppliers)

/**
 * @swagger
 * /api/suppliers/{id}:
 *   get:
 *     summary: Obtener proveedor por ID
 *     tags:
 *       - Suppliers
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Proveedor encontrado
 */
router.get("/:id", getSupplierById)

/**
 * @swagger
 * /api/suppliers:
 *   post:
 *     summary: Crear nuevo proveedor
 *     tags:
 *       - Suppliers
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Supplier'
 *     responses:
 *       201:
 *         description: Proveedor creado
 */
router.post("/", createSupplier)

/**
 * @swagger
 * /api/suppliers/{id}:
 *   put:
 *     summary: Actualizar proveedor
 *     tags:
 *       - Suppliers
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
 *             $ref: '#/components/schemas/Supplier'
 *     responses:
 *       200:
 *         description: Proveedor actualizado
 */
router.put("/:id", updateSupplier)

/**
 * @swagger
 * /api/suppliers/{id}:
 *   delete:
 *     summary: Eliminar proveedor
 *     tags:
 *       - Suppliers
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Proveedor eliminado
 */
router.delete("/:id", deleteSupplier)

export default router
