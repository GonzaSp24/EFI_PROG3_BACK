import { DataTypes } from "sequelize";
import sequelize from "../../config/database.js";

const CustomerDevice = sequelize.define("CustomerDevice", {
    id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    customer_id: { type: DataTypes.BIGINT, allowNull: false },
    device_id: { type: DataTypes.BIGINT, allowNull: false },
    fecha_alta: { type: DataTypes.DATEONLY, allowNull: false, defaultValue: DataTypes.NOW },
    fecha_baja: { type: DataTypes.DATEONLY, allowNull: true },
    es_propietario_actual: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
}, {
    tableName: "customer_device",
    timestamps: true,
    underscored: true,
    indexes: [
        // NOTA: la UNIQUE parcial (cuando es_propietario_actual = true) no se expresa nativa en Sequelize.
        { fields: ["customer_id", "device_id"] },
    ],
});

export default CustomerDevice;
