const { InventoryMovement, Part, RepairOrder } = require("../index")
const { inventoryMovementSchema } = require("../validators/inventory.validator")

// Get all inventory movements
exports.getAllInventoryMovements = async (req, res) => {
  try {
    const { part_id, tipo, referencia_order_id } = req.query

    const whereClause = {}
    if (part_id) whereClause.part_id = part_id
    if (tipo) whereClause.tipo = tipo
    if (referencia_order_id) whereClause.referencia_order_id = referencia_order_id

    const movements = await InventoryMovement.findAll({
      where: whereClause,
      include: [
        { model: Part, as: "part" },
        { model: RepairOrder, as: "order" },
      ],
      order: [["created_at", "DESC"]],
    })

    res.json(movements)
  } catch (error) {
    res.status(500).json({ message: "Error al obtener movimientos", error: error.message })
  }
}

// Get movement by ID
exports.getInventoryMovementById = async (req, res) => {
  try {
    const movement = await InventoryMovement.findByPk(req.params.id, {
      include: [
        { model: Part, as: "part" },
        { model: RepairOrder, as: "order" },
      ],
    })

    if (!movement) {
      return res.status(404).json({ message: "Movimiento no encontrado" })
    }

    res.json(movement)
  } catch (error) {
    res.status(500).json({ message: "Error al obtener movimiento", error: error.message })
  }
}

// Create inventory movement
exports.createInventoryMovement = async (req, res) => {
  try {
    const validatedData = inventoryMovementSchema.parse(req.body)
    const movement = await InventoryMovement.create(validatedData)
    res.status(201).json(movement)
  } catch (error) {
    if (error.name === "ZodError") {
      return res.status(400).json({ message: "Datos inválidos", errors: error.errors })
    }
    res.status(500).json({ message: "Error al crear movimiento", error: error.message })
  }
}

// Update inventory movement
exports.updateInventoryMovement = async (req, res) => {
  try {
    const validatedData = inventoryMovementSchema.partial().parse(req.body)
    const movement = await InventoryMovement.findByPk(req.params.id)

    if (!movement) {
      return res.status(404).json({ message: "Movimiento no encontrado" })
    }

    await movement.update(validatedData)
    res.json(movement)
  } catch (error) {
    if (error.name === "ZodError") {
      return res.status(400).json({ message: "Datos inválidos", errors: error.errors })
    }
    res.status(500).json({ message: "Error al actualizar movimiento", error: error.message })
  }
}

// Delete inventory movement
exports.deleteInventoryMovement = async (req, res) => {
  try {
    const movement = await InventoryMovement.findByPk(req.params.id)
    if (!movement) {
      return res.status(404).json({ message: "Movimiento no encontrado" })
    }

    await movement.destroy()
    res.json({ message: "Movimiento eliminado correctamente" })
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar movimiento", error: error.message })
  }
}
