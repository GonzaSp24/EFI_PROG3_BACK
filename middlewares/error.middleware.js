/**
* Centralized error handling middleware
* Catches all errors and formats them consistently
*/
const errorHandler = (err, req, res, next) => {
    console.error("[Error Handler]", {
        message: err.message,
        stack: err.stack,
        path: req.path,
        method: req.method,
    })
    
    // Default error
    let statusCode = err.statusCode || 500
    let message = err.message || "Error interno del servidor"
    
    // Sequelize validation errors
    if (err.name === "SequelizeValidationError") {
        statusCode = 400
        message = "Error de validación"
        const errors = err.errors.map((e) => ({
            field: e.path,
            message: e.message,
        }))
        return res.status(statusCode).json({
            status: statusCode,
            message,
            errors,
        })
    }
    
    // Sequelize unique constraint errors
    if (err.name === "SequelizeUniqueConstraintError") {
        statusCode = 409
        message = "El registro ya existe"
        const errors = err.errors.map((e) => ({
            field: e.path,
            message: e.message,
        }))
        return res.status(statusCode).json({
            status: statusCode,
            message,
            errors,
        })
    }
    
    // Sequelize foreign key constraint errors
    if (err.name === "SequelizeForeignKeyConstraintError") {
        statusCode = 400
        message = "Referencia inválida. El registro relacionado no existe"
        return res.status(statusCode).json({
            status: statusCode,
            message,
        })
    }
    
    // Sequelize database errors
    if (err.name === "SequelizeDatabaseError") {
        statusCode = 500
        message = "Error de base de datos"
        return res.status(statusCode).json({
            status: statusCode,
            message: process.env.NODE_ENV === "development" ? err.message : message,
        })
    }
    
    // JWT errors
    if (err.name === "JsonWebTokenError") {
        statusCode = 401
        message = "Token inválido"
    }
    
    if (err.name === "TokenExpiredError") {
        statusCode = 401
        message = "Token expirado"
    }
    
    // Send error response
    res.status(statusCode).json({
        status: statusCode,
        message,
        ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    })
}

/**
* 404 Not Found handler
* Should be placed after all routes
*/
const notFound = (req, res, next) => {
    const error = new Error(`Ruta no encontrada - ${req.originalUrl}`)
    error.statusCode = 404
    next(error)
}

module.exports = {
    errorHandler,
    notFound,
}
