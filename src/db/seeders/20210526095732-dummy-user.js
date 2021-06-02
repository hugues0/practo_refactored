"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert("users", [
      {
        username: "hugues@gmail.com",
        password:"$2b$10$km1Yz.p84kzgpCpWXcrEuOUA/DC3WFvlXLX39W0qHyCR1A9jzgSCW",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete("users", null, {});
  },
};
