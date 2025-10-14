import Attachment from "./shared/Attachment.js";
import Brand from "./devices/Brand.js";
import Customer from "./users/Customer.js";
import CustomerDevice from "./devices/CustomerDevice.js";
import Device from "./devices/Device.js";
import DeviceModel from "./devices/DeviceModel.js";
import Diagnostic from "./orders/Diagnostic.js";
import InventoryMovement from "./inventory/InventoryMovement.js";
import Invoice from "./billing/Invoice.js";
import OrderHistory from "./orders/OrderHistory.js";
import OrderStatus from "./catalogs/OrderStatus.js";
import Part from "./inventory/Part.js";
import PartCompatibility from "./inventory/PartCompatibility.js";
import Payment from "./billing/Payment.js";
import PaymentMethod from "./catalogs/PaymentMethod.js";
import Quote from "./billing/Quote.js";
import QuoteItem from "./billing/QuoteItem.js";
import RepairOrder from "./orders/RepairOrder.js";
import RepairTask from "./orders/RepairTask.js";
import Role from "./catalogs/Role.js";
import Supplier from "./inventory/Supplier.js";
import TestChecklistItem from "./orders/TestChecklistItem.js";
import User from "./users/User.js";

export function applyAssociations() {
    // Catálogos
    User.belongsTo(Role, { foreignKey: "role_id" });
    
    // Users / Customers
    Customer.belongsTo(User, { foreignKey: "user_id" });
    User.hasOne(Customer, { foreignKey: "user_id" });
    
    // Devices
    DeviceModel.belongsTo(Brand, { foreignKey: "brand_id" });
    Device.belongsTo(Brand, { foreignKey: "brand_id" });
    Device.belongsTo(DeviceModel, { foreignKey: "device_model_id" });
    
    CustomerDevice.belongsTo(Customer, { foreignKey: "customer_id" });
    CustomerDevice.belongsTo(Device, { foreignKey: "device_id" });
    Customer.hasMany(CustomerDevice, { foreignKey: "customer_id" });
    Device.hasMany(CustomerDevice, { foreignKey: "device_id" });
    
    // Orders
    RepairOrder.belongsTo(Customer, { foreignKey: "customer_id" });
    RepairOrder.belongsTo(Device, { foreignKey: "device_id" });
    RepairOrder.belongsTo(User, { as: "tecnico", foreignKey: "tecnico_id" });
    RepairOrder.belongsTo(OrderStatus, { foreignKey: "estado_id" });
    
    OrderHistory.belongsTo(RepairOrder, { foreignKey: "order_id" });
    OrderHistory.belongsTo(OrderStatus, { as: "estadoNuevo", foreignKey: "estado_nuevo" });
    OrderHistory.belongsTo(OrderStatus, { as: "estadoAnterior", foreignKey: "estado_anterior" });
    OrderHistory.belongsTo(User, { as: "autor", foreignKey: "cambiado_por" });
    RepairOrder.hasMany(OrderHistory, { foreignKey: "order_id" });
    
    RepairTask.belongsTo(RepairOrder, { foreignKey: "order_id" });
    RepairTask.belongsTo(User, { as: "asignado", foreignKey: "assigned_to" });
    RepairOrder.hasMany(RepairTask, { foreignKey: "order_id" });
    
    Diagnostic.belongsTo(RepairOrder, { foreignKey: "order_id" });
    Diagnostic.belongsTo(User, { as: "diagnostico_por", foreignKey: "tecnico_id" });
    RepairOrder.hasMany(Diagnostic, { foreignKey: "order_id" });
    
    TestChecklistItem.belongsTo(RepairOrder, { foreignKey: "order_id" });
    RepairOrder.hasMany(TestChecklistItem, { foreignKey: "order_id" });
    
    // Inventory
    Part.belongsTo(Supplier, { foreignKey: "supplier_id" });
    PartCompatibility.belongsTo(Part, { foreignKey: "part_id" });
    PartCompatibility.belongsTo(DeviceModel, { foreignKey: "device_model_id" });
    Part.hasMany(PartCompatibility, { foreignKey: "part_id" });
    
    InventoryMovement.belongsTo(Part, { foreignKey: "part_id" });
    InventoryMovement.belongsTo(RepairOrder, { foreignKey: "referencia_order_id" });
    Part.hasMany(InventoryMovement, { foreignKey: "part_id" });
    
    // Billing>
    Quote.belongsTo(RepairOrder, { foreignKey: "order_id" });
    Quote.hasMany(QuoteItem, { foreignKey: "quote_id" });
    QuoteItem.belongsTo(Quote, { foreignKey: "quote_id" });
    QuoteItem.belongsTo(Part, { foreignKey: "part_id" });
    
    Invoice.belongsTo(RepairOrder, { foreignKey: "order_id" });
    Payment.belongsTo(Invoice, { foreignKey: "invoice_id" });
    Payment.belongsTo(PaymentMethod, { foreignKey: "metodo_id" });
    Invoice.hasMany(Payment, { foreignKey: "invoice_id" });
    
    // Attachments
    Attachment.belongsTo(User, { as: "uploader", foreignKey: "subido_por" });
}
