import { body } from "express-validator"

const quoteSchema = [
  body("repair_order_id")
  .notEmpty()
  .withMessage("El repair_order_id es requerido")
  .isInt({ min: 1 })
  .withMessage("El repair_order_id debe ser un número entero positivo"),
  
  body("subtotal")
  .notEmpty()
  .withMessage("El subtotal es requerido")
  .isDecimal({ decimal_digits: "0,2" })
  .withMessage("El subtotal debe ser un número decimal válido"),
  
  body("tax")
  .optional()
  .isDecimal({ decimal_digits: "0,2" })
  .withMessage("El impuesto debe ser un número decimal válido"),
  
  body("total")
  .notEmpty()
  .withMessage("El total es requerido")
  .isDecimal({ decimal_digits: "0,2" })
  .withMessage("El total debe ser un número decimal válido"),
  
  body("valid_until").optional().isISO8601().withMessage("La fecha de validez debe ser una fecha válida"),
  
  body("status")
  .optional()
  .isIn(["pendiente", "aprobada", "rechazada", "expirada"])
  .withMessage("El estado debe ser: pendiente, aprobada, rechazada o expirada"),
]

const invoiceSchema = [
  body("repair_order_id")
  .notEmpty()
  .withMessage("El repair_order_id es requerido")
  .isInt({ min: 1 })
  .withMessage("El repair_order_id debe ser un número entero positivo"),
  
  body("invoice_number")
  .trim()
  .notEmpty()
  .withMessage("El número de factura es requerido")
  .isLength({ max: 50 })
  .withMessage("El número de factura no puede exceder 50 caracteres"),
  
  body("subtotal")
  .notEmpty()
  .withMessage("El subtotal es requerido")
  .isDecimal({ decimal_digits: "0,2" })
  .withMessage("El subtotal debe ser un número decimal válido"),
  
  body("tax")
  .optional()
  .isDecimal({ decimal_digits: "0,2" })
  .withMessage("El impuesto debe ser un número decimal válido"),
  
  body("total")
  .notEmpty()
  .withMessage("El total es requerido")
  .isDecimal({ decimal_digits: "0,2" })
  .withMessage("El total debe ser un número decimal válido"),
  
  body("status")
  .optional()
  .isIn(["pendiente", "pagada", "cancelada"])
  .withMessage("El estado debe ser: pendiente, pagada o cancelada"),
]

const paymentSchema = [
  body("invoice_id")
  .notEmpty()
  .withMessage("El invoice_id es requerido")
  .isInt({ min: 1 })
  .withMessage("El invoice_id debe ser un número entero positivo"),
  
  body("payment_method_id")
  .notEmpty()
  .withMessage("El payment_method_id es requerido")
  .isInt({ min: 1 })
  .withMessage("El payment_method_id debe ser un número entero positivo"),
  
  body("amount")
  .notEmpty()
  .withMessage("El monto es requerido")
  .isDecimal({ decimal_digits: "0,2" })
  .withMessage("El monto debe ser un número decimal válido"),
  
  body("transaction_id")
  .optional()
  .trim()
  .isLength({ max: 100 })
  .withMessage("El ID de transacción no puede exceder 100 caracteres"),
  
  body("notes").optional().trim(),
]

export { quoteSchema, invoiceSchema, paymentSchema }