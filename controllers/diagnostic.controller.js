import { Diagnostic, User, RepairOrder } from "../src/models/index.js"

// Get all diagnostics
export const getAllDiagnostics = async (req, res) => {
  try {
    const { order_id, tecnico_id, resultado } = req.query

    const whereClause = {}
    if (order_id) whereClause.order_id = order_id
    if (tecnico_id) whereClause.tecnico_id = tecnico_id
    if (resultado) whereClause.resultado = resultado

    const diagnostics = await Diagnostic.findAll({
      where: whereClause,
      include: [
        { model: RepairOrder, as: "order" },
        { model: User, as: "technician" },
      ],
      order: [["created_at", "DESC"]],
    })

    res.json(diagnostics)
  } catch (error) {
    res.status(500).json({ message: "Error al obtener diagnósticos", error: error.message })
  }
}

// Get diagnostic by ID
export const getDiagnosticById = async (req, res) => {
  try {
    const diagnostic = await Diagnostic.findByPk(req.params.id, {
      include: [
        { model: RepairOrder, as: "order" },
        { model: User, as: "technician" },
      ],
    })

    if (!diagnostic) {
      return res.status(404).json({ message: "Diagnóstico no encontrado" })
    }

    res.json(diagnostic)
  } catch (error) {
    res.status(500).json({ message: "Error al obtener diagnóstico", error: error.message })
  }
}

// Create diagnostic
export const createDiagnostic = async (req, res) => {
  try {
    const diagnostic = await Diagnostic.create(req.body)
    res.status(201).json(diagnostic)
  } catch (error) {
    res.status(500).json({ message: "Error al crear diagnóstico", error: error.message })
  }
}

// Update diagnostic
export const updateDiagnostic = async (req, res) => {
  try {
    const diagnostic = await Diagnostic.findByPk(req.params.id)

    if (!diagnostic) {
      return res.status(404).json({ message: "Diagnóstico no encontrado" })
    }

    await diagnostic.update(req.body)
    res.json(diagnostic)
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar diagnóstico", error: error.message })
  }
}

// Delete diagnostic
export const deleteDiagnostic = async (req, res) => {
  try {
    const diagnostic = await Diagnostic.findByPk(req.params.id)
    if (!diagnostic) {
      return res.status(404).json({ message: "Diagnóstico no encontrado" })
    }

    await diagnostic.destroy()
    res.json({ message: "Diagnóstico eliminado correctamente" })
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar diagnóstico", error: error.message })
  }
}
