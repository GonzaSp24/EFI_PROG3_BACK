// Shared
import Attachment from "./shared/Attachment.js"
// Devices
import Brand from "./devices/Brand.js"
import Customer from "./users/Customer.js"
import CustomerDevice from "./devices/CustomerDevice.js"
import Device from "./devices/Device.js"
import DeviceModel from "./devices/DeviceModel.js"
import Diagnostic from "./orders/Diagnostic.js"
import InventoryMovement from "./inventory/InventoryMovement.js"
import Invoice from "./billing/Invoice.js"
import OrderHistory from "./orders/OrderHistory.js"
import OrderStatus from "./catalogs/OrderStatus.js"
import Part from "./inventory/Part.js"
import PartCompatibility from "./inventory/PartCompatibility.js"
import Payment from "./billing/Payment.js"
import PaymentMethod from "./catalogs/PaymentMethod.js"
// Billing
import Quote from "./billing/Quote.js"
import QuoteItem from "./billing/QuoteItem.js"
// Orders
import RepairOrder from "./orders/RepairOrder.js"
import RepairTask from "./orders/RepairTask.js"
// Catalogs
import Role from "./catalogs/Role.js"
// Requests
import Request from "./requests/Request.js"
// Inventory
import Supplier from "./inventory/Supplier.js"
import TestChecklistItem from "./orders/TestChecklistItem.js"
// Users & Customers
import User from "./users/User.js"
// Associations
import { applyAssociations } from "./associations.js"
// models/index.js
import sequelize from "../config/database.js"

// Colección de modelos para exportar/usar en servicios
export const models = {
    // Catalogs
    Role,
    OrderStatus,
    PaymentMethod,
    // Users
    User,
    Customer,
    // Devices
    Brand,
    DeviceModel,
    Device,
    CustomerDevice,
    // Requests
    Request,
    // Orders
    RepairOrder,
    OrderHistory,
    RepairTask,
    Diagnostic,
    TestChecklistItem,
    // Inventory
    Supplier,
    Part,
    PartCompatibility,
    InventoryMovement,
    // Billing
    Quote,
    QuoteItem,
    Invoice,
    Payment,
    // Shared
    Attachment,
}

// Inicializa DB, aplica asociaciones y (opcional) sincroniza
export async function initDatabase(options = {}) {
    const {
        sync = false, // true para ejecutar sequelize.sync()
        alter = false, // true para auto-migraciones suaves (DEV)
        force = false, // true para recrear tablas (¡destructivo!)
        log = console.log, // función de log
    } = options
    
    try {
        await sequelize.authenticate()
        log?.("✅ DB autenticada.")
        
        // Aplico asociaciones una sola vez
        applyAssociations()
        
        if (sync) {
            await sequelize.sync({ alter, force })
            if (force) log?.("⚠️  Tablas recreadas (force: true).")
                else if (alter) log?.("✅ Tablas sincronizadas (alter: true).")
                    else log?.("✅ Tablas sincronizadas.")
        }
        
        return { sequelize, models }
    } catch (err) {
        console.error("❌ Error inicializando la DB:", err)
        throw err
    }
}

export {
    // Catalogs
    Role,
    OrderStatus,
    PaymentMethod,
    // Users
    User,
    Customer,
    // Devices
    Brand,
    DeviceModel,
    Device,
    CustomerDevice,
    // Orders
    RepairOrder,
    OrderHistory,
    RepairTask,
    Diagnostic,
    TestChecklistItem,
    // Inventory
    Supplier,
    Part,
    PartCompatibility,
    InventoryMovement,
    // Billing
    Quote,
    QuoteItem,
    Invoice,
    Payment,
    // Shared
    Attachment,
    // Database
    sequelize,
}

// Export por defecto por comodidad
export default {
    sequelize,
    models,
    initDatabase,
}