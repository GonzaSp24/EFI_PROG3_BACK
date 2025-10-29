import jwt from "jsonwebtoken"
import { User, Role } from "../src/models/index.js"

/**
 * Middleware to verify JWT token
 * Extracts token from Authorization header and validates it
 */
const verifyToken = async (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization

    if (!authHeader) {
      return res.status(401).json({
        message: "Token no proporcionado",
      })
    }

    // Extract token (format: "Bearer TOKEN")
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : authHeader

    if (!token) {
      return res.status(401).json({
        message: "Token no válido",
      })
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "supersecreto123")

    // Attach user info to request
    req.user = decoded.user

    // Optionally fetch fresh user data from database
    const user = await User.findByPk(req.user.id, {
      include: [{ model: Role, as: "role" }],
      attributes: { exclude: ["password_hash"] },
    })

    if (!user) {
      return res.status(401).json({
        message: "Usuario no encontrado",
      })
    }

    if (!user.is_active) {
      return res.status(403).json({
        message: "Usuario inactivo",
      })
    }

    // Update req.user with fresh data
    req.user = {
      id: user.id,
      name: user.name,
      email: user.email,
      role_id: user.role_id,
      rol: user.role?.name || "cliente",
    }

    next()
  } catch (error) {
    console.error("[Auth Middleware Error]", error)

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        message: "Token inválido",
      })
    }

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        message: "Token expirado",
      })
    }

    return res.status(500).json({
      message: "Error al verificar token",
      error: error.message,
    })
  }
}

/**
 * Middleware to check if user is admin
 * Must be used after verifyToken
 */
const isAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      message: "Usuario no autenticado",
    })
  }

  // Check if user role is admin (assuming role_id 1 is admin)
  if (req.user.role_id !== 1 && req.user.rol !== "admin") {
    return res.status(403).json({
      message: "Acceso denegado. Se requieren permisos de administrador",
    })
  }

  next()
}

/**
 * Middleware to check if user is technician or admin
 * Must be used after verifyToken
 */
const isTechnician = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      message: "Usuario no autenticado",
    })
  }

  // Check if user role is technician (role_id 2) or admin (role_id 1)
  const allowedRoles = [1, 2]
  const allowedRoleNames = ["admin", "tecnico"]

  if (!allowedRoles.includes(req.user.role_id) && !allowedRoleNames.includes(req.user.rol)) {
    return res.status(403).json({
      message: "Acceso denegado. Se requieren permisos de técnico o administrador",
    })
  }

  next()
}

/**
 * Middleware to check if user owns the resource or is admin
 * Must be used after verifyToken
 */
const isOwnerOrAdmin = (resourceUserIdField = "user_id") => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        message: "Usuario no autenticado",
      })
    }

    // Admin can access everything
    if (req.user.role_id === 1 || req.user.rol === "admin") {
      return next()
    }

    // Check if user owns the resource
    const resourceUserId = req.body[resourceUserIdField] || req.params[resourceUserIdField]

    if (resourceUserId && Number.parseInt(resourceUserId) === req.user.id) {
      return next()
    }

    return res.status(403).json({
      message: "Acceso denegado. No tienes permisos para este recurso",
    })
  }
}

export { verifyToken, isAdmin, isTechnician, isOwnerOrAdmin }