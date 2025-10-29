import { Supplier, Part } from "../src/models/index.js"
import { Op } from "sequelize"

// Get all suppliers
export const getAllSuppliers = async (req, res) => {
  try {
    const { search } = req.query

    const whereClause = search
      ? {
          [Op.or]: [{ nombre: { [Op.like]: `%${search}%` } }, { email: { [Op.like]: `%${search}%` } }],
        }
      : {}

    const suppliers = await Supplier.findAll({
      where: whereClause,
      order: [["nombre", "ASC"]],
    })

    res.json(suppliers)
  } catch (error) {
    res.status(500).json({ message: "Error al obtener proveedores", error: error.message })
  }
}

// Get supplier by ID with parts
export const getSupplierById = async (req, res) => {
  try {
    const supplier = await Supplier.findByPk(req.params.id, {
      include: [{ model: Part, as: "parts" }],
    })

    if (!supplier) {
      return res.status(404).json({ message: "Proveedor no encontrado" })
    }

    res.json(supplier)
  } catch (error) {
    res.status(500).json({ message: "Error al obtener proveedor", error: error.message })
  }
}

// Create supplier
export const createSupplier = async (req, res) => {
  try {
    const supplier = await Supplier.create(req.body)
    res.status(201).json(supplier)
  } catch (error) {
    res.status(500).json({ message: "Error al crear proveedor", error: error.message })
  }
}

// Update supplier
export const updateSupplier = async (req, res) => {
  try {
    const supplier = await Supplier.findByPk(req.params.id)

    if (!supplier) {
      return res.status(404).json({ message: "Proveedor no encontrado" })
    }

    await supplier.update(req.body)
    res.json(supplier)
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar proveedor", error: error.message })
  }
}

// Delete supplier
export const deleteSupplier = async (req, res) => {
  try {
    const supplier = await Supplier.findByPk(req.params.id)
    if (!supplier) {
      return res.status(404).json({ message: "Proveedor no encontrado" })
    }

    await supplier.destroy()
    res.json({ message: "Proveedor eliminado correctamente" })
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar proveedor", error: error.message })
  }
}
