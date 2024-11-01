"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const Sequelize_1 = __importDefault(require("../config/Sequelize"));
class Product extends sequelize_1.Model {
}
Product.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    product_name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    product_price: {
        type: sequelize_1.DataTypes.STRING,
    },
    qty: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
    },
    product_from: {
        type: sequelize_1.DataTypes.STRING,
    },
    product_color: {
        type: sequelize_1.DataTypes.STRING,
    },
    product_image: {
        type: sequelize_1.DataTypes.STRING,
    },
    product_create: {
        type: sequelize_1.DataTypes.STRING,
    },
    warranty: {
        type: sequelize_1.DataTypes.STRING,
    },
    category: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    image_footer_first: {
        type: sequelize_1.DataTypes.STRING,
    },
    image_footer_second: {
        type: sequelize_1.DataTypes.STRING,
    },
    image_footer_third: {
        type: sequelize_1.DataTypes.STRING,
    },
}, {
    sequelize: Sequelize_1.default,
    modelName: "Product",
    tableName: "tb_products",
    timestamps: false,
    indexes: [
        {
            unique: true,
            fields: ["id"],
        },
    ],
});
exports.default = Product;
