"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const sequelizeOptions = {
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: parseInt(process.env.PORT || "3306", 10),
    dialect: "mysql",
    logging: console.log,
};
const sequelize = new sequelize_typescript_1.Sequelize(sequelizeOptions);
exports.default = sequelize;
