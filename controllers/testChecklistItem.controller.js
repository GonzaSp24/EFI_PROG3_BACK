import { TestChecklistItem, RepairOrder } from "../src/models/index.js"

// Get all test checklist items
export const getAllTestChecklistItems = async (req, res) => {
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
export const getTestChecklistItemById = async (req, res) => {
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
export const createTestChecklistItem = async (req, res) => {
  try {
    const item = await TestChecklistItem.create(req.body)
    res.status(201).json(item)
  } catch (error) {
    res.status(500).json({ message: "Error al crear item", error: error.message })
  }
}

// Update test checklist item
export const updateTestChecklistItem = async (req, res) => {
  try {
    const item = await TestChecklistItem.findByPk(req.params.id)

    if (!item) {
      return res.status(404).json({ message: "Item no encontrado" })
    }

    await item.update(req.body)
    res.json(item)
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar item", error: error.message })
  }
}

// Delete test checklist item
export const deleteTestChecklistItem = async (req, res) => {
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
