"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert("users", [
      {
        username: "NTWARI",
        password: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwidXNlcm5hbWUiOiJyYW5kb21AZ21haWwuY29tIiwiaWF0IjoxNjIxOTI1OTAxLCJleHAiOjE2MjE5MjcxMDF9.TPa5FKW-GkjyxRXi6GlfXocpaXgCyKVcWJ_vpB2pR-A",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete("users", null, {});
  },
};
