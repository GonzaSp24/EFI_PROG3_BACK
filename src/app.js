import "dotenv/config"

import cors from "cors"
import express from "express"

const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(
    cors({
        origin: process.env.FRONT_URL || "http://localhost:3000",
        credentials: true,
    }),
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Health check (available before DB initialization)
app.get("/health", (req, res) => {
    res.json({ status: "OK", message: "TechFix API is running" })
})

// Initialize database and start server
const initServer = async () => {
    try {
        // Import and initialize database
        const { initDatabase } = await import("./models/index.js")
        
        await initDatabase({
            sync: process.env.SYNC_DB === "true",
            alter: process.env.DB_ALTER === "true",
            force: process.env.DB_FORCE === "true",
        })
        
        console.log("✅ Database initialized successfully")
        
        const authRoutes = (await import("../routes/auth.routes.js")).default
        const brandRoutes = (await import("../routes/brand.routes.js")).default
        const customerRoutes = (await import("../routes/customer.routes.js")).default
        const customerDeviceRoutes = (await import("../routes/customerDevice.routes.js")).default
        const deviceRoutes = (await import("../routes/device.routes.js")).default
        const deviceModelRoutes = (await import("../routes/deviceModel.routes.js")).default
        const diagnosticRoutes = (await import("../routes/diagnostic.routes.js")).default
        const inventoryMovementRoutes = (await import("../routes/inventoryMovement.routes.js")).default
        const invoiceRoutes = (await import("../routes/invoice.routes.js")).default
        const orderHistoryRoutes = (await import("../routes/orderHistory.routes.js")).default
        const orderStatusRoutes = (await import("../routes/orderStatus.routes.js")).default
        const partRoutes = (await import("../routes/part.routes.js")).default
        const partCompatibilityRoutes = (await import("../routes/partCompatibility.routes.js")).default
        const paymentRoutes = (await import("../routes/payment.routes.js")).default
        const paymentMethodRoutes = (await import("../routes/paymentMethod.routes.js")).default
        const quoteRoutes = (await import("../routes/quote.routes.js")).default
        const repairOrderRoutes = (await import("../routes/repairOrder.routes.js")).default
        const repairTaskRoutes = (await import("../routes/repairTask.routes.js")).default
        const solicitudRoutes = (await import("../routes/request.routes.js")).default
        const roleRoutes = (await import("../routes/role.routes.js")).default
        const supplierRoutes = (await import("../routes/supplier.routes.js")).default
        const testChecklistItemRoutes = (await import("../routes/testChecklistItem.routes.js")).default
        const userRoutes = (await import("../routes/user.routes.js")).default
        
        app.get("/", (req, res) => {
            res.json({
                message: "TechFix API",
                version: "1.0.0",
                endpoints: {
                    health: "/health",
                    api: "/api/*",
                },
            })
        })
        
        // API Routes
        app.use("/api/auth", authRoutes)
        app.use("/api/brands", brandRoutes)
        app.use("/api/customers", customerRoutes)
        app.use("/api/customer-devices", customerDeviceRoutes)
        app.use("/api/devices", deviceRoutes)
        app.use("/api/device-models", deviceModelRoutes)
        app.use("/api/diagnostics", diagnosticRoutes)
        app.use("/api/inventory-movements", inventoryMovementRoutes)
        app.use("/api/invoices", invoiceRoutes)
        app.use("/api/order-history", orderHistoryRoutes)
        app.use("/api/order-statuses", orderStatusRoutes)
        app.use("/api/parts", partRoutes)
        app.use("/api/part-compatibility", partCompatibilityRoutes)
        app.use("/api/payments", paymentRoutes)
        app.use("/api/payment-methods", paymentMethodRoutes)
        app.use("/api/quotes", quoteRoutes)
        app.use("/api/repair-orders", repairOrderRoutes)
        app.use("/api/repair-tasks", repairTaskRoutes)
        app.use("/api/request", solicitudRoutes)
        app.use("/api/roles", roleRoutes)
        app.use("/api/suppliers", supplierRoutes)
        app.use("/api/test-checklist-items", testChecklistItemRoutes)
        app.use("/api/users", userRoutes)
        
        // 404 handler
        app.use((req, res) => {
            res.status(404).json({ error: "Endpoint not found" })
        })
        
        // Error handler
        app.use((err, req, res, next) => {
            console.error(err.stack)
            res.status(err.status || 500).json({
                error: err.message || "Internal server error",
            })
        })
        
        // Start server
        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`)
            console.log(`📍 API available at http://localhost:${PORT}`)
            console.log(`🏥 Health check: http://localhost:${PORT}/health`)
        })
    } catch (error) {
        console.error("❌ Failed to start server:", error)
        process.exit(1)
    }
}

initServer()
