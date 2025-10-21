const { User, Role } = require("../index")
const { userSchema, updateUserSchema } = require("../validators/user.validator")
const bcrypt = require("bcrypt")

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      include: [{ model: Role, as: "role" }],
      attributes: { exclude: ["password_hash"] },
      order: [["id", "ASC"]],
    })
    res.json(users)
  } catch (error) {
    res.status(500).json({ message: "Error al obtener usuarios", error: error.message })
  }
}

// Get user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      include: [{ model: Role, as: "role" }],
      attributes: { exclude: ["password_hash"] },
    })
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" })
    }
    res.json(user)
  } catch (error) {
    res.status(500).json({ message: "Error al obtener usuario", error: error.message })
  }
}

// Create user
exports.createUser = async (req, res) => {
  try {
    const validatedData = userSchema.parse(req.body)

    // Hash password
    const password_hash = await bcrypt.hash(validatedData.password, 10)

    const user = await User.create({
      ...validatedData,
      password_hash,
      password: undefined,
    })

    // Return user without password
    const userResponse = user.toJSON()
    delete userResponse.password_hash

    res.status(201).json(userResponse)
  } catch (error) {
    if (error.name === "ZodError") {
      return res.status(400).json({ message: "Datos inválidos", errors: error.errors })
    }
    res.status(500).json({ message: "Error al crear usuario", error: error.message })
  }
}

// Update user
exports.updateUser = async (req, res) => {
  try {
    const validatedData = updateUserSchema.parse(req.body)
    const user = await User.findByPk(req.params.id)

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" })
    }

    // Hash password if provided
    if (validatedData.password) {
      validatedData.password_hash = await bcrypt.hash(validatedData.password, 10)
      delete validatedData.password
    }

    await user.update(validatedData)

    // Return user without password
    const userResponse = user.toJSON()
    delete userResponse.password_hash

    res.json(userResponse)
  } catch (error) {
    if (error.name === "ZodError") {
      return res.status(400).json({ message: "Datos inválidos", errors: error.errors })
    }
    res.status(500).json({ message: "Error al actualizar usuario", error: error.message })
  }
}

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id)
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" })
    }
    await user.destroy()
    res.json({ message: "Usuario eliminado correctamente" })
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar usuario", error: error.message })
  }
}

// Toggle user active status
exports.toggleUserStatus = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id)
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" })
    }

    await user.update({ is_active: !user.is_active })

    const userResponse = user.toJSON()
    delete userResponse.password_hash

    res.json(userResponse)
  } catch (error) {
    res.status(500).json({ message: "Error al cambiar estado del usuario", error: error.message })
  }
}
