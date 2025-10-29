import { Invoice, RepairOrder, Customer, Payment } from "../src/models/index.js"

// Get all invoices
export const getAllInvoices = async (req, res) => {
  try {
    const { order_id, estado } = req.query

    const whereClause = {}
    if (order_id) whereClause.order_id = order_id
    if (estado) whereClause.estado = estado

    const invoices = await Invoice.findAll({
      where: whereClause,
      include: [
        {
          model: RepairOrder,
          as: "order",
          include: [{ model: Customer, as: "customer" }],
        },
        { model: Payment, as: "payments" },
      ],
      order: [["fecha_emision", "DESC"]],
    })

    res.json(invoices)
  } catch (error) {
    res.status(500).json({ message: "Error al obtener facturas", error: error.message })
  }
}

// Get invoice by ID
export const getInvoiceById = async (req, res) => {
  try {
    const invoice = await Invoice.findByPk(req.params.id, {
      include: [
        {
          model: RepairOrder,
          as: "order",
          include: [{ model: Customer, as: "customer" }],
        },
        { model: Payment, as: "payments", include: ["payment_method"] },
      ],
    })

    if (!invoice) {
      return res.status(404).json({ message: "Factura no encontrada" })
    }

    res.json(invoice)
  } catch (error) {
    res.status(500).json({ message: "Error al obtener factura", error: error.message })
  }
}

// Create invoice
export const createInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.create(req.body)
    res.status(201).json(invoice)
  } catch (error) {
    res.status(500).json({ message: "Error al crear factura", error: error.message })
  }
}

// Update invoice
export const updateInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findByPk(req.params.id)

    if (!invoice) {
      return res.status(404).json({ message: "Factura no encontrada" })
    }

    await invoice.update(req.body)
    res.json(invoice)
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar factura", error: error.message })
  }
}

// Delete invoice
export const deleteInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findByPk(req.params.id)
    if (!invoice) {
      return res.status(404).json({ message: "Factura no encontrada" })
    }

    await invoice.destroy()
    res.json({ message: "Factura eliminada correctamente" })
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar factura", error: error.message })
  }
}
