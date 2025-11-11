// Script para poblar la base de datos con datos iniciales
import "dotenv/config"

import bcrypt from "bcryptjs"

const seedDatabase = async () => {
    try {
        console.log("🌱 Starting database seeding...")
        
        // Import models
        const { models, sequelize } = await import("../src/models/index.js")
        
        // 1. Seed Roles
        console.log("📝 Seeding roles...")
        const roles = await models.Role.bulkCreate([{ code: "admin" }, { code: "tecnico" }, { code: "recepcionista" }], {
            ignoreDuplicates: true,
        })
        console.log(`✅ Created ${roles.length} roles`)
        
        // 2. Seed Order Statuses
        console.log("📝 Seeding order statuses...")
        const statuses = await models.OrderStatus.bulkCreate(
            [
                { code: "recibida" },
                { code: "diagnostico" },
                { code: "presupuestada" },
                { code: "aprobada" },
                { code: "en_reparacion" },
                { code: "reparada" },
                { code: "entregada" },
                { code: "cancelada" },
            ],
            { ignoreDuplicates: true },
        )
        console.log(`✅ Created ${statuses.length} order statuses`)
        
        // 3. Seed Payment Methods
        console.log("📝 Seeding payment methods...")
        const paymentMethods = await models.PaymentMethod.bulkCreate(
            [
                { code: "efectivo" },
                { code: "tarjeta_debito" },
                { code: "tarjeta_credito" },
                { code: "transferencia" },
                { code: "mercadopago" },
            ],
            { ignoreDuplicates: true },
        )
        console.log(`✅ Created ${paymentMethods.length} payment methods`)
        
        // 4. Seed Users
        console.log("📝 Seeding users...")
        const adminRole = await models.Role.findOne({ where: { code: "admin" } })
        const tecnicoRole = await models.Role.findOne({ where: { code: "tecnico" } })
        
        const hashedPassword = await bcrypt.hash("admin123", 10)
        
        const users = await models.User.bulkCreate(
            [
                {
                    email: "admin@techfix.com",
                    password_hash: hashedPassword,
                    first_name: "Admin",
                    last_name: "TechFix",
                    phone: "1234567890",
                    role_id: adminRole.id,
                    is_active: true,
                },
                {
                    email: "tecnico@techfix.com",
                    password_hash: hashedPassword,
                    first_name: "Juan",
                    last_name: "Pérez",
                    phone: "0987654321",
                    role_id: tecnicoRole.id,
                    is_active: true,
                },
            ],
            { ignoreDuplicates: true },
        )
        console.log(`✅ Created ${users.length} users`)
        
        // 5. Seed Brands
        console.log("📝 Seeding brands...")
        const brands = await models.Brand.bulkCreate(
            [
                { name: "Apple" },
                { name: "Samsung" },
                { name: "Xiaomi" },
                { name: "Motorola" },
                { name: "Huawei" },
                { name: "LG" },
                { name: "Sony" },
                { name: "Nokia" },
            ],
            { ignoreDuplicates: true },
        )
        console.log(`✅ Created ${brands.length} brands`)
        
        // 6. Seed Device Models
        console.log("📝 Seeding device models...")
        const appleBrand = await models.Brand.findOne({ where: { name: "Apple" } })
        const samsungBrand = await models.Brand.findOne({ where: { name: "Samsung" } })
        
        const deviceModels = await models.DeviceModel.bulkCreate(
            [
                { brand_id: appleBrand.id, name: "iPhone 13", category: "smartphone" },
                { brand_id: appleBrand.id, name: "iPhone 14", category: "smartphone" },
                { brand_id: appleBrand.id, name: "iPhone 15", category: "smartphone" },
                { brand_id: appleBrand.id, name: "MacBook Air M1", category: "laptop" },
                { brand_id: samsungBrand.id, name: "Galaxy S23", category: "smartphone" },
                { brand_id: samsungBrand.id, name: "Galaxy A54", category: "smartphone" },
                { brand_id: samsungBrand.id, name: "Galaxy Tab S8", category: "tablet" },
            ],
            { ignoreDuplicates: true },
        )
        console.log(`✅ Created ${deviceModels.length} device models`)
        
        // 7. Seed Customers
        console.log("📝 Seeding customers...")
        const customers = await models.Customer.bulkCreate(
            [
                {
                    name: "María González",
                    email: "maria@example.com",
                    phone: "1122334455",
                    address: "Av. Siempre Viva 123",
                },
                {
                    name: "Carlos Rodríguez",
                    email: "carlos@example.com",
                    phone: "5544332211",
                    address: "Calle Falsa 456",
                },
                {
                    name: "Ana Martínez",
                    email: "ana@example.com",
                    phone: "9988776655",
                    address: "Boulevard Principal 789",
                },
            ],
            { ignoreDuplicates: true },
        )
        console.log(`✅ Created ${customers.length} customers`)
        
        // 8. Seed Suppliers
        console.log("📝 Seeding suppliers...")
        const suppliers = await models.Supplier.bulkCreate(
            [
                {
                    name: "Repuestos Tech SA",
                    contact_name: "Pedro Gómez",
                    phone: "1111222233",
                    email: "ventas@repuestostech.com",
                    address: "Zona Industrial 100",
                },
                {
                    name: "Distribuidora Móvil",
                    contact_name: "Laura Fernández",
                    phone: "4444555566",
                    email: "info@distribuidoramovil.com",
                    address: "Centro Comercial 200",
                },
            ],
            { ignoreDuplicates: true },
        )
        console.log(`✅ Created ${suppliers.length} suppliers`)
        
        // 9. Seed Devices
        console.log("📝 Seeding devices...")
        const iphone13Model = await models.DeviceModel.findOne({ where: { name: "iPhone 13" } })
        const galaxyS23Model = await models.DeviceModel.findOne({ where: { name: "Galaxy S23" } })
        
        const devices = await models.Device.bulkCreate(
            [
                {
                    brand_id: appleBrand.id,
                    device_model_id: iphone13Model.id,
                    serial_number: "IP13-2024-001",
                    physical_state: "bueno",
                },
                {
                    brand_id: appleBrand.id,
                    device_model_id: iphone13Model.id,
                    serial_number: "IP13-2024-002",
                    physical_state: "rayado",
                },
                {
                    brand_id: samsungBrand.id,
                    device_model_id: galaxyS23Model.id,
                    serial_number: "S23-2024-001",
                    physical_state: "bueno",
                },
                {
                    brand_id: samsungBrand.id,
                    device_model_id: galaxyS23Model.id,
                    serial_number: "S23-2024-002",
                    physical_state: "golpeado",
                },
            ],
            { ignoreDuplicates: true },
        )
        console.log(`✅ Created ${devices.length} devices`)
        
        // 10. Seed Customer Devices (linking customers with their devices)
        console.log("📝 Seeding customer devices...")
        const customer1 = customers[0]
        const customer2 = customers[1]
        const device1 = devices[0]
        const device2 = devices[2]
        
        const customerDevices = await models.CustomerDevice.bulkCreate(
            [
                {
                    customer_id: customer1.id,
                    device_id: device1.id,
                    nickname: "Mi iPhone",
                },
                {
                    customer_id: customer2.id,
                    device_id: device2.id,
                    nickname: "Samsung Principal",
                },
            ],
            { ignoreDuplicates: true },
        )
        console.log(`✅ Created ${customerDevices.length} customer devices`)
        
        // 11. Seed Repair Orders
        console.log("📝 Seeding repair orders...")
        const estadoRecibida = await models.OrderStatus.findOne({ where: { code: "recibida" } })
        const estadoDiagnostico = await models.OrderStatus.findOne({ where: { code: "diagnostico" } })
        const tecnico = users[1]
        
        const repairOrders = await models.RepairOrder.bulkCreate(
            [
                {
                    customer_id: customer1.id,
                    device_id: device1.id,
                    tecnico_id: tecnico.id,
                    estado_id: estadoDiagnostico.id,
                    problema_reportado: "Pantalla rota",
                    prioridad: "alta",
                    fecha_ingreso: new Date(),
                    fecha_estimada: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
                },
                {
                    customer_id: customer2.id,
                    device_id: device2.id,
                    tecnico_id: tecnico.id,
                    estado_id: estadoRecibida.id,
                    problema_reportado: "No enciende",
                    prioridad: "media",
                    fecha_ingreso: new Date(),
                    fecha_estimada: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
                },
            ],
            { ignoreDuplicates: true },
        )
        console.log(`✅ Created ${repairOrders.length} repair orders`)
        
        // 12. Seed Repair Tasks
        console.log("📝 Seeding repair tasks...")
        const order1 = repairOrders[0]
        const order2 = repairOrders[1]
        
        const repairTasks = await models.RepairTask.bulkCreate(
            [
                {
                    order_id: order1.id,
                    titulo: "Revisar pantalla",
                    descripcion: "Inspeccionar daños en la pantalla",
                    estado: "completado",
                    assigned_to: tecnico.id,
                    tiempo_invertido_min: 30,
                    position: 1,
                },
                {
                    order_id: order1.id,
                    titulo: "Reemplazar pantalla",
                    descripcion: "Instalar nueva pantalla OLED",
                    estado: "en_progreso",
                    assigned_to: tecnico.id,
                    tiempo_invertido_min: 45,
                    position: 2,
                },
                {
                    order_id: order2.id,
                    titulo: "Diagnóstico inicial",
                    descripcion: "Revisar por qué no enciende el dispositivo",
                    estado: "pendiente",
                    assigned_to: tecnico.id,
                    tiempo_invertido_min: 0,
                    position: 1,
                },
            ],
            { ignoreDuplicates: true },
        )
        console.log(`✅ Created ${repairTasks.length} repair tasks`)
        
        // 13. Seed Parts
        console.log("📝 Seeding parts...")
        const supplier1 = await models.Supplier.findOne({ where: { name: "Repuestos Tech SA" } })
        
        const parts = await models.Part.bulkCreate(
            [
                {
                    sku: "SCR-IP13-001",
                    name: "Pantalla iPhone 13",
                    description: "Pantalla OLED original para iPhone 13",
                    purchase_price: 15000,
                    selling_price: 25000,
                    current_stock: 10,
                    minimum_stock: 2,
                    supplier_id: supplier1.id,
                },
                {
                    sku: "BAT-IP13-001",
                    name: "Batería iPhone 13",
                    description: "Batería de alta capacidad para iPhone 13",
                    purchase_price: 8000,
                    selling_price: 15000,
                    current_stock: 15,
                    minimum_stock: 3,
                    supplier_id: supplier1.id,
                },
                {
                    sku: "SCR-S23-001",
                    name: "Pantalla Samsung S23",
                    description: "Pantalla AMOLED para Samsung Galaxy S23",
                    purchase_price: 18000,
                    selling_price: 30000,
                    current_stock: 8,
                    minimum_stock: 2,
                    supplier_id: supplier1.id,
                },
            ],
            { ignoreDuplicates: true },
        )
        console.log(`✅ Created ${parts.length} parts`)
        
        console.log("\n🎉 Database seeding completed successfully!")
        console.log("\n📊 Summary:")
        console.log(`   - Roles: ${roles.length}`)
        console.log(`   - Order Statuses: ${statuses.length}`)
        console.log(`   - Payment Methods: ${paymentMethods.length}`)
        console.log(`   - Users: ${users.length}`)
        console.log(`   - Brands: ${brands.length}`)
        console.log(`   - Device Models: ${deviceModels.length}`)
        console.log(`   - Customers: ${customers.length}`)
        console.log(`   - Suppliers: ${suppliers.length}`)
        console.log(`   - Devices: ${devices.length}`)
        console.log(`   - Customer Devices: ${customerDevices.length}`)
        console.log(`   - Repair Orders: ${repairOrders.length}`)
        console.log(`   - Repair Tasks: ${repairTasks.length}`)
        console.log(`   - Parts: ${parts.length}`)
        console.log("\n🔐 Test credentials:")
        console.log("   Email: admin@techfix.com")
        console.log("   Password: admin123")
        
        await sequelize.close()
        process.exit(0)
    } catch (error) {
        console.error("❌ Error seeding database:", error)
        process.exit(1)
    }
}

seedDatabase()
