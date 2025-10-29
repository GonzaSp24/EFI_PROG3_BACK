import { Device, Brand, DeviceModel, CustomerDevice, Customer } from "../src/models/index.js"
import { Op } from "sequelize"

// Get all devices
export const getAllDevices = async (req, res) => {
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
export const getDeviceById = async (req, res) => {
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
export const getDeviceWithHistory = async (req, res) => {
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
export const createDevice = async (req, res) => {
  try {
    const device = await Device.create(req.body)
    res.status(201).json(device)
  } catch (error) {
    res.status(500).json({ message: "Error al crear dispositivo", error: error.message })
  }
}

// Update device
export const updateDevice = async (req, res) => {
  try {
    const device = await Device.findByPk(req.params.id)
    if (!device) {
      return res.status(404).json({ message: "Dispositivo no encontrado" })
    }
    await device.update(req.body)
    res.json(device)
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar dispositivo", error: error.message })
  }
}

// Delete device
export const deleteDevice = async (req, res) => {
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
