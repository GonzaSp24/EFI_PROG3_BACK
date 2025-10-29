import {
  RepairOrder,
  Customer,
  Device,
  User,
  OrderStatus,
  OrderHistory,
  RepairTask,
  Diagnostic,
} from "../src/models/index.js"

// Get all repair orders
export const getAllRepairOrders = async (req, res) => {
  try {
    const { customer_id, estado_id, prioridad, tecnico_id } = req.query

    const whereClause = { deleted_at: null }
    if (customer_id) whereClause.customer_id = customer_id
    if (estado_id) whereClause.estado_id = estado_id
    if (prioridad) whereClause.prioridad = prioridad
    if (tecnico_id) whereClause.tecnico_id = tecnico_id

    const orders = await RepairOrder.findAll({
      where: whereClause,
      include: [
        { model: Customer, as: "customer" },
        { model: Device, as: "device", include: ["brand", "device_model"] },
        { model: User, as: "assigned_to" },
        { model: OrderStatus, as: "status" },
      ],
      order: [["fecha_recibido", "DESC"]],
    })

    res.json(orders)
  } catch (error) {
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
        { model: Device, as: "device", include: ["brand", "device_model"] },
        { model: User, as: "assigned_to" },
        { model: OrderStatus, as: "status" },
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
        { model: Customer, as: "customer" },
        { model: Device, as: "device", include: ["brand", "device_model"] },
        { model: User, as: "assigned_to" },
        { model: OrderStatus, as: "status" },
        {
          model: OrderHistory,
          as: "history",
          include: [
            { model: OrderStatus, as: "previous_status" },
            { model: OrderStatus, as: "new_status" },
            { model: User, as: "changed_by" },
          ],
          order: [["created_at", "DESC"]],
        },
        {
          model: RepairTask,
          as: "tasks",
          include: [{ model: User, as: "assigned_user" }],
        },
        {
          model: Diagnostic,
          as: "diagnostics",
          include: [{ model: User, as: "technician" }],
        },
      ],
    })

    if (!order) {
      return res.status(404).json({ message: "Orden no encontrada" })
    }

    res.json(order)
  } catch (error) {
    res.status(500).json({ message: "Error al obtener orden", error: error.message })
  }
}

// Create repair order
export const createRepairOrder = async (req, res) => {
  try {
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
