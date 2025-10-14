import { DataTypes } from "sequelize";
import sequelize from "../../config/database.js";

const TestChecklistItem = sequelize.define("TestChecklistItem", {
    id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    order_id: { type: DataTypes.BIGINT, allowNull: false }, // FK → repair_orders.id
    item: { type: DataTypes.STRING, allowNull: false },
    ok: { type: DataTypes.BOOLEAN, allowNull: true },
    observaciones: { type: DataTypes.TEXT, allowNull: true },
}, {
    tableName: "test_checklist_items",
    timestamps: true,
    underscored: true,
});

export default TestChecklistItem;
