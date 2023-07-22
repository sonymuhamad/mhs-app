"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const admins = [
      {
        nama: "admin",
        nim: "190649",
        rfid: "412424129",
        kelas: "Reguler",
        tahun: "2020",
        prodi_id: 1,
      },
      {
        nama: "m teqi",
        nim: "1029841287",
        rfid: "6025323050",
        kelas: "Reguler",
        tahun: "2020",
        prodi_id: 2,
      },
      {
        nama: "sony",
        nim: "18490744",
        rfid: "11988229167",
        kelas: "Reguler",
        tahun: "2021",
        prodi_id: 3,
      },
    ];
    await queryInterface.bulkInsert("Mahasiswas", admins, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Mahasiswas", null, {});
  },
};
