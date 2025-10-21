const { Brand, DeviceModel } = require("../index")
const { brandSchema } = require("../validators/device.validator")

// Get all brands
exports.getAllBrands = async (req, res) => {
  try {
    const brands = await Brand.findAll({
      order: [["name", "ASC"]],
    })
    res.json(brands)
  } catch (error) {
    res.status(500).json({ message: "Error al obtener marcas", error: error.message })
  }
}

// Get brand by ID with models
exports.getBrandById = async (req, res) => {
  try {
    const brand = await Brand.findByPk(req.params.id, {
      include: [{ model: DeviceModel, as: "device_models" }],
    })
    if (!brand) {
      return res.status(404).json({ message: "Marca no encontrada" })
    }
    res.json(brand)
  } catch (error) {
    res.status(500).json({ message: "Error al obtener marca", error: error.message })
  }
}

// Create brand
exports.createBrand = async (req, res) => {
  try {
    const validatedData = brandSchema.parse(req.body)
    const brand = await Brand.create(validatedData)
    res.status(201).json(brand)
  } catch (error) {
    if (error.name === "ZodError") {
      return res.status(400).json({ message: "Datos inválidos", errors: error.errors })
    }
    res.status(500).json({ message: "Error al crear marca", error: error.message })
  }
}

// Update brand
exports.updateBrand = async (req, res) => {
  try {
    const validatedData = brandSchema.parse(req.body)
    const brand = await Brand.findByPk(req.params.id)
    if (!brand) {
      return res.status(404).json({ message: "Marca no encontrada" })
    }
    await brand.update(validatedData)
    res.json(brand)
  } catch (error) {
    if (error.name === "ZodError") {
      return res.status(400).json({ message: "Datos inválidos", errors: error.errors })
    }
    res.status(500).json({ message: "Error al actualizar marca", error: error.message })
  }
}

// Delete brand
exports.deleteBrand = async (req, res) => {
  try {
    const brand = await Brand.findByPk(req.params.id)
    if (!brand) {
      return res.status(404).json({ message: "Marca no encontrada" })
    }
    await brand.destroy()
    res.json({ message: "Marca eliminada correctamente" })
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar marca", error: error.message })
  }
}
