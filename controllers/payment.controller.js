import { Payment, Invoice, PaymentMethod } from "../src/models/index.js"

// Get all payments
exports.getAllPayments = async (req, res) => {
  try {
    const { invoice_id, metodo_id } = req.query

    const whereClause = {}
    if (invoice_id) whereClause.invoice_id = invoice_id
    if (metodo_id) whereClause.metodo_id = metodo_id

    const payments = await Payment.findAll({
      where: whereClause,
      include: [
        { model: Invoice, as: "invoice" },
        { model: PaymentMethod, as: "payment_method" },
      ],
      order: [["fecha", "DESC"]],
    })

    res.json(payments)
  } catch (error) {
    res.status(500).json({ message: "Error al obtener pagos", error: error.message })
  }
}

// Get payment by ID
exports.getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findByPk(req.params.id, {
      include: [
        { model: Invoice, as: "invoice" },
        { model: PaymentMethod, as: "payment_method" },
      ],
    })

    if (!payment) {
      return res.status(404).json({ message: "Pago no encontrado" })
    }

    res.json(payment)
  } catch (error) {
    res.status(500).json({ message: "Error al obtener pago", error: error.message })
  }
}

// Create payment
export const createPayment = async (req, res) => {
  try {
    const payment = await Payment.create(req.body)

    // Check if invoice is fully paid
    const invoice = await Invoice.findByPk(req.body.invoice_id, {
      include: [{ model: Payment, as: "payments" }],
    })

    if (invoice) {
      const totalPaid = invoice.payments.reduce((sum, p) => sum + Number.parseFloat(p.monto), 0)
      if (totalPaid >= Number.parseFloat(invoice.total)) {
        await invoice.update({ estado: "pagada" })
      }
    }

    res.status(201).json(payment)
  } catch (error) {
    res.status(500).json({ message: "Error al crear pago", error: error.message })
  }
}

// Update payment
export const updatePayment = async (req, res) => {
  try {
    const payment = await Payment.findByPk(req.params.id)

    if (!payment) {
      return res.status(404).json({ message: "Pago no encontrado" })
    }

    await payment.update(req.body)
    res.json(payment)
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar pago", error: error.message })
  }
}

// Delete payment
exports.deletePayment = async (req, res) => {
  try {
    const payment = await Payment.findByPk(req.params.id)
    if (!payment) {
      return res.status(404).json({ message: "Pago no encontrado" })
    }

    await payment.destroy()
    res.json({ message: "Pago eliminado correctamente" })
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar pago", error: error.message })
  }
}
