import { Quote, RepairOrder, Customer, Device } from "../src/models/index.js"

// Get all quotes
exports.getAllQuotes = async (req, res) => {
  try {
    const { order_id, estado } = req.query

    const whereClause = {}
    if (order_id) whereClause.order_id = order_id
    if (estado) whereClause.estado = estado

    const quotes = await Quote.findAll({
      where: whereClause,
      include: [
        {
          model: RepairOrder,
          as: "order",
          include: [{ model: Customer, as: "customer" }],
        },
      ],
      order: [["created_at", "DESC"]],
    })

    res.json(quotes)
  } catch (error) {
    res.status(500).json({ message: "Error al obtener cotizaciones", error: error.message })
  }
}

// Get quote by ID
exports.getQuoteById = async (req, res) => {
  try {
    const quote = await Quote.findByPk(req.params.id, {
      include: [
        {
          model: RepairOrder,
          as: "order",
          include: [
            { model: Customer, as: "customer" },
            { model: Device, as: "device" },
          ],
        },
      ],
    })

    if (!quote) {
      return res.status(404).json({ message: "Cotización no encontrada" })
    }

    res.json(quote)
  } catch (error) {
    res.status(500).json({ message: "Error al obtener cotización", error: error.message })
  }
}

// Create quote
export const createQuote = async (req, res) => {
  try {
    const quote = await Quote.create(req.body)
    res.status(201).json(quote)
  } catch (error) {
    res.status(500).json({ message: "Error al crear cotización", error: error.message })
  }
}

// Update quote
export const updateQuote = async (req, res) => {
  try {
    const quote = await Quote.findByPk(req.params.id)

    if (!quote) {
      return res.status(404).json({ message: "Cotización no encontrada" })
    }

    await quote.update(req.body)
    res.json(quote)
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar cotización", error: error.message })
  }
}

// Delete quote
exports.deleteQuote = async (req, res) => {
  try {
    const quote = await Quote.findByPk(req.params.id)
    if (!quote) {
      return res.status(404).json({ message: "Cotización no encontrada" })
    }

    await quote.destroy()
    res.json({ message: "Cotización eliminada correctamente" })
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar cotización", error: error.message })
  }
}
