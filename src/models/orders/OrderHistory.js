import { DataTypes } from "sequelize";
import sequelize from "../../config/database.js";

const OrderHistory = sequelize.define("OrderHistory", {
    id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    order_id: { type: DataTypes.BIGINT, allowNull: false },      // FK → repair_orders.id
    estado_anterior: { type: DataTypes.BIGINT, allowNull: true }, // FK → order_statuses.id
    estado_nuevo: { type: DataTypes.BIGINT, allowNull: false },   // FK → order_statuses.id
    cambiado_por: { type: DataTypes.BIGINT, allowNull: false },   // FK → users.id
    comentario: { type: DataTypes.TEXT, allowNull: true },
}, {
    tableName: "orders_history",
    timestamps: true,
    underscored: true,
});

export default OrderHistory;
