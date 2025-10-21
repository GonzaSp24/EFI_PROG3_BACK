const { DeviceModel, Brand } = require("../index")
const { deviceModelSchema } = require("../validators/device.validator")
const { Op } = require("sequelize")

// Get all device models
exports.getAllDeviceModels = async (req, res) => {
  try {
    const { brand_id, device_type } = req.query

    const whereClause = {}
    if (brand_id) whereClause.brand_id = brand_id
    if (device_type) whereClause.device_type = device_type

    const models = await DeviceModel.findAll({
      where: whereClause,
      include: [{ model: Brand, as: "brand" }],
      order: [["model", "ASC"]],
    })
    res.json(models)
  } catch (error) {
    res.status(500).json({ message: "Error al obtener modelos", error: error.message })
  }
}

// Get device model by ID
exports.getDeviceModelById = async (req, res) => {
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
exports.createDeviceModel = async (req, res) => {
  try {
    const validatedData = deviceModelSchema.parse(req.body)
    const model = await DeviceModel.create(validatedData)
    res.status(201).json(model)
  } catch (error) {
    if (error.name === "ZodError") {
      return res.status(400).json({ message: "Datos inválidos", errors: error.errors })
    }
    res.status(500).json({ message: "Error al crear modelo", error: error.message })
  }
}

// Update device model
exports.updateDeviceModel = async (req, res) => {
  try {
    const validatedData = deviceModelSchema.parse(req.body)
    const model = await DeviceModel.findByPk(req.params.id)
    if (!model) {
      return res.status(404).json({ message: "Modelo no encontrado" })
    }
    await model.update(validatedData)
    res.json(model)
  } catch (error) {
    if (error.name === "ZodError") {
      return res.status(400).json({ message: "Datos inválidos", errors: error.errors })
    }
    res.status(500).json({ message: "Error al actualizar modelo", error: error.message })
  }
}

// Delete device model
exports.deleteDeviceModel = async (req, res) => {
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
