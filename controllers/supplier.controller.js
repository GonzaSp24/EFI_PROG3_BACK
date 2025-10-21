const { Supplier, Part } = require("../index")
const { supplierSchema } = require("../validators/inventory.validator")
const { Op } = require("sequelize")

// Get all suppliers
exports.getAllSuppliers = async (req, res) => {
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
exports.getSupplierById = async (req, res) => {
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
exports.createSupplier = async (req, res) => {
  try {
    const validatedData = supplierSchema.parse(req.body)
    const supplier = await Supplier.create(validatedData)
    res.status(201).json(supplier)
  } catch (error) {
    if (error.name === "ZodError") {
      return res.status(400).json({ message: "Datos inválidos", errors: error.errors })
    }
    res.status(500).json({ message: "Error al crear proveedor", error: error.message })
  }
}

// Update supplier
exports.updateSupplier = async (req, res) => {
  try {
    const validatedData = supplierSchema.partial().parse(req.body)
    const supplier = await Supplier.findByPk(req.params.id)

    if (!supplier) {
      return res.status(404).json({ message: "Proveedor no encontrado" })
    }

    await supplier.update(validatedData)
    res.json(supplier)
  } catch (error) {
    if (error.name === "ZodError") {
      return res.status(400).json({ message: "Datos inválidos", errors: error.errors })
    }
    res.status(500).json({ message: "Error al actualizar proveedor", error: error.message })
  }
}

// Delete supplier
exports.deleteSupplier = async (req, res) => {
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
