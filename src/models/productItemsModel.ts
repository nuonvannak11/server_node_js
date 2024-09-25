import { Model, DataTypes } from "sequelize";
import sequelize from "../config/Sequelize";

class ProductItems extends Model {}

ProductItems.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    pro_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    item_color: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    item_input: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    item_size: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    item_mode: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    item_weight: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    item_data: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    item_color_price: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    item_size_price: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    item_input_price: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    item_weight_price: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    item_data_price: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    creat_at: {
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
  }
);

export default ProductItems;
