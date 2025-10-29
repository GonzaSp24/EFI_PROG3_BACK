import { Customer, User, RepairOrder } from "../src/models/index.js"
import { Op } from "sequelize"

// Get all customers
export const getAllCustomers = async (req, res) => {
  try {
    const { search } = req.query

    const whereClause = search
      ? {
          [Op.or]: [
            { name: { [Op.like]: `%${search}%` } },
            { email: { [Op.like]: `%${search}%` } },
            { phone: { [Op.like]: `%${search}%` } },
          ],
        }
      : {}

    const customers = await Customer.findAll({
      where: whereClause,
      include: [{ model: User, as: "user", attributes: ["id", "name", "email"] }],
      order: [["id", "DESC"]],
    })

    res.json(customers)
  } catch (error) {
    res.status(500).json({ message: "Error al obtener clientes", error: error.message })
  }
}

// Get customer by ID
export const getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findByPk(req.params.id, {
      include: [{ model: User, as: "user", attributes: ["id", "name", "email"] }],
    })

    if (!customer) {
      return res.status(404).json({ message: "Cliente no encontrado" })
    }

    res.json(customer)
  } catch (error) {
    res.status(500).json({ message: "Error al obtener cliente", error: error.message })
  }
}

// Get customer with repair orders
export const getCustomerWithOrders = async (req, res) => {
  try {
    const customer = await Customer.findByPk(req.params.id, {
      include: [
        { model: User, as: "user", attributes: ["id", "name", "email"] },
        {
          model: RepairOrder,
          as: "repair_orders",
          include: ["status", "assigned_to"],
          order: [["created_at", "DESC"]],
        },
      ],
    })

    if (!customer) {
      return res.status(404).json({ message: "Cliente no encontrado" })
    }

    res.json(customer)
  } catch (error) {
    res.status(500).json({ message: "Error al obtener cliente con órdenes", error: error.message })
  }
}

// Create customer
export const createCustomer = async (req, res) => {
  try {
    const customer = await Customer.create(req.body)
    res.status(201).json(customer)
  } catch (error) {
    res.status(500).json({ message: "Error al crear cliente", error: error.message })
  }
}

// Update customer
export const updateCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByPk(req.params.id)

    if (!customer) {
      return res.status(404).json({ message: "Cliente no encontrado" })
    }

    await customer.update(req.body)
    res.json(customer)
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar cliente", error: error.message })
  }
}

// Delete customer (soft delete)
export const deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByPk(req.params.id)
    if (!customer) {
      return res.status(404).json({ message: "Cliente no encontrado" })
    }

    // Soft delete
    await customer.update({ deleted_at: new Date() })
    res.json({ message: "Cliente eliminado correctamente" })
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar cliente", error: error.message })
  }
}
