"use strict";

const FORMAT_NILAI = [
  "A",
  "A+",
  "A-",
  "B",
  "B+",
  "B-",
  "C",
  "C+",
  "C-",
  "D",
  "D+",
  "D-",
  "E",
  "E+",
  "E-",
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Nilais", {
      id_nilai: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      mahasiswa_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Mahasiswas",
          key: "id_mahasiswa",
        },
      },
      matkul_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Matakuliahs",
          key: "id_matkul",
        },
      },
      nilai: {
        type: Sequelize.ENUM(...FORMAT_NILAI),
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("NOW()"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("NOW()"),
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("Nilais");
  },
};
