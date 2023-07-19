import { Model, DataTypes } from "sequelize";
import { sequelize } from "./database";
import Mahasiswa from "./Mahasiswa";
import Matakuliah from "./MataKuliah";
import { EnumNilai } from "@/types/nilai.d";
import { FORMAT_NILAI } from "@/const/nilai";

export class Nilai extends Model {
  id_nilai!: number;
  mahasiswa_id!: number;
  matkul_id!: number;
  nilai!: EnumNilai;

  static associate() {
    Nilai.belongsTo(Mahasiswa, {
      foreignKey: "mahasiswa_id",
    });
    Nilai.belongsTo(Matakuliah, {
      foreignKey: "matkul_id",
    });
  }
}

Nilai.init(
  {
    id_nilai: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    mahasiswa_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    matkul_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    nilai: {
      type: DataTypes.ENUM(...FORMAT_NILAI),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Nilai",
  }
);

export default Nilai;
