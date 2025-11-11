import Request from "../src/models/requests/Request.js"

// Get all solicitudes
export const getAllSolicitudes = async (req, res) => {
    try {
        const solicitudes = await Request.findAll({
            order: [["created_at", "DESC"]],
        })
        
        res.json(solicitudes)
    } catch (error) {
        res.status(500).json({ message: "Error al obtener solicitudes", error: error.message })
    }
}

// Get solicitud by ID
export const getSolicitudById = async (req, res) => {
    try {
        const solicitud = await Request.findByPk(req.params.id)
        
        if (!solicitud) {
            return res.status(404).json({ message: "Solicitud no encontrada" })
        }
        
        res.json(solicitud)
    } catch (error) {
        res.status(500).json({ message: "Error al obtener solicitud", error: error.message })
    }
}

// Create solicitud
export const createSolicitud = async (req, res) => {
    try {
        const { nombre, email, dispositivo, descripcion } = req.body
        const ip = req.ip || req.connection.remoteAddress
        const user_agent = req.get("user-agent")
        
        const solicitud = await Request.create({
            nombre,
            email,
            dispositivo,
            descripcion,
            ip,
            user_agent,
        })
        
        res.status(201).json(solicitud)
    } catch (error) {
        res.status(500).json({ message: "Error al crear solicitud", error: error.message })
    }
}

// Update solicitud
export const updateSolicitud = async (req, res) => {
    try {
        const solicitud = await Request.findByPk(req.params.id)
        
        if (!solicitud) {
            return res.status(404).json({ message: "Solicitud no encontrada" })
        }
        
        await solicitud.update(req.body)
        res.json(solicitud)
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar solicitud", error: error.message })
    }
}

// Delete solicitud (soft delete)
export const deleteSolicitud = async (req, res) => {
    try {
        const solicitud = await Request.findByPk(req.params.id)
        
        if (!solicitud) {
            return res.status(404).json({ message: "Solicitud no encontrada" })
        }
        
        await solicitud.destroy()
        res.json({ message: "Solicitud eliminada correctamente" })
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar solicitud", error: error.message })
    }
}
