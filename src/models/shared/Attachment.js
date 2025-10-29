import { DataTypes } from "sequelize"
import sequelize from "../../config/database.js"

const Attachment = sequelize.define(
  "Attachment",
  {
    id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    entidad_tipo: { type: DataTypes.STRING, allowNull: false }, // 'repair_orders','diagnostics','quotes','invoices',...
    entidad_id: { type: DataTypes.BIGINT, allowNull: false },
    nombre_archivo: { type: DataTypes.STRING, allowNull: false },
    tipo_mime: { type: DataTypes.STRING, allowNull: true },
    tamano: { type: DataTypes.INTEGER, allowNull: true },
    ruta_archivo: { type: DataTypes.STRING, allowNull: false }, // storage path or URL
    subido_por: { type: DataTypes.BIGINT, allowNull: true }, // FK → users.id
  },
  {
    tableName: "attachments",
    timestamps: true,
    underscored: true,
    indexes: [{ fields: ["entidad_tipo", "entidad_id"] }],
  },
)

export default Attachment