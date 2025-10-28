const { body } = require("express-validator")

const roleSchema = [
    body("name")
    .trim()
    .notEmpty()
    .withMessage("El nombre es requerido")
    .isLength({ min: 2, max: 50 })
    .withMessage("El nombre debe tener entre 2 y 50 caracteres"),
    
    body("description").optional().trim(),
]

const orderStatusSchema = [
    body("name")
    .trim()
    .notEmpty()
    .withMessage("El nombre es requerido")
    .isLength({ min: 2, max: 50 })
    .withMessage("El nombre debe tener entre 2 y 50 caracteres"),
    
    body("description").optional().trim(),
]

const paymentMethodSchema = [
    body("name")
    .trim()
    .notEmpty()
    .withMessage("El nombre es requerido")
    .isLength({ min: 2, max: 50 })
    .withMessage("El nombre debe tener entre 2 y 50 caracteres"),
    
    body("is_active").optional().isBoolean().withMessage("is_active debe ser un valor booleano"),
]

module.exports = {
    roleSchema,
    orderStatusSchema,
    paymentMethodSchema,
}
