import {
  Brand,
  Customer,
  Device,
  DeviceModel,
  Diagnostic,
  OrderHistory,
  OrderStatus,
  RepairOrder,
  RepairTask,
  User,
} from "../src/models/index.js"

// Get all repair orders
export const getAllRepairOrders = async (req, res) => {
  try {
    console.log("[v0] getAllRepairOrders called")
    const { customer_id, estado_id, prioridad, tecnico_id } = req.query

    const whereClause = { deleted_at: null }
    if (customer_id) whereClause.customer_id = customer_id
    if (estado_id) whereClause.estado_id = estado_id
    if (prioridad) whereClause.prioridad = prioridad
    if (tecnico_id) whereClause.tecnico_id = tecnico_id

    const orders = await RepairOrder.findAll({
      where: whereClause,
      include: [
        { model: Customer },
        {
          model: Device,
          include: [{ model: Brand }, { model: DeviceModel }],
        },
        { model: User, as: "tecnico" },
        { model: OrderStatus },
      ],
      order: [["fecha_recibido", "DESC"]],
    })

    console.log("[v0] Repair orders fetched:", orders.length)
    res.json(orders)
  } catch (error) {
    console.error("[v0] Error in getAllRepairOrders:", error)
    res.status(500).json({ message: "Error al obtener órdenes", error: error.message })
  }
}

// Get orders by customer (special endpoint as requested)
export const getOrdersByCustomer = async (req, res) => {
  try {
    const orders = await RepairOrder.findAll({
      where: {
        customer_id: req.params.customerId,
        deleted_at: null,
      },
      include: [
        {
          model: Device,
          include: [{ model: Brand }, { model: DeviceModel }],
        },
        { model: User, as: "tecnico" },
        { model: OrderStatus },
      ],
      order: [["fecha_recibido", "DESC"]],
    })

    res.json(orders)
  } catch (error) {
    res.status(500).json({ message: "Error al obtener órdenes del cliente", error: error.message })
  }
}

// Get repair order by ID with full details
export const getRepairOrderById = async (req, res) => {
  try {
    const order = await RepairOrder.findByPk(req.params.id, {
      include: [
        { model: Customer },
        {
          model: Device,
          include: [{ model: Brand }, { model: DeviceModel }],
        },
        { model: User, as: "tecnico" },
        { model: OrderStatus },
        {
          model: OrderHistory,
          include: [
            { model: OrderStatus, as: "estadoAnterior" },
            { model: OrderStatus, as: "estadoNuevo" },
            { model: User, as: "autor" },
          ],
          order: [["created_at", "DESC"]],
        },
        {
          model: RepairTask,
          include: [{ model: User, as: "asignado" }],
        },
        {
          model: Diagnostic,
          include: [{ model: User, as: "diagnostico_por" }],
        },
      ],
    })

    if (!order) {
      return res.status(404).json({ message: "Orden no encontrada" })
    }

    res.json(order)
  } catch (error) {
    console.error("[v0] Error in getRepairOrderById:", error)
    res.status(500).json({ message: "Error al obtener orden", error: error.message })
  }
}

// Create repair order
export const createRepairOrder = async (req, res) => {
  try {
    console.log("[v0] Creating repair order with data:", req.body)
    const order = await RepairOrder.create(req.body)

    // Create initial history entry
    await OrderHistory.create({
      order_id: order.id,
      estado_anterior: null,
      estado_nuevo: req.body.estado_id,
      cambiado_por: req.body.tecnico_id,
      comentario: "Orden creada",
    })

    res.status(201).json(order)
  } catch (error) {
    console.error("[v0] Error creating repair order:", error)
    res.status(500).json({ message: "Error al crear orden", error: error.message })
  }
}

// Update repair order
export const updateRepairOrder = async (req, res) => {
  try {
    const order = await RepairOrder.findByPk(req.params.id)

    if (!order) {
      return res.status(404).json({ message: "Orden no encontrada" })
    }

    // If status changed, create history entry
    if (req.body.estado_id && req.body.estado_id !== order.estado_id) {
      await OrderHistory.create({
        order_id: order.id,
        estado_anterior: order.estado_id,
        estado_nuevo: req.body.estado_id,
        cambiado_por: req.user.id,
        comentario: req.body.comentario || "Estado actualizado",
      })
    }

    await order.update(req.body)
    res.json(order)
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar orden", error: error.message })
  }
}

// Delete repair order (soft delete)
export const deleteRepairOrder = async (req, res) => {
  try {
    const order = await RepairOrder.findByPk(req.params.id)
    if (!order) {
      return res.status(404).json({ message: "Orden no encontrada" })
    }

    await order.update({ deleted_at: new Date() })
    res.json({ message: "Orden eliminada correctamente" })
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar orden", error: error.message })
  }
}

// Update order status
export const updateOrderStatus = async (req, res) => {
  try {
    const { estado_id, comentario } = req.body
    const order = await RepairOrder.findByPk(req.params.id)

    if (!order) {
      return res.status(404).json({ message: "Orden no encontrada" })
    }

    // Create history entry
    await OrderHistory.create({
      order_id: order.id,
      estado_anterior: order.estado_id,
      estado_nuevo: estado_id,
      cambiado_por: req.user.id,
      comentario: comentario || "Estado actualizado",
    })

    await order.update({ estado_id })
    res.json(order)
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar estado", error: error.message })
  }
}
