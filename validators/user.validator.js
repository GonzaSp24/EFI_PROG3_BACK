const { body } = require("express-validator")

const userSchema = [
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
    
    body("role_id")
    .notEmpty()
    .withMessage("El role_id es requerido")
    .isInt({ min: 1 })
    .withMessage("El role_id debe ser un número entero positivo"),
    
    body("is_active").optional().isBoolean().withMessage("is_active debe ser un valor booleano"),
]

const updateUserSchema = [
    body("name")
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage("El nombre debe tener entre 2 y 100 caracteres"),
    
    body("email").optional().trim().isEmail().withMessage("Debe ser un email válido").normalizeEmail(),
    
    body("password").optional().isLength({ min: 6 }).withMessage("La contraseña debe tener al menos 6 caracteres"),
    
    body("role_id").optional().isInt({ min: 1 }).withMessage("El role_id debe ser un número entero positivo"),
    
    body("is_active").optional().isBoolean().withMessage("is_active debe ser un valor booleano"),
]

const customerSchema = [
    body("name")
    .trim()
    .notEmpty()
    .withMessage("El nombre es requerido")
    .isLength({ min: 2, max: 100 })
    .withMessage("El nombre debe tener entre 2 y 100 caracteres"),
    
    body("email").optional().trim().isEmail().withMessage("Debe ser un email válido").normalizeEmail(),
    
    body("phone")
    .optional()
    .trim()
    .isLength({ min: 7, max: 20 })
    .withMessage("El teléfono debe tener entre 7 y 20 caracteres"),
    
    body("address").optional().trim().isLength({ max: 255 }).withMessage("La dirección no puede exceder 255 caracteres"),
]

module.exports = {
    userSchema,
    updateUserSchema,
    customerSchema,
}
