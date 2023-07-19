import { sequelize } from "./database";
import { DataTypes, Model } from "sequelize";

export class Admin extends Model {
  id_admin!: number;
  username!: string;
  password!: string;
}

Admin.init(
  {
    id_admin: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Admin",
  }
);
