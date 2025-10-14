import { DataTypes } from "sequelize";
import sequelize from "../../config/database.js";

const PaymentMethod = sequelize.define("PaymentMethod", {
    id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    code: { type: DataTypes.STRING, allowNull: false, unique: true }, // 'efectivo','tarjeta','transferencia','mp'
}, {
    tableName: "payment_methods",
    timestamps: true,
    underscored: true,
});

export default PaymentMethod;
