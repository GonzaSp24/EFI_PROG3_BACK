import { DataTypes } from "sequelize"
import sequelize from "../../config/database.js"

const DeviceModel = sequelize.define(
    "DeviceModel",
    {
        id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
        brand_id: { type: DataTypes.BIGINT, allowNull: false }, // FK → brands.id
        name: { type: DataTypes.STRING, allowNull: false },
    },
    {
        tableName: "device_models",
        timestamps: true,
        underscored: true,
        indexes: [{ unique: true, fields: ["brand_id", "name"] }],
    },
)

export default DeviceModel