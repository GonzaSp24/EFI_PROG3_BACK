import { DataTypes } from "sequelize";
import sequelize from "../../config/database.js";

const Diagnostic = sequelize.define("Diagnostic", {
    id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    order_id: { type: DataTypes.BIGINT, allowNull: false },  // FK → repair_orders.id
    hallazgos: { type: DataTypes.TEXT, allowNull: true },
    tests_realizados: { type: DataTypes.JSONB ?? DataTypes.JSON, allowNull: true }, // usa JSONB si tu dialécto es PG
    resultado: { type: DataTypes.STRING, allowNull: true }, // 'falla_confirmada','no_reproduce','intermitente'
    tecnico_id: { type: DataTypes.BIGINT, allowNull: false }, // FK → users.id
}, {
    tableName: "diagnostics",
    timestamps: true,
    underscored: true,
});

export default Diagnostic;
