import express from "express"
const router = express.Router()
import { verifyToken } from "../middleware/auth.middleware.js"
import { getAllBrands, getBrandById, createBrand, updateBrand, deleteBrand } from "../controllers/brand.controller.js"

router.use(verifyToken)

/**
 * @swagger
 * /api/brands:
 *   get:
 *     summary: Obtener todas las marcas
 *     tags:
 *       - Brands
 *     responses:
 *       200:
 *         description: Lista de marcas obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Brand'
 *       401:
 *         description: No autorizado
 */
router.get("/", getAllBrands)

/**
 * @swagger
 * /api/brands/{id}:
 *   get:
 *     summary: Obtener marca por ID
 *     tags:
 *       - Brands
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Marca encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Brand'
 *       404:
 *         description: Marca no encontrada
 */
router.get("/:id", getBrandById)

/**
 * @swagger
 * /api/brands:
 *   post:
 *     summary: Crear nueva marca
 *     tags:
 *       - Brands
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Marca creada exitosamente
 *       400:
 *         description: Datos inválidos
 */
router.post("/", createBrand)

/**
 * @swagger
 * /api/brands/{id}:
 *   put:
 *     summary: Actualizar marca
 *     tags:
 *       - Brands
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
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Marca actualizada
 */
router.put("/:id", updateBrand)

/**
 * @swagger
 * /api/brands/{id}:
 *   delete:
 *     summary: Eliminar marca
 *     tags:
 *       - Brands
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Marca eliminada
 */
router.delete("/:id", deleteBrand)

export default router
