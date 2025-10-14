import { DataTypes } from "sequelize";
import sequelize from "../../config/database.js";

const DeviceModel = sequelize.define("DeviceModel", {
    id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    brand_id: { type: DataTypes.BIGINT, allowNull: false },   // FK → brands.id
    model: { type: DataTypes.STRING, allowNull: false },
    device_type: { type: DataTypes.STRING, allowNull: false }, // 'telefono','laptop',...
}, {
    tableName: "device_models",
    timestamps: true,
    underscored: true,
    indexes: [
        { unique: true, fields: ["brand_id", "model"] },
    ],
});

export default DeviceModel;
