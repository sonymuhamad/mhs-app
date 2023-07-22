"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const admins = [
      {
        username: "admin",
        password: "admin",
      },
      {
        username: "user",
        password: "user",
      },
      {
        username: "teqi",
        password: "teqi",
      },
    ];
    await queryInterface.bulkInsert("Admins", admins, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Admins", null, {});
  },
};
