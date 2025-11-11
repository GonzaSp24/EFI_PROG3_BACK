import { DataTypes } from "sequelize";
import sequelize from "../../config/database.js";

const Request = sequelize.define(
  "Request",
  {
    id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    nombre: { type: DataTypes.STRING(120), allowNull: false },
    email: { type: DataTypes.STRING(160), allowNull: false },
    dispositivo: { type: DataTypes.STRING(160), allowNull: false },
    descripcion: { type: DataTypes.TEXT, allowNull: false },
    ip: { type: DataTypes.STRING(45), allowNull: true },
    user_agent: { type: DataTypes.STRING(255), allowNull: true },
  },
  {
    tableName: "solicitudes", // nombre real en la base de datos
    timestamps: true,         // crea created_at / updated_at
    underscored: true,        // usa snake_case en las columnas
  }
);

export default Request;
