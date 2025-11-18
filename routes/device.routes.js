import express from "express"
const router = express.Router()
import { verifyToken } from "../middleware/auth.middleware.js"
import {
  getAllDevices,
  getDeviceById,
  getDeviceWithHistory,
  createDevice,
  updateDevice,
  deleteDevice,
} from "../controllers/device.controller.js"

router.use(verifyToken)

/**
 * @swagger
 * /api/devices:
 *   get:
 *     summary: Obtener todos los dispositivos
 *     tags:
 *       - Devices
 *     responses:
 *       200:
 *         description: Lista de dispositivos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Device'
 */
router.get("/", getAllDevices)

/**
 * @swagger
 * /api/devices/{id}:
 *   get:
 *     summary: Obtener dispositivo por ID
 *     tags:
 *       - Devices
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Dispositivo encontrado
 */
router.get("/:id", getDeviceById)

/**
 * @swagger
 * /api/devices/{id}/history:
 *   get:
 *     summary: Obtener dispositivo con historial de reparaciones
 *     tags:
 *       - Devices
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Dispositivo con historial
 */
router.get("/:id/history", getDeviceWithHistory)

/**
 * @swagger
 * /api/devices:
 *   post:
 *     summary: Crear nuevo dispositivo
 *     tags:
 *       - Devices
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               serialNumber:
 *                 type: string
 *               modelId:
 *                 type: integer
 *               brandId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Dispositivo creado
 */
router.post("/", createDevice)

/**
 * @swagger
 * /api/devices/{id}:
 *   put:
 *     summary: Actualizar dispositivo
 *     tags:
 *       - Devices
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
 *             $ref: '#/components/schemas/Device'
 *     responses:
 *       200:
 *         description: Dispositivo actualizado
 */
router.put("/:id", updateDevice)

/**
 * @swagger
 * /api/devices/{id}:
 *   delete:
 *     summary: Eliminar dispositivo
 *     tags:
 *       - Devices
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Dispositivo eliminado
 */
router.delete("/:id", deleteDevice)

export default router
