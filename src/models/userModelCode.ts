import { Model, DataTypes } from "sequelize";
import sequelize from "../config/Sequelize";

class UserCode extends Model {}

UserCode.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userid: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    session: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "UserCode",
    tableName: "Tb_code",
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ["userid"],
      },
    ],
  }
);

export default UserCode;
