import { DataTypes } from "sequelize";
import sequelize from "../../config/database.js";

const PartCompatibility = sequelize.define("PartCompatibility", {
    id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    part_id: { type: DataTypes.BIGINT, allowNull: false },            // FK → parts.id
    device_model_id: { type: DataTypes.BIGINT, allowNull: false },    // FK → device_models.id
}, {
    tableName: "part_compatibility",
    timestamps: true,
    underscored: true,
    indexes: [
        { unique: true, fields: ["part_id", "device_model_id"] },
    ],
});

export default PartCompatibility;
