const { body } = require("express-validator")
const { validate } = require("../middlewares/validation.middleware")

const registerSchema = [
    body("name")
    .trim()
    .notEmpty()
    .withMessage("El nombre es requerido")
    .isLength({ min: 2, max: 100 })
    .withMessage("El nombre debe tener entre 2 y 100 caracteres"),
    
    body("email")
    .trim()
    .notEmpty()
    .withMessage("El email es requerido")
    .isEmail()
    .withMessage("Debe ser un email válido")
    .normalizeEmail(),
    
    body("password")
    .notEmpty()
    .withMessage("La contraseña es requerida")
    .isLength({ min: 6 })
    .withMessage("La contraseña debe tener al menos 6 caracteres"),
    
    body("role_id").optional().isInt({ min: 1 }).withMessage("El role_id debe ser un número entero positivo"),
]

const loginSchema = [
    body("email")
    .trim()
    .notEmpty()
    .withMessage("El email es requerido")
    .isEmail()
    .withMessage("Debe ser un email válido")
    .normalizeEmail(),
    
    body("password").notEmpty().withMessage("La contraseña es requerida"),
]

const forgotPasswordSchema = [
    body("email")
    .trim()
    .notEmpty()
    .withMessage("El email es requerido")
    .isEmail()
    .withMessage("Debe ser un email válido")
    .normalizeEmail(),
]

const resetPasswordSchema = [
    body("id")
    .notEmpty()
    .withMessage("El ID es requerido")
    .isInt({ min: 1 })
    .withMessage("El ID debe ser un número entero positivo"),
    
    body("token").notEmpty().withMessage("El token es requerido"),
    
    body("password")
    .notEmpty()
    .withMessage("La contraseña es requerida")
    .isLength({ min: 6 })
    .withMessage("La contraseña debe tener al menos 6 caracteres"),
]

module.exports = {
    registerSchema,
    loginSchema,
    forgotPasswordSchema,
    resetPasswordSchema,
    validate,
}
