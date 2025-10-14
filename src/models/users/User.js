import { DataTypes } from "sequelize";
import sequelize from "../../config/database.js";

const User = sequelize.define("User", {
    id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password_hash: { type: DataTypes.STRING, allowNull: false }, // bcrypt/argon2
    role_id: { type: DataTypes.BIGINT, allowNull: false },        // FK → roles.id
    is_active: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
}, {
    tableName: "users",
    timestamps: true,
    underscored: true,
});

export default User;
