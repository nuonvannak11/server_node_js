import { Model, DataTypes } from "sequelize";
import sequelize from "../config/Sequelize";
import Product from "./productModel";

class UserOrder extends Model {}

UserOrder.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    qty: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    amount: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    discount: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    pay_type: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    delivery: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    create_at: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    update_at: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "UserOrder",
    tableName: "tb_orders",
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ["id"],
      },
    ],
  }
);

export default UserOrder;
