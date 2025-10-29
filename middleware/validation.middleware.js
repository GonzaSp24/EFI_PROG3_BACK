import { validationResult } from "express-validator"

/**
* Middleware to validate request using express-validator
* Checks for validation errors and returns them in a consistent format
*/
export const validate = (validations) => {
  return async (req, res, next) => {
    // Run all validations
    for (const validation of validations) {
      const result = await validation.run(req)
      if (result.errors.length) break
    }
    
    // Check for errors
    const errors = validationResult(req)
    
    if (errors.isEmpty()) {
      return next()
    }
    
    // Format errors
    const extractedErrors = []
    errors.array().map((err) => {
      extractedErrors.push({
        field: err.path || err.param,
        message: err.msg,
      })
    })
    
    return res.status(400).json({
      status: 400,
      message: "Error de validación",
      errors: extractedErrors,
    })
  }
}