import { DataTypes } from "sequelize";
import sequelize from "../../config/database.js";

const Payment = sequelize.define("Payment", {
    id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    invoice_id: { type: DataTypes.BIGINT, allowNull: false }, // FK → invoices.id
    monto: { type: DataTypes.DECIMAL(12, 2), allowNull: false },
    metodo_id: { type: DataTypes.BIGINT, allowNull: false },  // FK → payment_methods.id
    fecha: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    referencia: { type: DataTypes.STRING, allowNull: true },
}, {
    tableName: "payments",
    timestamps: true,
    underscored: true,
    indexes: [{ fields: ["invoice_id", "metodo_id"] }],
});

export default Payment;
