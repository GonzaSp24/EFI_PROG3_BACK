import { models } from "../src/models/index.js"

const { DeviceModel, Brand } = models

// Get all device models
export const getAllDeviceModels = async (req, res) => {
  try {
    console.log("[v0] getAllDeviceModels called with query:", req.query)
    const { brand_id, device_type } = req.query
    
    const whereClause = {}
    if (brand_id) whereClause.brand_id = brand_id
    if (device_type) whereClause.device_type = device_type
    
    const deviceModels = await DeviceModel.findAll({
      where: whereClause,
      include: [{ model: Brand }],
      order: [["name", "ASC"]],
    })
    console.log("[v0] Device models found:", deviceModels.length)
    res.json(deviceModels)
  } catch (error) {
    console.error("[v0] Error in getAllDeviceModels:", error)
    res.status(500).json({ message: "Error al obtener modelos", error: error.message })
  }
}

// Get device model by ID
export const getDeviceModelById = async (req, res) => {
  try {
    const model = await DeviceModel.findByPk(req.params.id, {
      include: [{ model: Brand, as: "brand" }],
    })
    if (!model) {
      return res.status(404).json({ message: "Modelo no encontrado" })
    }
    res.json(model)
  } catch (error) {
    res.status(500).json({ message: "Error al obtener modelo", error: error.message })
  }
}

// Create device model
export const createDeviceModel = async (req, res) => {
  try {
    const model = await DeviceModel.create(req.body)
    res.status(201).json(model)
  } catch (error) {
    res.status(500).json({ message: "Error al crear modelo", error: error.message })
  }
}

// Update device model
export const updateDeviceModel = async (req, res) => {
  try {
    const model = await DeviceModel.findByPk(req.params.id)
    if (!model) {
      return res.status(404).json({ message: "Modelo no encontrado" })
    }
    await model.update(req.body)
    res.json(model)
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar modelo", error: error.message })
  }
}

// Delete device model
export const deleteDeviceModel = async (req, res) => {
  try {
    const model = await DeviceModel.findByPk(req.params.id)
    if (!model) {
      return res.status(404).json({ message: "Modelo no encontrado" })
    }
    await model.destroy()
    res.json({ message: "Modelo eliminado correctamente" })
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar modelo", error: error.message })
  }
}
