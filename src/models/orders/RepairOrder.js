import { DataTypes } from "sequelize"
import sequelize from "../../config/database.js"

const RepairOrder = sequelize.define(
    "RepairOrder",
    {
        id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
        customer_id: { type: DataTypes.BIGINT, allowNull: false },
        device_id: { type: DataTypes.BIGINT, allowNull: false },
        tecnico_id: { type: DataTypes.BIGINT, allowNull: false },
        prioridad: { type: DataTypes.STRING, allowNull: false, defaultValue: "media" },
        fecha_recibido: { type: DataTypes.DATE, allowNull: false },
        fecha_entrega_estimada: { type: DataTypes.DATE, allowNull: true },
        problema_reportado: { type: DataTypes.TEXT, allowNull: false },
        costo_estimado: { type: DataTypes.DECIMAL(12, 2), allowNull: true },
        estado_id: { type: DataTypes.BIGINT, allowNull: false }, // FK → order_statuses.id
        descripcion_equipo: { type: DataTypes.TEXT, allowNull: true },
        accesorios_recibidos: { type: DataTypes.TEXT, allowNull: true },
        contacto_preferido: { type: DataTypes.STRING, allowNull: true },
        presupuesto_autorizado: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
        anticipo_monto: { type: DataTypes.DECIMAL(12, 2), allowNull: true },
        deleted_at: { type: DataTypes.DATE, allowNull: true },
    },
    {
        tableName: "repair_orders",
        timestamps: true,
        underscored: true,
    },
)

export default RepairOrder
