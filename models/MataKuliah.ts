import { Model, DataTypes } from "sequelize";
import { sequelize } from "./database"; // Adjust the path to your database configuration file
import Mahasiswa from "./Mahasiswa";
import Nilai from "./Nilai";

export class Matakuliah extends Model {
  id_matkul!: number;
  nama!: string;
  kode!: string;
  sks!: number;
  semester!: "Ganjil" | "Genap"; // Use enum for semester values

  static associate() {
    Matakuliah.belongsToMany(Mahasiswa, {
      through: Nilai,
      foreignKey: "matkul_id",
      otherKey: "mahasiswa_id",
    });
  }
}

Matakuliah.init(
  {
    id_matkul: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nama: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    kode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sks: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    semester: {
      type: DataTypes.ENUM("Ganjil", "Genap"),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Matakuliah", // Set the model name to 'Matakuliah'
  }
);

export default Matakuliah;
