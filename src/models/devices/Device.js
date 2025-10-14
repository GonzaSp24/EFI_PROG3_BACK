import { DataTypes } from "sequelize";
import sequelize from "../../config/database.js";

const Device = sequelize.define("Device", {
    id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    brand_id: { type: DataTypes.BIGINT, allowNull: false },
    device_model_id: { type: DataTypes.BIGINT, allowNull: false },
    serial_number: { type: DataTypes.STRING, allowNull: false, unique: true },
    physical_state: { type: DataTypes.STRING, allowNull: false, defaultValue: "pendiente" },
}, {
    tableName: "devices",
    timestamps: true,
    underscored: true,
});

export default Device;
