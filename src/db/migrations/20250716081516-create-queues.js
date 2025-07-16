"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("queues", {
      id: {
        type: Sequelize.INTEGER({
          unsigned: true,
        }),
        primaryKey: true,
        autoIncrement: true,
      },
      job: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      payload: {
        type: Sequelize.STRING(255),
        defaultValue: null,
      },
      status: {
        type: Sequelize.STRING(50),
        defaultValue: "pending",
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("queues");
  },
};
