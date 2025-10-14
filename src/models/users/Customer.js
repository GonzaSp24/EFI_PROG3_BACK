import { DataTypes } from "sequelize";
import sequelize from "../../config/database.js";

const Customer = sequelize.define("Customer", {
    id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    user_id: { type: DataTypes.BIGINT, allowNull: true, unique: true }, // portal cliente opcional
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: true, unique: true },
    phone: { type: DataTypes.STRING, allowNull: true },
    address: { type: DataTypes.TEXT, allowNull: true },
    created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    deleted_at: { type: DataTypes.DATE, allowNull: true },
}, {
    tableName: "customers",
    timestamps: true,
    underscored: true,
    paranoid: false, // si querés soft-delete nativo de Sequelize, poné true y usa deletedAt
});

export default Customer;
