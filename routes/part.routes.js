import express from "express"
const router = express.Router()
import { verifyToken } from "../middleware/auth.middleware.js"
import { getAllParts, getPartById, createPart, updatePart, deletePart } from "../controllers/part.controller.js"

router.use(verifyToken)

/**
 * @swagger
 * /api/parts:
 *   get:
 *     summary: Obtener todas las partes
 *     tags:
 *       - Parts
 *     responses:
 *       200:
 *         description: Lista de partes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Part'
 */
router.get("/", getAllParts)

/**
 * @swagger
 * /api/parts/{id}:
 *   get:
 *     summary: Obtener parte por ID
 *     tags:
 *       - Parts
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Parte encontrada
 */
router.get("/:id", getPartById)

/**
 * @swagger
 * /api/parts:
 *   post:
 *     summary: Crear nueva parte
 *     tags:
 *       - Parts
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               partNumber:
 *                 type: string
 *               description:
 *                 type: string
 *               cost:
 *                 type: number
 *               supplierId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Parte creada
 */
router.post("/", createPart)

/**
 * @swagger
 * /api/parts/{id}:
 *   put:
 *     summary: Actualizar parte
 *     tags:
 *       - Parts
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
 *             $ref: '#/components/schemas/Part'
 *     responses:
 *       200:
 *         description: Parte actualizada
 */
router.put("/:id", updatePart)

/**
 * @swagger
 * /api/parts/{id}:
 *   delete:
 *     summary: Eliminar parte
 *     tags:
 *       - Parts
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Parte eliminada
 */
router.delete("/:id", deletePart)

export default router
