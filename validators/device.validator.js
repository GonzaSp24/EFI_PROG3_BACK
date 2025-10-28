const { body } = require("express-validator")

const brandSchema = [
    body("name")
    .trim()
    .notEmpty()
    .withMessage("El nombre es requerido")
    .isLength({ min: 1, max: 100 })
    .withMessage("El nombre debe tener entre 1 y 100 caracteres"),
]

const deviceModelSchema = [
    body("brand_id")
    .notEmpty()
    .withMessage("El brand_id es requerido")
    .isInt({ min: 1 })
    .withMessage("El brand_id debe ser un número entero positivo"),
    
    body("name")
    .trim()
    .notEmpty()
    .withMessage("El nombre es requerido")
    .isLength({ min: 1, max: 100 })
    .withMessage("El nombre debe tener entre 1 y 100 caracteres"),
]

const deviceSchema = [
    body("model_id")
    .notEmpty()
    .withMessage("El model_id es requerido")
    .isInt({ min: 1 })
    .withMessage("El model_id debe ser un número entero positivo"),
    
    body("type")
    .trim()
    .notEmpty()
    .withMessage("El tipo es requerido")
    .isIn(["smartphone", "tablet", "laptop", "desktop", "otro"])
    .withMessage("El tipo debe ser: smartphone, tablet, laptop, desktop u otro"),
]

const customerDeviceSchema = [
    body("customer_id")
    .notEmpty()
    .withMessage("El customer_id es requerido")
    .isInt({ min: 1 })
    .withMessage("El customer_id debe ser un número entero positivo"),
    
    body("device_id")
    .notEmpty()
    .withMessage("El device_id es requerido")
    .isInt({ min: 1 })
    .withMessage("El device_id debe ser un número entero positivo"),
    
    body("serial_number")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("El número de serie no puede exceder 100 caracteres"),
    
    body("imei").optional().trim().isLength({ max: 50 }).withMessage("El IMEI no puede exceder 50 caracteres"),
    
    body("purchase_date").optional().isISO8601().withMessage("La fecha de compra debe ser una fecha válida"),
]

module.exports = {
    brandSchema,
    deviceModelSchema,
    deviceSchema,
    customerDeviceSchema,
}
