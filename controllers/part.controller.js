const { Part, Supplier, PartCompatibility, DeviceModel, InventoryMovement } = require("../index")
const { partSchema } = require("../validators/inventory.validator")
const { Op } = require("sequelize")

// Get all parts with current stock
exports.getAllParts = async (req, res) => {
  try {
    const { search, compatible_tipo, supplier_id, low_stock } = req.query

    const whereClause = {}
    if (search) whereClause.nombre = { [Op.like]: `%${search}%` }
    if (compatible_tipo) whereClause.compatible_tipo = compatible_tipo
    if (supplier_id) whereClause.supplier_id = supplier_id

    const parts = await Part.findAll({
      where: whereClause,
      include: [
        { model: Supplier, as: "supplier" },
        {
          model: InventoryMovement,
          as: "movements",
          attributes: [],
        },
      ],
      attributes: {
        include: [
          [
            Part.sequelize.literal(`(
              SELECT COALESCE(SUM(
                CASE 
                  WHEN tipo = 'ingreso' THEN cantidad
                  WHEN tipo = 'egreso' THEN -cantidad
                  WHEN tipo = 'ajuste' THEN cantidad
                END
              ), 0)
              FROM inventory_movements
              WHERE inventory_movements.part_id = Part.id
            )`),
            "stock_actual",
          ],
        ],
      },
      order: [["nombre", "ASC"]],
      group: ["Part.id"],
    })

    // Filter by low stock if requested
    let filteredParts = parts
    if (low_stock === "true") {
      filteredParts = parts.filter((part) => {
        const stockActual = Number.parseInt(part.dataValues.stock_actual) || 0
        return stockActual <= part.stock_minimo
      })
    }

    res.json(filteredParts)
  } catch (error) {
    res.status(500).json({ message: "Error al obtener partes", error: error.message })
  }
}

// Get part by ID with compatibility and stock
exports.getPartById = async (req, res) => {
  try {
    const part = await Part.findByPk(req.params.id, {
      include: [
        { model: Supplier, as: "supplier" },
        {
          model: PartCompatibility,
          as: "compatibilities",
          include: [{ model: DeviceModel, as: "device_model", include: ["brand"] }],
        },
        {
          model: InventoryMovement,
          as: "movements",
          order: [["created_at", "DESC"]],
          limit: 10,
        },
      ],
      attributes: {
        include: [
          [
            Part.sequelize.literal(`(
              SELECT COALESCE(SUM(
                CASE 
                  WHEN tipo = 'ingreso' THEN cantidad
                  WHEN tipo = 'egreso' THEN -cantidad
                  WHEN tipo = 'ajuste' THEN cantidad
                END
              ), 0)
              FROM inventory_movements
              WHERE inventory_movements.part_id = Part.id
            )`),
            "stock_actual",
          ],
        ],
      },
    })

    if (!part) {
      return res.status(404).json({ message: "Parte no encontrada" })
    }

    res.json(part)
  } catch (error) {
    res.status(500).json({ message: "Error al obtener parte", error: error.message })
  }
}

// Create part
exports.createPart = async (req, res) => {
  try {
    const validatedData = partSchema.parse(req.body)
    const part = await Part.create(validatedData)
    res.status(201).json(part)
  } catch (error) {
    if (error.name === "ZodError") {
      return res.status(400).json({ message: "Datos inválidos", errors: error.errors })
    }
    res.status(500).json({ message: "Error al crear parte", error: error.message })
  }
}

// Update part
exports.updatePart = async (req, res) => {
  try {
    const validatedData = partSchema.partial().parse(req.body)
    const part = await Part.findByPk(req.params.id)

    if (!part) {
      return res.status(404).json({ message: "Parte no encontrada" })
    }

    await part.update(validatedData)
    res.json(part)
  } catch (error) {
    if (error.name === "ZodError") {
      return res.status(400).json({ message: "Datos inválidos", errors: error.errors })
    }
    res.status(500).json({ message: "Error al actualizar parte", error: error.message })
  }
}

// Delete part
exports.deletePart = async (req, res) => {
  try {
    const part = await Part.findByPk(req.params.id)
    if (!part) {
      return res.status(404).json({ message: "Parte no encontrada" })
    }

    await part.destroy()
    res.json({ message: "Parte eliminada correctamente" })
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar parte", error: error.message })
  }
}
