"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const Sequelize_1 = __importDefault(require("../config/Sequelize"));
class ProductItems extends sequelize_1.Model {
}
ProductItems.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    pro_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    item_color: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    item_input: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    item_size: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    item_mode: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    item_weight: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    item_data: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    item_color_price: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    item_size_price: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    item_input_price: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    item_weight_price: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    item_data_price: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    creat_at: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    update_at: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
}, {
    sequelize: Sequelize_1.default,
    modelName: "productItemsModel",
    tableName: "Tb_product_items",
    timestamps: false,
    indexes: [
        {
            unique: true,
            fields: ["pro_id"],
        },
        {
            unique: true,
            fields: ["id"],
        },
    ],
});
exports.default = ProductItems;
