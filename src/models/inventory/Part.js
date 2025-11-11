import { DataTypes } from "sequelize"
import sequelize from "../../config/database.js"

const Part = sequelize.define(
    "Part",
    {
        id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
        sku: { type: DataTypes.STRING, allowNull: false, unique: true },
        name: { type: DataTypes.STRING, allowNull: false },
        descripcion: { type: DataTypes.TEXT, allowNull: true },
        precio_compra: { type: DataTypes.DECIMAL(12, 2), allowNull: true },
        precio_venta: { type: DataTypes.DECIMAL(12, 2), allowNull: true },
        stock_actual: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
        stock_minimo: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
        supplier_id: { type: DataTypes.BIGINT, allowNull: true },
    },
    {
        tableName: "parts",
        timestamps: true,
        underscored: true,
    },
)

export default Part
