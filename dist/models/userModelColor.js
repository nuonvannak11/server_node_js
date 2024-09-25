"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const Sequelize_1 = __importDefault(require("../config/Sequelize"));
class UserColor extends sequelize_1.Model {
}
UserColor.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userid: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    color_theme: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    create_at: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    update_at: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
}, {
    sequelize: Sequelize_1.default,
    modelName: "UserColor",
    tableName: "Tb_color",
    timestamps: false,
    indexes: [
        {
            unique: true,
            fields: ["userid"],
        },
    ],
});
exports.default = UserColor;
