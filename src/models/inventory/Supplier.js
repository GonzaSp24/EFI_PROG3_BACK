import { DataTypes } from "sequelize";
import sequelize from "../../config/database.js";

const Supplier = sequelize.define("Supplier", {
    id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    nombre: { type: DataTypes.STRING, allowNull: false },
    contacto: { type: DataTypes.STRING, allowNull: true },
    telefono: { type: DataTypes.STRING, allowNull: true },
    email: { type: DataTypes.STRING, allowNull: true },
    direccion: { type: DataTypes.TEXT, allowNull: true },
}, {
    tableName: "suppliers",
    timestamps: true,
    underscored: true,
});

export default Supplier;
