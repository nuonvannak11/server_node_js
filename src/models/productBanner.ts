import { Model, DataTypes } from "sequelize";
import sequelize from "../config/Sequelize";

class ProductBanner extends Model {
  public id!: number;
  public name!: string;
  public discount!: string;
  public open_time!: string;
  public close_time!: string;
  public language!: string;
  public title!: string;
  public description!: string;
  public image!: string;
  public category!: string;
}

ProductBanner.init(
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
    discount: {
      type: DataTypes.STRING,
    },
    open_time: {
      type: DataTypes.INTEGER,
    },
    close_time: {
      type: DataTypes.STRING,
    },
    title: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
    },
    category: {
      type: DataTypes.STRING,
    },
    language: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "Tb_banner",
    timestamps: false,
  }
);

export default ProductBanner;
