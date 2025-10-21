const { CustomerDevice, Customer, Device, Brand, DeviceModel } = require("../index")
const { customerDeviceSchema } = require("../validators/device.validator")

// Get all customer-device relationships
exports.getAllCustomerDevices = async (req, res) => {
  try {
    const { customer_id, device_id, es_propietario_actual } = req.query

    const whereClause = {}
    if (customer_id) whereClause.customer_id = customer_id
    if (device_id) whereClause.device_id = device_id
    if (es_propietario_actual !== undefined) whereClause.es_propietario_actual = es_propietario_actual === "true"

    const customerDevices = await CustomerDevice.findAll({
      where: whereClause,
      include: [
        { model: Customer, as: "customer" },
        {
          model: Device,
          as: "device",
          include: [
            { model: Brand, as: "brand" },
            { model: DeviceModel, as: "device_model" },
          ],
        },
      ],
      order: [["fecha_alta", "DESC"]],
    })
    res.json(customerDevices)
  } catch (error) {
    res.status(500).json({ message: "Error al obtener relaciones cliente-dispositivo", error: error.message })
  }
}

// Get customer-device by ID
exports.getCustomerDeviceById = async (req, res) => {
  try {
    const customerDevice = await CustomerDevice.findByPk(req.params.id, {
      include: [
        { model: Customer, as: "customer" },
        {
          model: Device,
          as: "device",
          include: [
            { model: Brand, as: "brand" },
            { model: DeviceModel, as: "device_model" },
          ],
        },
      ],
    })
    if (!customerDevice) {
      return res.status(404).json({ message: "Relación no encontrada" })
    }
    res.json(customerDevice)
  } catch (error) {
    res.status(500).json({ message: "Error al obtener relación", error: error.message })
  }
}

// Create customer-device relationship
exports.createCustomerDevice = async (req, res) => {
  try {
    const validatedData = customerDeviceSchema.parse(req.body)
    const customerDevice = await CustomerDevice.create(validatedData)
    res.status(201).json(customerDevice)
  } catch (error) {
    if (error.name === "ZodError") {
      return res.status(400).json({ message: "Datos inválidos", errors: error.errors })
    }
    res.status(500).json({ message: "Error al crear relación", error: error.message })
  }
}

// Update customer-device relationship
exports.updateCustomerDevice = async (req, res) => {
  try {
    const validatedData = customerDeviceSchema.partial().parse(req.body)
    const customerDevice = await CustomerDevice.findByPk(req.params.id)
    if (!customerDevice) {
      return res.status(404).json({ message: "Relación no encontrada" })
    }
    await customerDevice.update(validatedData)
    res.json(customerDevice)
  } catch (error) {
    if (error.name === "ZodError") {
      return res.status(400).json({ message: "Datos inválidos", errors: error.errors })
    }
    res.status(500).json({ message: "Error al actualizar relación", error: error.message })
  }
}

// Delete customer-device relationship
exports.deleteCustomerDevice = async (req, res) => {
  try {
    const customerDevice = await CustomerDevice.findByPk(req.params.id)
    if (!customerDevice) {
      return res.status(404).json({ message: "Relación no encontrada" })
    }
    await customerDevice.destroy()
    res.json({ message: "Relación eliminada correctamente" })
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar relación", error: error.message })
  }
}
