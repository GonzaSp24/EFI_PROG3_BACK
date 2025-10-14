import { DataTypes } from "sequelize";
import sequelize from "../../config/database.js";

const OrderStatus = sequelize.define("OrderStatus", {
    id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    code: { type: DataTypes.STRING, allowNull: false, unique: true }, // 'recibida', 'diagnostico', ...
}, {
    tableName: "order_statuses",
    timestamps: true,
    underscored: true,
});

export default OrderStatus;
