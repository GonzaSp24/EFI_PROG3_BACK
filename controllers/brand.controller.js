import { Brand, DeviceModel } from "../src/models/index.js"

// Get all brands
export const getAllBrands = async (req, res) => {
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
export const getBrandById = async (req, res) => {
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
export const createBrand = async (req, res) => {
  try {
    const brand = await Brand.create(req.body)
    res.status(201).json(brand)
  } catch (error) {
    res.status(500).json({ message: "Error al crear marca", error: error.message })
  }
}

// Update brand
export const updateBrand = async (req, res) => {
  try {
    const brand = await Brand.findByPk(req.params.id)
    if (!brand) {
      return res.status(404).json({ message: "Marca no encontrada" })
    }
    await brand.update(req.body)
    res.json(brand)
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar marca", error: error.message })
  }
}

// Delete brand
export const deleteBrand = async (req, res) => {
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
