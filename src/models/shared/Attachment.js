import { DataTypes } from "sequelize";
import sequelize from "../../config/database.js";

const Attachment = sequelize.define("Attachment", {
  id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
  entity: { type: DataTypes.STRING, allowNull: false },   // 'repair_orders','diagnostics','quotes','invoices',...
  entity_id: { type: DataTypes.BIGINT, allowNull: false },
  filename: { type: DataTypes.STRING, allowNull: false },
  mimetype: { type: DataTypes.STRING, allowNull: false },
  size_bytes: { type: DataTypes.INTEGER, allowNull: false },
  url: { type: DataTypes.STRING, allowNull: false },      // o storage_key
  subido_por: { type: DataTypes.BIGINT, allowNull: false }, // FK → users.id
}, {
  tableName: "attachments",
  timestamps: true,
  underscored: true,
  indexes: [{ fields: ["entity", "entity_id"] }],
});

export default Attachment;
