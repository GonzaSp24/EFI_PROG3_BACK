import express from "express"
const router = express.Router()
import { verifyToken } from "../middleware/auth.middleware.js"
import { getAllQuotes, getQuoteById, createQuote, updateQuote, deleteQuote } from "../controllers/quote.controller.js"

router.use(verifyToken)

/**
 * @swagger
 * /api/quotes:
 *   get:
 *     summary: Obtener todas las cotizaciones
 *     tags:
 *       - Quotes
 *     responses:
 *       200:
 *         description: Lista de cotizaciones
 */
router.get("/", getAllQuotes)

/**
 * @swagger
 * /api/quotes/{id}:
 *   get:
 *     summary: Obtener cotización por ID
 *     tags:
 *       - Quotes
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Cotización encontrada
 */
router.get("/:id", getQuoteById)

/**
 * @swagger
 * /api/quotes:
 *   post:
 *     summary: Crear nueva cotización
 *     tags:
 *       - Quotes
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Quote'
 *     responses:
 *       201:
 *         description: Cotización creada
 */
router.post("/", createQuote)

/**
 * @swagger
 * /api/quotes/{id}:
 *   put:
 *     summary: Actualizar cotización
 *     tags:
 *       - Quotes
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
 *             $ref: '#/components/schemas/Quote'
 *     responses:
 *       200:
 *         description: Cotización actualizada
 */
router.put("/:id", updateQuote)

/**
 * @swagger
 * /api/quotes/{id}:
 *   delete:
 *     summary: Eliminar cotización
 *     tags:
 *       - Quotes
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Cotización eliminada
 */
router.delete("/:id", deleteQuote)

export default router
