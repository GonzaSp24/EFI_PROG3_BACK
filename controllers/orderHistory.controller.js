const { OrderHistory, OrderStatus, User, RepairOrder } = require("../index")
const { orderHistorySchema } = require("../validators/order.validator")

// Get all history entries
exports.getAllOrderHistory = async (req, res) => {
  try {
    const { order_id } = req.query

    const whereClause = {}
    if (order_id) whereClause.order_id = order_id

    const history = await OrderHistory.findAll({
      where: whereClause,
      include: [
        { model: RepairOrder, as: "order" },
        { model: OrderStatus, as: "previous_status" },
        { model: OrderStatus, as: "new_status" },
        { model: User, as: "changed_by" },
      ],
      order: [["created_at", "DESC"]],
    })

    res.json(history)
  } catch (error) {
    res.status(500).json({ message: "Error al obtener historial", error: error.message })
  }
}

// Get history by ID
exports.getOrderHistoryById = async (req, res) => {
  try {
    const history = await OrderHistory.findByPk(req.params.id, {
      include: [
        { model: RepairOrder, as: "order" },
        { model: OrderStatus, as: "previous_status" },
        { model: OrderStatus, as: "new_status" },
        { model: User, as: "changed_by" },
      ],
    })

    if (!history) {
      return res.status(404).json({ message: "Historial no encontrado" })
    }

    res.json(history)
  } catch (error) {
    res.status(500).json({ message: "Error al obtener historial", error: error.message })
  }
}

// Create history entry
exports.createOrderHistory = async (req, res) => {
  try {
    const validatedData = orderHistorySchema.parse(req.body)
    const history = await OrderHistory.create(validatedData)
    res.status(201).json(history)
  } catch (error) {
    if (error.name === "ZodError") {
      return res.status(400).json({ message: "Datos inválidos", errors: error.errors })
    }
    res.status(500).json({ message: "Error al crear historial", error: error.message })
  }
}
