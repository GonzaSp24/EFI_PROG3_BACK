import { DataTypes } from "sequelize"
import sequelize from "../../config/database.js"

const Request = sequelize.define(
  "Request",
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING(120),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(160),
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    dispositivo: {
      type: DataTypes.STRING(160),
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    ip: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    user_agent: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    tableName: "solicitudes",
    timestamps: true,
    underscored: true,
  },
)

export default Request
