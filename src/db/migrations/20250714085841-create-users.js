"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("users", {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER({
          unsigned: true,
        }),
      },
      email: {
        type: Sequelize.STRING(100),
        allowNull: true,
        unique: true,
        defaultValue: null,
      },
      password: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      two_factor_enabled: {
        type: Sequelize.TINYINT(1),
        defaultValue: 0,
      },
      two_factor_secret: {
        type: Sequelize.STRING(50),
        defaultValue: null,
      },
      first_name: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      last_name: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      username: {
        type: Sequelize.STRING(30),
        allowNull: true,
        unique: true,
        defaultValue: null,
      },
      avatar: {
        type: Sequelize.STRING(255),
        defaultValue: null,
      },
      title: {
        type: Sequelize.STRING(100),
        defaultValue: null,
      },
      about: {
        type: Sequelize.STRING(100),
        defaultValue: null,
      },
      posts_count: {
        type: Sequelize.STRING(100),
        defaultValue: null,
      },
      address: {
        type: Sequelize.TEXT,
        defaultValue: null,
      },
      website_url: {
        type: Sequelize.STRING(255),
        defaultValue: null,
      },
      x_url: {
        type: Sequelize.STRING(255),
        defaultValue: null,
      },
      github_url: {
        type: Sequelize.STRING(255),
        defaultValue: null,
      },
      linkedin_url: {
        type: Sequelize.STRING(255),
        defaultValue: null,
      },
      verified_at: {
        type: Sequelize.DATE,
        defaultValue: null,
      },
      deleted_at: {
        type: Sequelize.DATE,
        defaultValue: null,
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

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("users");
  },
};
