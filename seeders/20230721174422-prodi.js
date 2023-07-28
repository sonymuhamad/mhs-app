"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const prodi = [
      {
        nama_prodi: "Matematika",
      },
      {
        nama_prodi: "Teknik Informatika",
      },
      {
        nama_prodi: "Teknik Industri",
      },
      {
        nama_prodi: "Teknik Mesin",
      },
    ];
    await queryInterface.bulkInsert("Prodis", prodi, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Prodis", null, {});
  },
};
