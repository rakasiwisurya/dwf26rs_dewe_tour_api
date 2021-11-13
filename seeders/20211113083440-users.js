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

    await queryInterface.bulkInsert("users", [
      {
        id: 1,
        email: "admin@gmail.com",
        password:
          "$2b$10$qGvJEQKCjgaOuV4lA0zr6uI1cnAa0MaFmE/Pw6HXuK1V1DdTYVCce",
        fullname: "Admin1",
        phone: "085717573808",
        address: "Jl. Kenangan No. 1",
        gender: "male",
        avatar: null,
        role: "admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        email: "user1@gmail.com",
        password:
          "$2b$10$qGvJEQKCjgaOuV4lA0zr6uI1cnAa0MaFmE/Pw6HXuK1V1DdTYVCce", //12345
        fullname: "User1",
        phone: "085717573808",
        address: "Jl. Melati No. 1",
        gender: "male",
        avatar: null,
        role: "user",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        email: "user2@gmail.com",
        password:
          "$2b$10$qGvJEQKCjgaOuV4lA0zr6uI1cnAa0MaFmE/Pw6HXuK1V1DdTYVCce", //12345
        fullname: "User2",
        phone: "085717573809",
        address: "Jl. Melati No. 2",
        gender: "female",
        avatar: null,
        role: "user",
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

    await queryInterface.bulkDelete("users", {
      email: "admin@gmail.com",
    });

    await queryInterface.bulkDelete("users", {
      email: "user1@gmail.com",
    });

    await queryInterface.bulkDelete("users", {
      email: "user2@gmail.com",
    });
  },
};
