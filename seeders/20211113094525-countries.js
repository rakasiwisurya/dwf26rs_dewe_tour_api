"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    await queryInterface.bulkInsert("countries", [
      {
        id: 1,
        name: "Australia",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        name: "South Korea",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        name: "Japan",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        name: "Indonesia",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete("countries", {
      name: "Australia",
    });

    await queryInterface.bulkDelete("countries", {
      name: "South Korea",
    });

    await queryInterface.bulkDelete("countries", {
      name: "Japan",
    });

    await queryInterface.bulkDelete("countries", {
      name: "Indonesia",
    });
  },
};
