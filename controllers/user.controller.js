import { User, Role } from "../src/models/index.js"
import bcrypt from "bcryptjs"

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      include: [{ model: Role, as: "role" }],
      attributes: { exclude: ["password_hash"] },
    })

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" })
    }

    res.json(user)
  } catch (error) {
    res.status(500).json({ message: "Error al obtener perfil", error: error.message })
  }
}

// Get all users
export const getAllUsers = async (req, res) => {
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
export const getUserById = async (req, res) => {
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
export const createUser = async (req, res) => {
  try {
    // Hash password
    const password_hash = await bcrypt.hash(req.body.password, 10)

    const user = await User.create({
      ...req.body,
      password_hash,
      password: undefined,
    })

    // Return user without password
    const userResponse = user.toJSON()
    delete userResponse.password_hash

    res.status(201).json(userResponse)
  } catch (error) {
    res.status(500).json({ message: "Error al crear usuario", error: error.message })
  }
}

// Update user
export const updateUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id)

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" })
    }

    const updateData = { ...req.body }

    // Hash password if provided
    if (updateData.password) {
      updateData.password_hash = await bcrypt.hash(updateData.password, 10)
      delete updateData.password
    }

    await user.update(updateData)

    // Return user without password
    const userResponse = user.toJSON()
    delete userResponse.password_hash

    res.json(userResponse)
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar usuario", error: error.message })
  }
}

// Delete user
export const deleteUser = async (req, res) => {
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
export const toggleUserStatus = async (req, res) => {
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
