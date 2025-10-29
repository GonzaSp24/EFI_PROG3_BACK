// Script para poblar la base de datos con datos iniciales
require("dotenv").config()

const seedDatabase = async () => {
    try {
        console.log("🌱 Starting database seeding...")
        
        // Import models
        const { models, sequelize } = await import("../src/models/index.js")
        const bcrypt = require("bcryptjs")
        
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
                    password: hashedPassword,
                    first_name: "Admin",
                    last_name: "TechFix",
                    phone: "1234567890",
                    role_id: adminRole.id,
                    is_active: true,
                },
                {
                    email: "tecnico@techfix.com",
                    password: hashedPassword,
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
                    first_name: "María",
                    last_name: "González",
                    email: "maria@example.com",
                    phone: "1122334455",
                    address: "Av. Siempre Viva 123",
                },
                {
                    first_name: "Carlos",
                    last_name: "Rodríguez",
                    email: "carlos@example.com",
                    phone: "5544332211",
                    address: "Calle Falsa 456",
                },
                {
                    first_name: "Ana",
                    last_name: "Martínez",
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
        
        // 9. Seed Parts
        console.log("📝 Seeding parts...")
        const supplier1 = await models.Supplier.findOne({ where: { name: "Repuestos Tech SA" } })
        
        const parts = await models.Part.bulkCreate(
            [
                {
                    name: "Pantalla iPhone 13",
                    description: "Pantalla OLED original",
                    sku: "SCR-IP13-001",
                    cost_price: 15000,
                    sale_price: 25000,
                    stock_quantity: 10,
                    min_stock_level: 2,
                    supplier_id: supplier1.id,
                },
                {
                    name: "Batería iPhone 13",
                    description: "Batería de litio 3095mAh",
                    sku: "BAT-IP13-001",
                    cost_price: 8000,
                    sale_price: 15000,
                    stock_quantity: 15,
                    min_stock_level: 3,
                    supplier_id: supplier1.id,
                },
                {
                    name: "Pantalla Samsung S23",
                    description: "Pantalla AMOLED original",
                    sku: "SCR-SS23-001",
                    cost_price: 18000,
                    sale_price: 30000,
                    stock_quantity: 8,
                    min_stock_level: 2,
                    supplier_id: supplier1.id,
                },
            ],
            { ignoreDuplicates: true },
        )
        console.log(`✅ Created ${parts.length} parts`)
        
        console.log("🎉 Database seeding completed successfully!")
        console.log("\n📊 Summary:")
        console.log(`   - Roles: ${roles.length}`)
        console.log(`   - Order Statuses: ${statuses.length}`)
        console.log(`   - Payment Methods: ${paymentMethods.length}`)
        console.log(`   - Users: ${users.length}`)
        console.log(`   - Brands: ${brands.length}`)
        console.log(`   - Device Models: ${deviceModels.length}`)
        console.log(`   - Customers: ${customers.length}`)
        console.log(`   - Suppliers: ${suppliers.length}`)
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
