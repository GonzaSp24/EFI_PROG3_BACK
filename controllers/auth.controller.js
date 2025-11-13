import { Role, User } from "../src/models/index.js"

import bcrypt from "bcryptjs"
import crypto from "crypto"
import jwt from "jsonwebtoken"
import { sendEmail } from "../utils/nodemailer.js"

// In-memory store for reset tokens (consider using Redis in production)
const resetTokens = new Map()

const resetEmailTemplate = ({ nombre, resetUrl }) => {
  return `
    <div style="max-width: 520px; margin:0; padding: 20px;">
      <h2>Recupera tu contraseña</h2>
      <p>Hola ${nombre || ""}, recibimos tu solicitud para restablecer la contraseña.</p>
      <p>Haz click en el botón para continuar.</p>
      <p>
        <a href="${resetUrl}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px;">
          Cambiar contraseña
        </a>
      </p>
      <p>Si no fuiste tú, puedes ignorar este mensaje.</p>
      <p style="color: #666; font-size: 12px;">Este enlace expira en 15 minutos.</p>
    </div>
  `
}

const register = async (req, res) => {
  const { name, email, password, role_id } = req.body

  try {
    // Check if user already exists
    const userExist = await User.findOne({ where: { email } })
    if (userExist) {
      return res.status(400).json({ message: "El usuario ya existe" })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Get default role if not provided (assuming role_id 3 is 'cliente')
    const finalRoleId = role_id || 3

    // Create user
    const newUser = await User.create({
      name,
      email,
      password_hash: hashedPassword,
      role_id: finalRoleId,
      is_active: true,
    })

    // Get user with role
    const userWithRole = await User.findByPk(newUser.id, {
      include: [{ model: Role }],
      attributes: { exclude: ["password_hash"] },
    })

    res.status(201).json({
      message: "Usuario registrado exitosamente",
      data: userWithRole,
    })
  } catch (error) {
    console.error("[Register Error]", error)
    res.status(500).json({
      status: 500,
      message: "Error al crear el usuario",
      error: error.message,
    })
  }
}

const login = async (req, res) => {
  const { email, password } = req.body

  console.log("[v0] Login attempt for email:", email)

  try {
    const userExist = await User.findOne({
      where: { email },
      include: [{ model: Role }],
    })

    console.log("[v0] User found:", userExist ? "Yes" : "No")

    if (!userExist) {
      console.log("[v0] User not found in database")
      return res.status(400).json({ message: "Usuario no encontrado" })
    }

    // Check if user is active
    if (!userExist.is_active) {
      console.log("[v0] User is inactive")
      return res.status(403).json({ message: "Usuario inactivo" })
    }

    // Validate password
    console.log("[v0] Validating password...")
    const validPassword = await bcrypt.compare(password, userExist.password_hash)
    console.log("[v0] Password valid:", validPassword)

    if (!validPassword) {
      return res.status(403).json({ message: "Contraseña incorrecta" })
    }

    const user = {
      id: userExist.id,
      name: userExist.name,
      email: userExist.email,
      rol: userExist.Role?.nombre || "cliente",
      role_id: userExist.role_id,
    }

    console.log("[v0] Generating JWT token for user:", user.id)

    // Generate JWT token
    const token = jwt.sign({ user }, process.env.JWT_SECRET || "supersecreto123", { expiresIn: "8h" })

    console.log("[v0] Login successful for user:", user.email)

    res.json({
      message: "Inicio de sesión exitoso",
      token,
      user,
    })
  } catch (error) {
    console.error("[v0] Login Error:", error)
    res.status(500).json({
      status: 500,
      message: "Error al iniciar sesión",
      error: error.message,
    })
  }
}

const forgotPassword = async (req, res) => {
  const { email } = req.body

  console.log("[v0] forgotPassword called with email:", email)

  try {
    console.log("[v0] Looking up user in database...")
    const user = await User.findOne({ where: { email } })
    console.log("[v0] User found:", user ? `${user.name} (${user.email})` : "No user found")

    if (!user) {
      console.log("[v0] User does not exist, returning 400")
      return res.status(400).json({ message: "El usuario no existe" })
    }

    console.log("[v0] Generating reset token...")
    const rawToken = crypto.randomBytes(32).toString("hex")
    const tokenHash = crypto.createHash("sha256").update(rawToken).digest("hex")
    const expiresAt = Date.now() + 15 * 60 * 1000 // 15 minutes

    console.log("[v0] Storing token in memory for user ID:", user.id)
    resetTokens.set(user.id, { tokenHash, expiresAt })

    const resetUrl = `${process.env.FRONT_URL || "http://localhost:5173"}/recuperar-contraseña?token=${rawToken}&id=${user.id}`
    console.log("[v0] Reset URL generated:", resetUrl)

    console.log("[v0] Attempting to send email to:", user.email)
    console.log("[v0] MAIL_FROM env var:", process.env.MAIL_FROM)
    console.log("[v0] SMTP_HOST:", process.env.SMTP_HOST)
    console.log("[v0] SMTP_PORT:", process.env.SMTP_PORT)

    await sendEmail({
      to: user.email,
      subject: "Recuperar contraseña - TechFix",
      html: resetEmailTemplate({ nombre: user.name, resetUrl }),
      from: process.env.MAIL_FROM,
    })

    console.log("[v0] Email sent successfully!")
    res.json({ message: "Email de recuperación enviado exitosamente" })
  } catch (error) {
    console.error("[v0] forgotPassword ERROR:", error.message)
    console.error("[v0] Error stack:", error.stack)
    return res.status(500).json({
      message: "Error al enviar el email",
      error: error.message,
    })
  }
}

const resetPassword = async (req, res) => {
  const { id, token, password } = req.body

  if (!id || !token || !password) {
    return res.status(400).json({ message: "Faltan datos" })
  }

  try {
    // Get stored token
    const entry = resetTokens.get(Number(id))
    if (!entry) {
      return res.status(400).json({ message: "Token inválido o expirado" })
    }

    // Check expiration
    if (entry.expiresAt < Date.now()) {
      resetTokens.delete(Number(id))
      return res.status(400).json({ message: "Token expirado" })
    }

    // Verify token
    const tokenHash = crypto.createHash("sha256").update(token).digest("hex")
    if (tokenHash !== entry.tokenHash) {
      return res.status(400).json({ message: "Token inválido" })
    }

    // Find user
    const user = await User.findByPk(id)
    if (!user) {
      return res.status(400).json({ message: "El usuario no existe" })
    }

    // Update password
    user.password_hash = await bcrypt.hash(password, 10)
    await user.save()

    // Delete used token
    resetTokens.delete(Number(id))

    return res.status(200).json({ message: "Contraseña actualizada exitosamente" })
  } catch (error) {
    console.error("[Reset Password Error]", error)
    return res.status(500).json({
      message: "Error al resetear contraseña",
      error: error.message,
    })
  }
}

export { register, login, forgotPassword, resetPassword }
