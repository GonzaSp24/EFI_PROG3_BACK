import { Brand, Customer, CustomerDevice, Device, DeviceModel } from "../src/models/index.js"

import { Op } from "sequelize"

// Get all devices
export const getAllDevices = async (req, res) => {
  try {
    console.log("[v0] getAllDevices called")
    const { serial_number, brand_id } = req.query
    
    const whereClause = {}
    if (serial_number) whereClause.serial_number = { [Op.like]: `%${serial_number}%` }
    if (brand_id) whereClause.brand_id = brand_id
    
    const devices = await Device.findAll({
      where: whereClause,
      include: [
        {
          model: DeviceModel,
          include: [{ model: Brand }],
        },
      ],
      order: [["id", "DESC"]],
    })
    console.log("[v0] Devices fetched:", devices.length)
    res.json(devices)
  } catch (error) {
    console.error("[v0] Error in getAllDevices:", error)
    res.status(500).json({ message: "Error al obtener dispositivos", error: error.message })
  }
}

// Get device by ID
export const getDeviceById = async (req, res) => {
  try {
    const device = await Device.findByPk(req.params.id, {
      include: [
        {
          model: DeviceModel,
          include: [{ model: Brand }],
        },
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
        {
          model: DeviceModel,
          include: [{ model: Brand }],
        },
        {
          model: CustomerDevice,
          include: [{ model: Customer }],
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
    console.log("[v0] Creating device with data:", req.body)
    const device = await Device.create(req.body)
    
    const createdDevice = await Device.findByPk(device.id, {
      include: [
        {
          model: DeviceModel,
          include: [{ model: Brand }],
        },
      ],
    })
    
    console.log("[v0] Device created successfully:", createdDevice.id)
    res.status(201).json(createdDevice)
  } catch (error) {
    console.error("[v0] Error creating device:", error)
    res.status(500).json({ message: "Error al crear dispositivo", error: error.message })
  }
}

// Update device
export const updateDevice = async (req, res) => {
  try {
    console.log("[v0] updateDevice called with id:", req.params.id)
    console.log("[v0] Update data:", req.body)
    
    const device = await Device.findByPk(req.params.id)
    if (!device) {
      return res.status(404).json({ message: "Dispositivo no encontrado" })
    }
    
    await device.update(req.body)
    
    const updatedDevice = await Device.findByPk(req.params.id, {
      include: [
        {
          model: DeviceModel,
          include: [{ model: Brand }],
        },
      ],
    })
    
    console.log("[v0] Device updated successfully:", updatedDevice.id)
    res.json(updatedDevice)
  } catch (error) {
    console.error("[v0] Error updating device:", error)
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
