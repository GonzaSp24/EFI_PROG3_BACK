import { DataTypes } from "sequelize";
import sequelize from "../../config/database.js";

const RepairTask = sequelize.define("RepairTask", {
    id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    order_id: { type: DataTypes.BIGINT, allowNull: false },  // FK → repair_orders.id
    titulo: { type: DataTypes.STRING, allowNull: false },
    descripcion: { type: DataTypes.TEXT, allowNull: true },
    estado: { type: DataTypes.STRING, allowNull: false, defaultValue: "pendiente" },
    tiempo_invertido_min: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    assigned_to: { type: DataTypes.BIGINT, allowNull: true }, // FK → users.id
    position: { type: DataTypes.INTEGER, allowNull: true },
}, {
    tableName: "repair_tasks",
    timestamps: true,
    underscored: true,
    indexes: [
        { fields: ["order_id"] },
        { fields: ["estado"] },
        { fields: ["assigned_to"] },
    ],
});

export default RepairTask;
