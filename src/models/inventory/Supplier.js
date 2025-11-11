import { DataTypes } from "sequelize"
import sequelize from "../../config/database.js"

const Supplier = sequelize.define(
    "Supplier",
    {
        id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
        name: { type: DataTypes.STRING, allowNull: false },
        contact_name: { type: DataTypes.STRING, allowNull: true },
        phone: { type: DataTypes.STRING, allowNull: true },
        email: { type: DataTypes.STRING, allowNull: true },
        address: { type: DataTypes.TEXT, allowNull: true },
    },
    {
        tableName: "suppliers",
        timestamps: true,
        underscored: true,
    },
)

export default Supplier
