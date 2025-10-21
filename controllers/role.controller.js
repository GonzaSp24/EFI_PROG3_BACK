const { Role } = require("../index")
const { roleSchema } = require("../validators/catalog.validator")

// Get all roles
exports.getAllRoles = async (req, res) => {
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
exports.getRoleById = async (req, res) => {
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
exports.createRole = async (req, res) => {
  try {
    const validatedData = roleSchema.parse(req.body)
    const role = await Role.create(validatedData)
    res.status(201).json(role)
  } catch (error) {
    if (error.name === "ZodError") {
      return res.status(400).json({ message: "Datos inválidos", errors: error.errors })
    }
    res.status(500).json({ message: "Error al crear rol", error: error.message })
  }
}

// Update role
exports.updateRole = async (req, res) => {
  try {
    const validatedData = roleSchema.parse(req.body)
    const role = await Role.findByPk(req.params.id)
    if (!role) {
      return res.status(404).json({ message: "Rol no encontrado" })
    }
    await role.update(validatedData)
    res.json(role)
  } catch (error) {
    if (error.name === "ZodError") {
      return res.status(400).json({ message: "Datos inválidos", errors: error.errors })
    }
    res.status(500).json({ message: "Error al actualizar rol", error: error.message })
  }
}

// Delete role
exports.deleteRole = async (req, res) => {
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
