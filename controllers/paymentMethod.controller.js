const { PaymentMethod } = require("../index")
const { paymentMethodSchema } = require("../validators/catalog.validator")

// Get all payment methods
exports.getAllPaymentMethods = async (req, res) => {
  try {
    const methods = await PaymentMethod.findAll({
      order: [["id", "ASC"]],
    })
    res.json(methods)
  } catch (error) {
    res.status(500).json({ message: "Error al obtener métodos de pago", error: error.message })
  }
}

// Get payment method by ID
exports.getPaymentMethodById = async (req, res) => {
  try {
    const method = await PaymentMethod.findByPk(req.params.id)
    if (!method) {
      return res.status(404).json({ message: "Método de pago no encontrado" })
    }
    res.json(method)
  } catch (error) {
    res.status(500).json({ message: "Error al obtener método de pago", error: error.message })
  }
}

// Create payment method
exports.createPaymentMethod = async (req, res) => {
  try {
    const validatedData = paymentMethodSchema.parse(req.body)
    const method = await PaymentMethod.create(validatedData)
    res.status(201).json(method)
  } catch (error) {
    if (error.name === "ZodError") {
      return res.status(400).json({ message: "Datos inválidos", errors: error.errors })
    }
    res.status(500).json({ message: "Error al crear método de pago", error: error.message })
  }
}

// Update payment method
exports.updatePaymentMethod = async (req, res) => {
  try {
    const validatedData = paymentMethodSchema.parse(req.body)
    const method = await PaymentMethod.findByPk(req.params.id)
    if (!method) {
      return res.status(404).json({ message: "Método de pago no encontrado" })
    }
    await method.update(validatedData)
    res.json(method)
  } catch (error) {
    if (error.name === "ZodError") {
      return res.status(400).json({ message: "Datos inválidos", errors: error.errors })
    }
    res.status(500).json({ message: "Error al actualizar método de pago", error: error.message })
  }
}

// Delete payment method
exports.deletePaymentMethod = async (req, res) => {
  try {
    const method = await PaymentMethod.findByPk(req.params.id)
    if (!method) {
      return res.status(404).json({ message: "Método de pago no encontrado" })
    }
    await method.destroy()
    res.json({ message: "Método de pago eliminado correctamente" })
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar método de pago", error: error.message })
  }
}
