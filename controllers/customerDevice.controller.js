import { CustomerDevice, Customer, Device, Brand, DeviceModel } from "../src/models/index.js"

// Get all customer-device relationships
export const getAllCustomerDevices = async (req, res) => {
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
export const getCustomerDeviceById = async (req, res) => {
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
export const createCustomerDevice = async (req, res) => {
  try {
    const customerDevice = await CustomerDevice.create(req.body)
    res.status(201).json(customerDevice)
  } catch (error) {
    res.status(500).json({ message: "Error al crear relación", error: error.message })
  }
}

// Update customer-device relationship
export const updateCustomerDevice = async (req, res) => {
  try {
    const customerDevice = await CustomerDevice.findByPk(req.params.id)
    if (!customerDevice) {
      return res.status(404).json({ message: "Relación no encontrada" })
    }
    await customerDevice.update(req.body)
    res.json(customerDevice)
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar relación", error: error.message })
  }
}

// Delete customer-device relationship
export const deleteCustomerDevice = async (req, res) => {
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
