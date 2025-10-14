import { DataTypes } from "sequelize";
import sequelize from "../../config/database.js";

const Brand = sequelize.define("Brand", {
    id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
}, {
    tableName: "brands",
    timestamps: true,
    underscored: true,
});

export default Brand;
