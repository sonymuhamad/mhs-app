import { Model, DataTypes } from "sequelize";
import { sequelize } from "./database"; // Adjust the path to your database configuration file
import { Prodi } from "./Prodi"; // Import the Prodi model to create the foreign key
import Matakuliah from "./MataKuliah";
import Nilai from "./Nilai";

export class Mahasiswa extends Model {
  id_mahasiswa!: number;
  nama!: string;
  nim!: string;
  kelas!: string;
  tahun!: number;
  rfid!: string;

  static associate() {
    Mahasiswa.belongsToMany(Matakuliah, {
      through: Nilai,
      foreignKey: "mahasiswa_id",
      otherKey: "matkul_id",
    });
  }
}

Mahasiswa.init(
  {
    id_mahasiswa: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nama: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nim: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    rfid: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    kelas: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tahun: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Mahasiswa", // Set the model name to 'Mahasiswa'
  }
);

// Set up the foreign key relationship
Mahasiswa.belongsTo(Prodi, {
  foreignKey: "prodi_id",
});

export default Mahasiswa;
