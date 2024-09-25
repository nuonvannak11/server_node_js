import { Model, DataTypes } from "sequelize";
import sequelize from "../config/Sequelize";

class UserColor extends Model {}

UserColor.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    color_theme: {
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
    modelName: "UserColor",
    tableName: "Tb_color",
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ["userid"],
      },
    ],
  }
);

export default UserColor;
