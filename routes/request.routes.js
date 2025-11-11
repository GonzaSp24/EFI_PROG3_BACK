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

// 🔹 Cualquiera puede crear una solicitud (sin token)
router.post("/", createSolicitud)

// 🔒 Desde acá, todas las demás rutas sí requieren autenticación
router.use(verifyToken)

router.get("/", getAllSolicitudes)
router.get("/:id", getSolicitudById)

// 🔐 Solo los administradores pueden modificar o eliminar
router.put("/:id", isAdmin, updateSolicitud)
router.delete("/:id", isAdmin, deleteSolicitud)

export default router
