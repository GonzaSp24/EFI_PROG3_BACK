import { OrderHistory, OrderStatus, User, RepairOrder } from "../src/models/index.js"

// Get all history entries
export const getAllOrderHistory = async (req, res) => {
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
export const getOrderHistoryById = async (req, res) => {
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
export const createOrderHistory = async (req, res) => {
  try {
    const history = await OrderHistory.create(req.body)
    res.status(201).json(history)
  } catch (error) {
    res.status(500).json({ message: "Error al crear historial", error: error.message })
  }
}
