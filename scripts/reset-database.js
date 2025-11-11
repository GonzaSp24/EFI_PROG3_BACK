// Script para limpiar y resetear la base de datos
import "dotenv/config"

const resetDatabase = async () => {
    try {
        console.log("🗑️  Starting database reset...")
        
        // Import sequelize
        const { sequelize } = await import("../src/models/index.js")
        
        console.log("🔓 Disabling foreign key checks...")
        await sequelize.query("SET FOREIGN_KEY_CHECKS = 0")
        
        // Drop all tables
        console.log("💥 Dropping all tables...")
        await sequelize.drop()
        console.log("✅ All tables dropped")
        
        await sequelize.query("SET FOREIGN_KEY_CHECKS = 1")
        console.log("🔒 Re-enabled foreign key checks")
        
        // Sync all models (recreate tables)
        console.log("🔨 Creating tables from models...")
        await sequelize.sync({ force: true })
        console.log("✅ All tables created")
        
        console.log("\n🎉 Database reset completed successfully!")
        console.log("Now run: npm run seed")
        
        await sequelize.close()
        process.exit(0)
    } catch (error) {
        console.error("❌ Error resetting database:", error)
        process.exit(1)
    }
}

resetDatabase()
