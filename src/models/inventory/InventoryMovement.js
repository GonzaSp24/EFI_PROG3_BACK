import { DataTypes } from "sequelize";
import sequelize from "../../config/database.js";

const InventoryMovement = sequelize.define("InventoryMovement", {
    id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    part_id: { type: DataTypes.BIGINT, allowNull: false },     // FK → parts.id
    tipo: { type: DataTypes.STRING, allowNull: false },        // 'ingreso'|'egreso'|'ajuste'
    cantidad: { type: DataTypes.INTEGER, allowNull: false },
    motivo: { type: DataTypes.STRING, allowNull: true },
    referencia_order_id: { type: DataTypes.BIGINT, allowNull: true }, // FK → repair_orders.id
}, {
    tableName: "inventory_movements",
    timestamps: true,
    underscored: true,
    indexes: [{ fields: ["part_id", "created_at"] }],
});

export default InventoryMovement;
