import express from "express"
const router = express.Router()
import { verifyToken, isAdmin } from "../middleware/auth.middleware.js"
import { getAllRoles, getRoleById, createRole, updateRole, deleteRole } from "../controllers/role.controller.js"

// All routes require authentication
router.use(verifyToken)

/**
 * @swagger
 * /api/roles:
 *   get:
 *     summary: Obtener todos los roles
 *     tags:
 *       - Roles
 *     responses:
 *       200:
 *         description: Lista de roles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Role'
 */
router.get("/", getAllRoles)

/**
 * @swagger
 * /api/roles/{id}:
 *   get:
 *     summary: Obtener rol por ID
 *     tags:
 *       - Roles
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Rol encontrado
 */
router.get("/:id", getRoleById)

/**
 * @swagger
 * /api/roles:
 *   post:
 *     summary: Crear nuevo rol (Solo Admin)
 *     tags:
 *       - Roles
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Role'
 *     responses:
 *       201:
 *         description: Rol creado
 */
router.post("/", isAdmin, createRole)

/**
 * @swagger
 * /api/roles/{id}:
 *   put:
 *     summary: Actualizar rol (Solo Admin)
 *     tags:
 *       - Roles
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
 *             $ref: '#/components/schemas/Role'
 *     responses:
 *       200:
 *         description: Rol actualizado
 */
router.put("/:id", isAdmin, updateRole)

/**
 * @swagger
 * /api/roles/{id}:
 *   delete:
 *     summary: Eliminar rol (Solo Admin)
 *     tags:
 *       - Roles
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Rol eliminado
 */
router.delete("/:id", isAdmin, deleteRole)

export default router
