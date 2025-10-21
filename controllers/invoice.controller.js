const { Invoice, RepairOrder, Customer, Payment } = require("../index")
const { invoiceSchema } = require("../validators/billing.validator")

// Get all invoices
exports.getAllInvoices = async (req, res) => {
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
exports.getInvoiceById = async (req, res) => {
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
exports.createInvoice = async (req, res) => {
  try {
    const validatedData = invoiceSchema.parse(req.body)
    const invoice = await Invoice.create(validatedData)
    res.status(201).json(invoice)
  } catch (error) {
    if (error.name === "ZodError") {
      return res.status(400).json({ message: "Datos inválidos", errors: error.errors })
    }
    res.status(500).json({ message: "Error al crear factura", error: error.message })
  }
}

// Update invoice
exports.updateInvoice = async (req, res) => {
  try {
    const validatedData = invoiceSchema.partial().parse(req.body)
    const invoice = await Invoice.findByPk(req.params.id)

    if (!invoice) {
      return res.status(404).json({ message: "Factura no encontrada" })
    }

    await invoice.update(validatedData)
    res.json(invoice)
  } catch (error) {
    if (error.name === "ZodError") {
      return res.status(400).json({ message: "Datos inválidos", errors: error.errors })
    }
    res.status(500).json({ message: "Error al actualizar factura", error: error.message })
  }
}

// Delete invoice
exports.deleteInvoice = async (req, res) => {
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
