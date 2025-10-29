import { OrderStatus } from "../src/models/index.js"

// Get all order statuses
export const getAllOrderStatuses = async (req, res) => {
  try {
    const statuses = await OrderStatus.findAll({
      order: [["id", "ASC"]],
    })
    res.json(statuses)
  } catch (error) {
    res.status(500).json({ message: "Error al obtener estados", error: error.message })
  }
}

// Get order status by ID
export const getOrderStatusById = async (req, res) => {
  try {
    const status = await OrderStatus.findByPk(req.params.id)
    if (!status) {
      return res.status(404).json({ message: "Estado no encontrado" })
    }
    res.json(status)
  } catch (error) {
    res.status(500).json({ message: "Error al obtener estado", error: error.message })
  }
}

// Create order status
export const createOrderStatus = async (req, res) => {
  try {
    const status = await OrderStatus.create(req.body)
    res.status(201).json(status)
  } catch (error) {
    res.status(500).json({ message: "Error al crear estado", error: error.message })
  }
}

// Update order status
export const updateOrderStatus = async (req, res) => {
  try {
    const status = await OrderStatus.findByPk(req.params.id)
    if (!status) {
      return res.status(404).json({ message: "Estado no encontrado" })
    }
    await status.update(req.body)
    res.json(status)
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar estado", error: error.message })
  }
}

// Delete order status
export const deleteOrderStatus = async (req, res) => {
  try {
    const status = await OrderStatus.findByPk(req.params.id)
    if (!status) {
      return res.status(404).json({ message: "Estado no encontrado" })
    }
    await status.destroy()
    res.json({ message: "Estado eliminado correctamente" })
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar estado", error: error.message })
  }
}
