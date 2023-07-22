"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const matakuliahData = [];
    const semesters = ["Ganjil", "Genap"];

    for (let i = 1; i <= 20; i++) {
      matakuliahData.push({
        nama: `Matakuliah ${i}`,
        kode: `MK${i}`,
        sks: Math.floor(Math.random() * 4) + 1, // Random sks between 1 and 4
        semester: semesters[Math.floor(Math.random() * semesters.length)], // Random semester value
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert("Matakuliahs", matakuliahData, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Matakuliahs", null, {});
  },
};
