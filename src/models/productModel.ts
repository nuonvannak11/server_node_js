import { Model, DataTypes } from "sequelize";
import sequelize from "../config/Sequelize";

class Product extends Model {
  public id!: number;
  public product_name!: string;
  public product_price!: string;
  public qty!: number;
  public description!: string;
  public product_from!: string;
  public product_color!: string;
  public product_image!: string;
  public product_create!: string;
  public warranty!: string;
  public category!: string;
  public image_footer_first!: string;
  public image_footer_second!: string;
  public image_footer_third!: string;
}

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
    modelName: "Tb_product",
    timestamps: false,
  }
);

export default Product;
