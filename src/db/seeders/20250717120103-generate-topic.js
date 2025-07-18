"use strict";
const { faker } = require("@faker-js/faker");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const topics = [
      {
        name: "Front-end",
        image: faker.image.urlLoremFlickr({ category: "abstract" }),
        description: faker.lorem.paragraph(),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Back-end",
        image: faker.image.urlLoremFlickr({ category: "abstract" }),
        description: faker.lorem.paragraph(),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Mobile apps",
        image: faker.image.urlLoremFlickr({ category: "abstract" }),
        description: faker.lorem.paragraph(),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Devops",
        image: faker.image.urlLoremFlickr({ category: "abstract" }),
        description: faker.lorem.paragraph(),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Others",
        image: faker.image.urlLoremFlickr({ category: "abstract" }),
        description: faker.lorem.paragraph(),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];
    topics.forEach(
      (item) => (item.slug = faker.helpers.slugify(item.name.toLowerCase()))
    );
    await queryInterface.bulkInsert("topics", topics, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("topics", null, {});
  },
};
