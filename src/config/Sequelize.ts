import { Sequelize } from "sequelize-typescript";
import { SequelizeOptions } from "sequelize-typescript";
import { config } from "dotenv";
config();

const sequelizeOptions: SequelizeOptions = {
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: parseInt(process.env.PORT || "3306", 10),
  dialect: "mysql",
  logging: console.log,
};

const sequelize = new Sequelize(sequelizeOptions);

export default sequelize;
