// import { Prodi } from "./Prodi"; // Import the Prodi model to create the foreign key
import { EnumNilai } from "@/types/nilai.d";
import { FORMAT_NILAI } from "@/const/nilai";

import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  HasManyGetAssociationsMixin,
  Association,
  Attributes,
} from "sequelize";

import { Sequelize } from "sequelize";
import mysql2 from "mysql2";

const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    dialect: "mysql",
    dialectModule: mysql2,
    port: 3306,
  }
);

class Mahasiswa extends Model<
  InferAttributes<Mahasiswa>,
  InferCreationAttributes<Mahasiswa>
> {
  id_mahasiswa!: number;
  nama!: string;
  nim!: string;
  kelas!: string;
  tahun!: number;
  rfid!: string;

  declare getNilais: HasManyGetAssociationsMixin<Nilai>;
  public declare static associations: {
    nilais: Association<Mahasiswa, Nilai>;
  };
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
    modelName: "Mahasiswa", // Set the model name to 'Mahasiswa'
    sequelize,
  }
);

class Prodi extends Model<
  InferAttributes<Prodi>,
  InferCreationAttributes<Prodi>
> {
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

class Nilai extends Model<
  InferAttributes<Nilai>,
  InferCreationAttributes<Nilai>
> {
  id_nilai!: number;
  mahasiswa_id!: number;
  matkul_id!: number;
  nilai!: EnumNilai;
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

class Matakuliah extends Model<
  InferAttributes<Matakuliah>,
  InferCreationAttributes<Matakuliah>
> {
  id_matkul!: number;
  nama!: string;
  kode!: string;
  sks!: number;
  semester!: "Ganjil" | "Genap"; // Use enum for semester values
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
    modelName: "Matakuliah", // Set the model name to 'Matakuliah'
    sequelize,
  }
);

class Admin extends Model<
  InferAttributes<Admin>,
  InferCreationAttributes<Admin>
> {
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

Matakuliah.hasMany(Nilai, {
  foreignKey: "matkul_id",
});

Nilai.belongsTo(Mahasiswa, {
  foreignKey: "mahasiswa_id",
});

Nilai.belongsTo(Matakuliah, {
  foreignKey: "matkul_id",
});

Prodi.hasMany(Mahasiswa, {
  foreignKey: "prodi_id",
});

// Set up the foreign key relationship
Mahasiswa.belongsTo(Prodi, {
  foreignKey: "prodi_id",
});
Mahasiswa.hasMany(Nilai, {
  foreignKey: "mahasiswa_id",
});

export { Mahasiswa, Prodi, Matakuliah, Nilai, Admin };

type ProdiType = Attributes<Prodi>;
type MahasiswaType = Attributes<Mahasiswa>;
type MatakuliahType = Attributes<Matakuliah>;
type NilaiType = Attributes<Nilai>;
type AdminType = Attributes<Admin>;

export type { ProdiType, MahasiswaType, MatakuliahType, NilaiType, AdminType };
