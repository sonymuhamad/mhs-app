import { Model, DataTypes } from "sequelize";
import { sequelize } from "./database"; // Adjust the path to your database configuration file

export class Prodi extends Model {
  id_prodi!: number;
  nama_prodi!: string;
}

Prodi.init(
  {
    id_prodi: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nama_prodi: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Prodi", // Set the model name to 'Prodi'
  }
);

export default Prodi;
