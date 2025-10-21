const { TestChecklistItem, RepairOrder } = require("../index")
const { testChecklistItemSchema } = require("../validators/order.validator")

// Get all test checklist items
exports.getAllTestChecklistItems = async (req, res) => {
  try {
    const { order_id } = req.query

    const whereClause = {}
    if (order_id) whereClause.order_id = order_id

    const items = await TestChecklistItem.findAll({
      where: whereClause,
      include: [{ model: RepairOrder, as: "order" }],
      order: [["id", "ASC"]],
    })

    res.json(items)
  } catch (error) {
    res.status(500).json({ message: "Error al obtener items de checklist", error: error.message })
  }
}

// Get test checklist item by ID
exports.getTestChecklistItemById = async (req, res) => {
  try {
    const item = await TestChecklistItem.findByPk(req.params.id, {
      include: [{ model: RepairOrder, as: "order" }],
    })

    if (!item) {
      return res.status(404).json({ message: "Item no encontrado" })
    }

    res.json(item)
  } catch (error) {
    res.status(500).json({ message: "Error al obtener item", error: error.message })
  }
}

// Create test checklist item
exports.createTestChecklistItem = async (req, res) => {
  try {
    const validatedData = testChecklistItemSchema.parse(req.body)
    const item = await TestChecklistItem.create(validatedData)
    res.status(201).json(item)
  } catch (error) {
    if (error.name === "ZodError") {
      return res.status(400).json({ message: "Datos inválidos", errors: error.errors })
    }
    res.status(500).json({ message: "Error al crear item", error: error.message })
  }
}

// Update test checklist item
exports.updateTestChecklistItem = async (req, res) => {
  try {
    const validatedData = testChecklistItemSchema.partial().parse(req.body)
    const item = await TestChecklistItem.findByPk(req.params.id)

    if (!item) {
      return res.status(404).json({ message: "Item no encontrado" })
    }

    await item.update(validatedData)
    res.json(item)
  } catch (error) {
    if (error.name === "ZodError") {
      return res.status(400).json({ message: "Datos inválidos", errors: error.errors })
    }
    res.status(500).json({ message: "Error al actualizar item", error: error.message })
  }
}

// Delete test checklist item
exports.deleteTestChecklistItem = async (req, res) => {
  try {
    const item = await TestChecklistItem.findByPk(req.params.id)
    if (!item) {
      return res.status(404).json({ message: "Item no encontrado" })
    }

    await item.destroy()
    res.json({ message: "Item eliminado correctamente" })
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar item", error: error.message })
  }
}
