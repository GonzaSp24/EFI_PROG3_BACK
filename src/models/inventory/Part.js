import { DataTypes } from "sequelize";
import sequelize from "../../config/database.js";

const Part = sequelize.define("Part", {
    id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    nombre: { type: DataTypes.STRING, allowNull: false },
    compatible_tipo: { type: DataTypes.STRING, allowNull: true }, // 'telefono','laptop'
    costo_unitario: { type: DataTypes.DECIMAL(12, 2), allowNull: false, defaultValue: 0 },
    precio_sugerido: { type: DataTypes.DECIMAL(12, 2), allowNull: false, defaultValue: 0 },
    stock_minimo: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    supplier_id: { type: DataTypes.BIGINT, allowNull: true }, // FK → suppliers.id
}, {
    tableName: "parts",
    timestamps: true,
    underscored: true,
});

export default Part;
