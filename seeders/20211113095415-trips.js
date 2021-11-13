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

    await queryInterface.bulkInsert("trips", [
      {
        id: 1,
        title: "6D/4N Fun Tassie Vacation + Sydney",
        countryId: 1,
        accomodation: "Hotel 4 Nights",
        transportation: "Aussie Airways",
        eat: "Included as ltinerary",
        day: 6,
        night: 4,
        dateTrip: "2020-08-26",
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.  It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        quota: 12,
        maxQuota: 15,
        price: 10288000,
        image: JSON.stringify([
          "1636165865513-aussie-1-min.jpg",
          "1636165865612-aussie-2-min.jpg",
          "1636165865680-aussie-3-min.jpg",
          "1636165865709-aussie-4-min.jpg",
        ]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        title: "6D/4N Exciting Summer in Busan",
        countryId: 2,
        accomodation: "Hotel 4 Nights",
        transportation: "Korean Airways",
        eat: "Included as ltinerary",
        day: 6,
        night: 4,
        dateTrip: "2020-08-26",
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.  It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        quota: 14,
        maxQuota: 15,
        price: 10288000,
        image: JSON.stringify([
          "1636166080884-south-korea-1-min.jpg",
          "1636166080929-south-korea-2-min.jpg",
          "1636166080981-south-korea-3-min.jpg",
          "1636166081123-south-korea-4-min.jpg",
        ]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        title: "8D/6N Wonderful Autumn + Kyoto",
        countryId: 3,
        accomodation: "Hotel 4 Nights",
        transportation: "Japan Airways",
        eat: "Included as ltinerary",
        day: 8,
        night: 6,
        dateTrip: "2020-08-26",
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.  It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        quota: 10,
        maxQuota: 15,
        price: 28999000,
        image: JSON.stringify([
          "1636166383428-japan1-1-min.jpg",
          "1636166383532-japan1-2-min.jpg",
          "1636166383574-japan1-3-min.jpg",
          "1636166383598-japan1-4-min.jpg",
        ]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        title: "4D/3N Kuta Beach Delight",
        countryId: 4,
        accomodation: "Hotel 4 Nights",
        transportation: "Garuda Airways",
        eat: "Included as ltinerary",
        day: 4,
        night: 3,
        dateTrip: "2020-08-26",
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.  It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        quota: 14,
        maxQuota: 15,
        price: 10488000,
        image: JSON.stringify([
          "1636166643620-indonesia1-1-min.jpg",
          "1636166643665-indonesia1-2-min.jpg",
          "1636166643683-indonesia1-3-min.jpg",
          "1636166643698-indonesia1-4-min.jpg",
        ]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 5,
        title: "4D/3N Overland Jakarta City",
        countryId: 4,
        accomodation: "Hotel 4 Nights",
        transportation: "Garuda Airways",
        eat: "Included as ltinerary",
        day: 4,
        night: 3,
        dateTrip: "2020-08-26",
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.  It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        quota: 8,
        maxQuota: 10,
        price: 3188000,
        image: JSON.stringify([
          "1636166994275-indonesia2-1-min.jpg",
          "1636166994320-indonesia2-2-min.jpg",
          "1636166994320-indonesia2-2-min.jpg",
          "1636166994505-indonesia2-4-min.jpg",
        ]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 6,
        title: "5D/4N Magic Tokyo Fun",
        countryId: 3,
        accomodation: "Hotel 4 Nights",
        transportation: "Japan Airways",
        eat: "Included as ltinerary",
        day: 5,
        night: 4,
        dateTrip: "2020-08-26",
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.  It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        quota: 10,
        maxQuota: 15,
        price: 11188000,
        image: JSON.stringify([
          "1636531496132-japan2-1-min.jpg",
          "1636531496221-japan2-2-min.jpg",
          "1636531496269-japan2-3-min.jpg",
          "1636531496312-japan2-4-min.jpg",
        ]),
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
  },
};
