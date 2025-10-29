import { InventoryMovement, Part, RepairOrder } from "../src/models/index.js"

// Get all inventory movements
export const getAllInventoryMovements = async (req, res) => {
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
export const getInventoryMovementById = async (req, res) => {
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
export const createInventoryMovement = async (req, res) => {
  try {
    const movement = await InventoryMovement.create(req.body)
    res.status(201).json(movement)
  } catch (error) {
    res.status(500).json({ message: "Error al crear movimiento", error: error.message })
  }
}

// Update inventory movement
export const updateInventoryMovement = async (req, res) => {
  try {
    const movement = await InventoryMovement.findByPk(req.params.id)

    if (!movement) {
      return res.status(404).json({ message: "Movimiento no encontrado" })
    }

    await movement.update(req.body)
    res.json(movement)
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar movimiento", error: error.message })
  }
}

// Delete inventory movement
export const deleteInventoryMovement = async (req, res) => {
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
