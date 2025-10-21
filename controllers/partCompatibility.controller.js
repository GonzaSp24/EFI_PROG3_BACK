const { PartCompatibility, Part, DeviceModel } = require("../index")
const { partCompatibilitySchema } = require("../validators/inventory.validator")

// Get all part compatibilities
exports.getAllPartCompatibilities = async (req, res) => {
  try {
    const { part_id, device_model_id } = req.query

    const whereClause = {}
    if (part_id) whereClause.part_id = part_id
    if (device_model_id) whereClause.device_model_id = device_model_id

    const compatibilities = await PartCompatibility.findAll({
      where: whereClause,
      include: [
        { model: Part, as: "part" },
        { model: DeviceModel, as: "device_model", include: ["brand"] },
      ],
      order: [["id", "ASC"]],
    })

    res.json(compatibilities)
  } catch (error) {
    res.status(500).json({ message: "Error al obtener compatibilidades", error: error.message })
  }
}

// Get compatibility by ID
exports.getPartCompatibilityById = async (req, res) => {
  try {
    const compatibility = await PartCompatibility.findByPk(req.params.id, {
      include: [
        { model: Part, as: "part" },
        { model: DeviceModel, as: "device_model", include: ["brand"] },
      ],
    })

    if (!compatibility) {
      return res.status(404).json({ message: "Compatibilidad no encontrada" })
    }

    res.json(compatibility)
  } catch (error) {
    res.status(500).json({ message: "Error al obtener compatibilidad", error: error.message })
  }
}

// Create compatibility
exports.createPartCompatibility = async (req, res) => {
  try {
    const validatedData = partCompatibilitySchema.parse(req.body)
    const compatibility = await PartCompatibility.create(validatedData)
    res.status(201).json(compatibility)
  } catch (error) {
    if (error.name === "ZodError") {
      return res.status(400).json({ message: "Datos inválidos", errors: error.errors })
    }
    res.status(500).json({ message: "Error al crear compatibilidad", error: error.message })
  }
}

// Delete compatibility
exports.deletePartCompatibility = async (req, res) => {
  try {
    const compatibility = await PartCompatibility.findByPk(req.params.id)
    if (!compatibility) {
      return res.status(404).json({ message: "Compatibilidad no encontrada" })
    }

    await compatibility.destroy()
    res.json({ message: "Compatibilidad eliminada correctamente" })
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar compatibilidad", error: error.message })
  }
}
