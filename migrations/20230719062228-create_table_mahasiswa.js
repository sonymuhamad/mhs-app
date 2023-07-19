"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Mahasiswas", {
      id_mahasiswa: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nama: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      nim: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      rfid: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      prodi_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Prodis", // Reference the Prodis table
          key: "id_prodi", // Reference the id_prodi column
        },
      },
      kelas: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      tahun: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable("Mahasiswas");
  },
};
