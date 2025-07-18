"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("conversation_user", {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER({
          unsigned: true,
        }),
      },
      user_id: {
        type: Sequelize.INTEGER({
          unsigned: true,
        }),
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      conversation_id: {
        type: Sequelize.INTEGER({ unsigned: true }),
        allowNull: false,
        references: {
          model: "conversations",
          key: "id",
        },
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("conversation_user");
  },
};
