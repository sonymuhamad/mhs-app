"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const prodi = [
      {
        nama_prodi: "Sistem Informasi",
      },
      {
        nama_prodi: "Manajemen Informatika",
      },
      {
        nama_prodi: "Psikologi",
      },
    ];
    await queryInterface.bulkInsert("Prodis", prodi, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Prodis", null, {});
  },
};
