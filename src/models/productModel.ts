import { Model, DataTypes } from "sequelize";
import sequelize from "../config/Sequelize";

class Product extends Model {}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    product_price: {
      type: DataTypes.STRING,
    },
    qty: {
      type: DataTypes.INTEGER,
    },
    description: {
      type: DataTypes.STRING,
    },
    product_from: {
      type: DataTypes.STRING,
    },
    product_color: {
      type: DataTypes.STRING,
    },
    product_image: {
      type: DataTypes.STRING,
    },
    product_create: {
      type: DataTypes.STRING,
    },
    warranty: {
      type: DataTypes.STRING,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image_footer_first: {
      type: DataTypes.STRING,
    },
    image_footer_second: {
      type: DataTypes.STRING,
    },
    image_footer_third: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "Product",
    tableName: "tb_products",
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ["id"],
      },
    ],
  }
);

export default Product;
