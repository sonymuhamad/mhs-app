"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const admins = [
      {
        mahasiswa_id: 2,
        matkul_id: 1,
        nilai: "A",
      },
      {
        mahasiswa_id: 2,
        matkul_id: 2,
        nilai: "B",
      },
      {
        mahasiswa_id: 2,
        matkul_id: 3,
        nilai: "A+",
      },
      {
        mahasiswa_id: 2,
        matkul_id: 4,
        nilai: "A",
      },
      {
        mahasiswa_id: 2,
        matkul_id: 5,
        nilai: "B",
      },
      {
        mahasiswa_id: 2,
        matkul_id: 6,
        nilai: "A+",
      },
      {
        mahasiswa_id: 2,
        matkul_id: 7,
        nilai: "A",
      },
      {
        mahasiswa_id: 2,
        matkul_id: 8,
        nilai: "B",
      },
      {
        mahasiswa_id: 2,
        matkul_id: 9,
        nilai: "A+",
      },
      {
        mahasiswa_id: 2,
        matkul_id: 10,
        nilai: "A",
      },
      {
        mahasiswa_id: 2,
        matkul_id: 11,
        nilai: "B",
      },
      {
        mahasiswa_id: 2,
        matkul_id: 12,
        nilai: "A+",
      },
      {
        mahasiswa_id: 3,
        matkul_id: 15,
        nilai: "B",
      },
      {
        mahasiswa_id: 3,
        matkul_id: 16,
        nilai: "A+",
      },
      {
        mahasiswa_id: 3,
        matkul_id: 17,
        nilai: "A",
      },
      {
        mahasiswa_id: 3,
        matkul_id: 18,
        nilai: "B",
      },
      {
        mahasiswa_id: 3,
        matkul_id: 19,
        nilai: "A+",
      },
      {
        mahasiswa_id: 3,
        matkul_id: 20,
        nilai: "A",
      },
      {
        mahasiswa_id: 3,
        matkul_id: 1,
        nilai: "B",
      },
      {
        mahasiswa_id: 3,
        matkul_id: 2,
        nilai: "A+",
      },
    ];
    await queryInterface.bulkInsert("Nilais", admins, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Nilais", null, {});
  },
};
