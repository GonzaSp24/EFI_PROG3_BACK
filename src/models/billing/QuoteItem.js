import { DataTypes } from "sequelize";
import sequelize from "../../config/database.js";

const QuoteItem = sequelize.define("QuoteItem", {
    id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    quote_id: { type: DataTypes.BIGINT, allowNull: false },   // FK → quotes.id
    tipo: { type: DataTypes.STRING, allowNull: false },       // 'mano_obra'|'repuesto'|'otro'
    part_id: { type: DataTypes.BIGINT, allowNull: true },     // FK → parts.id
    descripcion: { type: DataTypes.STRING, allowNull: false },
    cantidad: { type: DataTypes.DECIMAL(10, 2), allowNull: false, defaultValue: 1 },
    precio_unitario: { type: DataTypes.DECIMAL(12, 2), allowNull: false, defaultValue: 0 },
    subtotal: { type: DataTypes.DECIMAL(12, 2), allowNull: false },
}, {
    tableName: "quote_items",
    timestamps: true,
    underscored: true,
});

export default QuoteItem;
