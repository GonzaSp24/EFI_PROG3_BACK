const { Diagnostic, User, RepairOrder } = require("../index")
const { diagnosticSchema } = require("../validators/order.validator")

// Get all diagnostics
exports.getAllDiagnostics = async (req, res) => {
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
exports.getDiagnosticById = async (req, res) => {
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
exports.createDiagnostic = async (req, res) => {
  try {
    const validatedData = diagnosticSchema.parse(req.body)
    const diagnostic = await Diagnostic.create(validatedData)
    res.status(201).json(diagnostic)
  } catch (error) {
    if (error.name === "ZodError") {
      return res.status(400).json({ message: "Datos inválidos", errors: error.errors })
    }
    res.status(500).json({ message: "Error al crear diagnóstico", error: error.message })
  }
}

// Update diagnostic
exports.updateDiagnostic = async (req, res) => {
  try {
    const validatedData = diagnosticSchema.partial().parse(req.body)
    const diagnostic = await Diagnostic.findByPk(req.params.id)

    if (!diagnostic) {
      return res.status(404).json({ message: "Diagnóstico no encontrado" })
    }

    await diagnostic.update(validatedData)
    res.json(diagnostic)
  } catch (error) {
    if (error.name === "ZodError") {
      return res.status(400).json({ message: "Datos inválidos", errors: error.errors })
    }
    res.status(500).json({ message: "Error al actualizar diagnóstico", error: error.message })
  }
}

// Delete diagnostic
exports.deleteDiagnostic = async (req, res) => {
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
