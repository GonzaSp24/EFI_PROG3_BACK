import { Role } from "../src/models/index.js"

// Get all roles
export const getAllRoles = async (req, res) => {
  try {
    const roles = await Role.findAll({
      order: [["id", "ASC"]],
    })
    res.json(roles)
  } catch (error) {
    res.status(500).json({ message: "Error al obtener roles", error: error.message })
  }
}

// Get role by ID
export const getRoleById = async (req, res) => {
  try {
    const role = await Role.findByPk(req.params.id)
    if (!role) {
      return res.status(404).json({ message: "Rol no encontrado" })
    }
    res.json(role)
  } catch (error) {
    res.status(500).json({ message: "Error al obtener rol", error: error.message })
  }
}

// Create role
export const createRole = async (req, res) => {
  try {
    const role = await Role.create(req.body)
    res.status(201).json(role)
  } catch (error) {
    res.status(500).json({ message: "Error al crear rol", error: error.message })
  }
}

// Update role
export const updateRole = async (req, res) => {
  try {
    const role = await Role.findByPk(req.params.id)
    if (!role) {
      return res.status(404).json({ message: "Rol no encontrado" })
    }
    await role.update(req.body)
    res.json(role)
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar rol", error: error.message })
  }
}

// Delete role
export const deleteRole = async (req, res) => {
  try {
    const role = await Role.findByPk(req.params.id)
    if (!role) {
      return res.status(404).json({ message: "Rol no encontrado" })
    }
    await role.destroy()
    res.json({ message: "Rol eliminado correctamente" })
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar rol", error: error.message })
  }
}
