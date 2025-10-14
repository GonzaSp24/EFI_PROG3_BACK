import { DataTypes } from "sequelize";
import sequelize from "../../config/database.js";

const Role = sequelize.define("Role", {
    id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    code: { type: DataTypes.STRING, allowNull: false, unique: true }, // 'admin', 'tecnico'
}, {
    tableName: "roles",
    timestamps: true,
    underscored: true,
});

export default Role;
