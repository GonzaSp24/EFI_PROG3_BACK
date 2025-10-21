const { Device, Brand, DeviceModel, CustomerDevice, Customer } = require("../index")
const { deviceSchema } = require("../validators/device.validator")
const { Op } = require("sequelize")

// Get all devices
exports.getAllDevices = async (req, res) => {
  try {
    const { serial_number, brand_id } = req.query

    const whereClause = {}
    if (serial_number) whereClause.serial_number = { [Op.like]: `%${serial_number}%` }
    if (brand_id) whereClause.brand_id = brand_id

    const devices = await Device.findAll({
      where: whereClause,
      include: [
        { model: Brand, as: "brand" },
        { model: DeviceModel, as: "device_model" },
      ],
      order: [["id", "DESC"]],
    })
    res.json(devices)
  } catch (error) {
    res.status(500).json({ message: "Error al obtener dispositivos", error: error.message })
  }
}

// Get device by ID
exports.getDeviceById = async (req, res) => {
  try {
    const device = await Device.findByPk(req.params.id, {
      include: [
        { model: Brand, as: "brand" },
        { model: DeviceModel, as: "device_model" },
      ],
    })
    if (!device) {
      return res.status(404).json({ message: "Dispositivo no encontrado" })
    }
    res.json(device)
  } catch (error) {
    res.status(500).json({ message: "Error al obtener dispositivo", error: error.message })
  }
}

// Get device with owner history
exports.getDeviceWithHistory = async (req, res) => {
  try {
    const device = await Device.findByPk(req.params.id, {
      include: [
        { model: Brand, as: "brand" },
        { model: DeviceModel, as: "device_model" },
        {
          model: CustomerDevice,
          as: "customer_devices",
          include: [{ model: Customer, as: "customer" }],
          order: [["fecha_alta", "DESC"]],
        },
      ],
    })
    if (!device) {
      return res.status(404).json({ message: "Dispositivo no encontrado" })
    }
    res.json(device)
  } catch (error) {
    res.status(500).json({ message: "Error al obtener historial del dispositivo", error: error.message })
  }
}

// Create device
exports.createDevice = async (req, res) => {
  try {
    const validatedData = deviceSchema.parse(req.body)
    const device = await Device.create(validatedData)
    res.status(201).json(device)
  } catch (error) {
    if (error.name === "ZodError") {
      return res.status(400).json({ message: "Datos inválidos", errors: error.errors })
    }
    res.status(500).json({ message: "Error al crear dispositivo", error: error.message })
  }
}

// Update device
exports.updateDevice = async (req, res) => {
  try {
    const validatedData = deviceSchema.partial().parse(req.body)
    const device = await Device.findByPk(req.params.id)
    if (!device) {
      return res.status(404).json({ message: "Dispositivo no encontrado" })
    }
    await device.update(validatedData)
    res.json(device)
  } catch (error) {
    if (error.name === "ZodError") {
      return res.status(400).json({ message: "Datos inválidos", errors: error.errors })
    }
    res.status(500).json({ message: "Error al actualizar dispositivo", error: error.message })
  }
}

// Delete device
exports.deleteDevice = async (req, res) => {
  try {
    const device = await Device.findByPk(req.params.id)
    if (!device) {
      return res.status(404).json({ message: "Dispositivo no encontrado" })
    }
    await device.destroy()
    res.json({ message: "Dispositivo eliminado correctamente" })
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar dispositivo", error: error.message })
  }
}
