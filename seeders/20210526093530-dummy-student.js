"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert("Students", [
      {
        name: "NTWARI Hugues",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete("Students", null, {});
  },
};
