import { PaymentMethod } from "../src/models/index.js"

// Get all payment methods
export const getAllPaymentMethods = async (req, res) => {
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
export const getPaymentMethodById = async (req, res) => {
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
export const createPaymentMethod = async (req, res) => {
  try {
    const method = await PaymentMethod.create(req.body)
    res.status(201).json(method)
  } catch (error) {
    res.status(500).json({ message: "Error al crear método de pago", error: error.message })
  }
}

// Update payment method
export const updatePaymentMethod = async (req, res) => {
  try {
    const method = await PaymentMethod.findByPk(req.params.id)
    if (!method) {
      return res.status(404).json({ message: "Método de pago no encontrado" })
    }
    await method.update(req.body)
    res.json(method)
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar método de pago", error: error.message })
  }
}

// Delete payment method
export const deletePaymentMethod = async (req, res) => {
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
