const { OrderStatus } = require("../index")
const { orderStatusSchema } = require("../validators/catalog.validator")

// Get all order statuses
exports.getAllOrderStatuses = async (req, res) => {
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
exports.getOrderStatusById = async (req, res) => {
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
exports.createOrderStatus = async (req, res) => {
  try {
    const validatedData = orderStatusSchema.parse(req.body)
    const status = await OrderStatus.create(validatedData)
    res.status(201).json(status)
  } catch (error) {
    if (error.name === "ZodError") {
      return res.status(400).json({ message: "Datos inválidos", errors: error.errors })
    }
    res.status(500).json({ message: "Error al crear estado", error: error.message })
  }
}

// Update order status
exports.updateOrderStatus = async (req, res) => {
  try {
    const validatedData = orderStatusSchema.parse(req.body)
    const status = await OrderStatus.findByPk(req.params.id)
    if (!status) {
      return res.status(404).json({ message: "Estado no encontrado" })
    }
    await status.update(validatedData)
    res.json(status)
  } catch (error) {
    if (error.name === "ZodError") {
      return res.status(400).json({ message: "Datos inválidos", errors: error.errors })
    }
    res.status(500).json({ message: "Error al actualizar estado", error: error.message })
  }
}

// Delete order status
exports.deleteOrderStatus = async (req, res) => {
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
