const { body } = require("express-validator")

const repairOrderSchema = [
    body("customer_device_id")
    .notEmpty()
    .withMessage("El customer_device_id es requerido")
    .isInt({ min: 1 })
    .withMessage("El customer_device_id debe ser un número entero positivo"),
    
    body("technician_id").optional().isInt({ min: 1 }).withMessage("El technician_id debe ser un número entero positivo"),
    
    body("status_id")
    .notEmpty()
    .withMessage("El status_id es requerido")
    .isInt({ min: 1 })
    .withMessage("El status_id debe ser un número entero positivo"),
    
    body("reported_issue").trim().notEmpty().withMessage("El problema reportado es requerido"),
    
    body("estimated_cost")
    .optional()
    .isDecimal({ decimal_digits: "0,2" })
    .withMessage("El costo estimado debe ser un número decimal válido"),
    
    body("priority")
    .optional()
    .isIn(["baja", "media", "alta", "urgente"])
    .withMessage("La prioridad debe ser: baja, media, alta o urgente"),
]

const diagnosticSchema = [
    body("repair_order_id")
    .notEmpty()
    .withMessage("El repair_order_id es requerido")
    .isInt({ min: 1 })
    .withMessage("El repair_order_id debe ser un número entero positivo"),
    
    body("technician_id")
    .notEmpty()
    .withMessage("El technician_id es requerido")
    .isInt({ min: 1 })
    .withMessage("El technician_id debe ser un número entero positivo"),
    
    body("findings").trim().notEmpty().withMessage("Los hallazgos son requeridos"),
    
    body("recommended_action").optional().trim(),
]

const repairTaskSchema = [
    body("repair_order_id")
    .notEmpty()
    .withMessage("El repair_order_id es requerido")
    .isInt({ min: 1 })
    .withMessage("El repair_order_id debe ser un número entero positivo"),
    
    body("description").trim().notEmpty().withMessage("La descripción es requerida"),
    
    body("status")
    .optional()
    .isIn(["pendiente", "en_progreso", "completada", "cancelada"])
    .withMessage("El estado debe ser: pendiente, en_progreso, completada o cancelada"),
    
    body("estimated_time")
    .optional()
    .isInt({ min: 0 })
    .withMessage("El tiempo estimado debe ser un número entero positivo"),
]

const orderHistorySchema = [
    body("repair_order_id")
    .notEmpty()
    .withMessage("El repair_order_id es requerido")
    .isInt({ min: 1 })
    .withMessage("El repair_order_id debe ser un número entero positivo"),
    
    body("status_id")
    .notEmpty()
    .withMessage("El status_id es requerido")
    .isInt({ min: 1 })
    .withMessage("El status_id debe ser un número entero positivo"),
    
    body("changed_by")
    .notEmpty()
    .withMessage("El changed_by es requerido")
    .isInt({ min: 1 })
    .withMessage("El changed_by debe ser un número entero positivo"),
    
    body("notes").optional().trim(),
]

const testChecklistItemSchema = [
    body("repair_order_id")
    .notEmpty()
    .withMessage("El repair_order_id es requerido")
    .isInt({ min: 1 })
    .withMessage("El repair_order_id debe ser un número entero positivo"),
    
    body("test_name").trim().notEmpty().withMessage("El nombre de la prueba es requerido"),
    
    body("passed").optional().isBoolean().withMessage("passed debe ser un valor booleano"),
    
    body("notes").optional().trim(),
]

module.exports = {
    repairOrderSchema,
    diagnosticSchema,
    repairTaskSchema,
    orderHistorySchema,
    testChecklistItemSchema,
}
