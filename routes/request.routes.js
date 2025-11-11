import express from "express"
const router = express.Router()

import { verifyToken, isAdmin } from "../middleware/auth.middleware.js"
import {
  getAllSolicitudes,
  getSolicitudById,
  createSolicitud,
  updateSolicitud,
  deleteSolicitud,
} from "../controllers/solicitud.controller.js"

// Todas las rutas requieren autenticación
router.use(verifyToken)

router.get("/", getAllSolicitudes)
router.get("/:id", getSolicitudById)

// Solo los administradores pueden crear, actualizar o eliminar
router.post("/", isAdmin, createSolicitud)
router.put("/:id", isAdmin, updateSolicitud)
router.delete("/:id", isAdmin, deleteSolicitud)

export default router
