/**
 * Request logger middleware
 * Logs all incoming requests with timestamp, method, path, and response time
 */
const requestLogger = (req, res, next) => {
    const start = Date.now()
  
    // Log request
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`)
  
    // Log response when finished
    res.on("finish", () => {
      const duration = Date.now() - start
      console.log(`[${new Date().toISOString()}] ${req.method} ${req.path} - ${res.statusCode} (${duration}ms)`)
    })
  
    next()
  }
  
  /**
   * Body logger middleware (for debugging)
   * Logs request body - use only in development
   */
  const bodyLogger = (req, res, next) => {
    if (process.env.NODE_ENV === "development" && req.body && Object.keys(req.body).length > 0) {
      console.log("[Request Body]", JSON.stringify(req.body, null, 2))
    }
    next()
  }
  
  export { requestLogger, bodyLogger }