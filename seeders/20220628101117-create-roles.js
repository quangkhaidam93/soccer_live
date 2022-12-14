"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface
      .bulkInsert("Roles", [
        {
          id: 1,
          name: "USER",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ])
      .then(() =>
        queryInterface.bulkInsert("Roles", [
          {
            id: 2,
            name: "ADMIN",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ])
      );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Roles', null, {});
  },
};
