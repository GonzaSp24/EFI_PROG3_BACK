import { DataTypes } from "sequelize";
import sequelize from "../../config/database.js";

const Quote = sequelize.define("Quote", {
    id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    order_id: { type: DataTypes.BIGINT, allowNull: false }, // FK → repair_orders.id
    monto_mano_obra: { type: DataTypes.DECIMAL(12, 2), allowNull: false, defaultValue: 0 },
    monto_repuestos: { type: DataTypes.DECIMAL(12, 2), allowNull: false, defaultValue: 0 },
    otros_cargos: { type: DataTypes.DECIMAL(12, 2), allowNull: false, defaultValue: 0 },
    validez_hasta: { type: DataTypes.DATEONLY, allowNull: true },
    estado: { type: DataTypes.STRING, allowNull: false, defaultValue: "enviado" }, // 'enviado','aprobado',...
    comentarios_cliente: { type: DataTypes.TEXT, allowNull: true },
}, {
    tableName: "quotes",
    timestamps: true,
    underscored: true,
    indexes: [{ fields: ["order_id", "estado"] }],
});

export default Quote;
