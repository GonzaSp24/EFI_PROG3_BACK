const { body } = require("express-validator")

const supplierSchema = [
    body("name")
    .trim()
    .notEmpty()
    .withMessage("El nombre es requerido")
    .isLength({ min: 2, max: 100 })
    .withMessage("El nombre debe tener entre 2 y 100 caracteres"),
    
    body("contact_name")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("El nombre de contacto no puede exceder 100 caracteres"),
    
    body("email").optional().trim().isEmail().withMessage("Debe ser un email válido").normalizeEmail(),
    
    body("phone").optional().trim().isLength({ max: 20 }).withMessage("El teléfono no puede exceder 20 caracteres"),
    
    body("address").optional().trim(),
]

const partSchema = [
    body("name")
    .trim()
    .notEmpty()
    .withMessage("El nombre es requerido")
    .isLength({ min: 1, max: 100 })
    .withMessage("El nombre debe tener entre 1 y 100 caracteres"),
    
    body("sku").optional().trim().isLength({ max: 50 }).withMessage("El SKU no puede exceder 50 caracteres"),
    
    body("category").optional().trim().isLength({ max: 50 }).withMessage("La categoría no puede exceder 50 caracteres"),
    
    body("supplier_id").optional().isInt({ min: 1 }).withMessage("El supplier_id debe ser un número entero positivo"),
    
    body("cost_price")
    .optional()
    .isDecimal({ decimal_digits: "0,2" })
    .withMessage("El precio de costo debe ser un número decimal válido"),
    
    body("selling_price")
    .optional()
    .isDecimal({ decimal_digits: "0,2" })
    .withMessage("El precio de venta debe ser un número decimal válido"),
    
    body("stock_quantity")
    .optional()
    .isInt({ min: 0 })
    .withMessage("La cantidad en stock debe ser un número entero no negativo"),
    
    body("min_stock_level")
    .optional()
    .isInt({ min: 0 })
    .withMessage("El nivel mínimo de stock debe ser un número entero no negativo"),
]

const partCompatibilitySchema = [
    body("part_id")
    .notEmpty()
    .withMessage("El part_id es requerido")
    .isInt({ min: 1 })
    .withMessage("El part_id debe ser un número entero positivo"),
    
    body("device_id")
    .notEmpty()
    .withMessage("El device_id es requerido")
    .isInt({ min: 1 })
    .withMessage("El device_id debe ser un número entero positivo"),
]

const inventoryMovementSchema = [
    body("part_id")
    .notEmpty()
    .withMessage("El part_id es requerido")
    .isInt({ min: 1 })
    .withMessage("El part_id debe ser un número entero positivo"),
    
    body("movement_type")
    .trim()
    .notEmpty()
    .withMessage("El tipo de movimiento es requerido")
    .isIn(["entrada", "salida", "ajuste"])
    .withMessage("El tipo de movimiento debe ser: entrada, salida o ajuste"),
    
    body("quantity")
    .notEmpty()
    .withMessage("La cantidad es requerida")
    .isInt({ min: 1 })
    .withMessage("La cantidad debe ser un número entero positivo"),
    
    body("reason").optional().trim(),
    
    body("repair_order_id")
    .optional()
    .isInt({ min: 1 })
    .withMessage("El repair_order_id debe ser un número entero positivo"),
    
    body("user_id")
    .notEmpty()
    .withMessage("El user_id es requerido")
    .isInt({ min: 1 })
    .withMessage("El user_id debe ser un número entero positivo"),
]

module.exports = {
    supplierSchema,
    partSchema,
    partCompatibilitySchema,
    inventoryMovementSchema,
}
