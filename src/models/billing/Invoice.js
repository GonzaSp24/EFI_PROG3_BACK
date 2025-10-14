import { DataTypes } from "sequelize";
import sequelize from "../../config/database.js";

const Invoice = sequelize.define("Invoice", {
    id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    order_id: { type: DataTypes.BIGINT, allowNull: false }, // FK → repair_orders.id
    numero: { type: DataTypes.STRING, allowNull: false, unique: true },
    fecha_emision: { type: DataTypes.DATEONLY, allowNull: false, defaultValue: DataTypes.NOW },
    currency: { type: DataTypes.STRING, allowNull: false, defaultValue: "ARS" },
    subtotal: { type: DataTypes.DECIMAL(12, 2), allowNull: false },
    impuestos: { type: DataTypes.DECIMAL(12, 2), allowNull: false, defaultValue: 0 },
    total: { type: DataTypes.DECIMAL(12, 2), allowNull: false }, // podés calcular al crear
    estado: { type: DataTypes.STRING, allowNull: false, defaultValue: "pendiente" }, // 'pendiente','pagada','anulada'
}, {
    tableName: "invoices",
    timestamps: true,
    underscored: true,
    indexes: [{ fields: ["order_id", "estado"] }],
});

export default Invoice;
