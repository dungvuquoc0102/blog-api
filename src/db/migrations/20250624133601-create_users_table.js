"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable(
            "users",
            {
                id: {
                    type: Sequelize.BIGINT,
                    autoIncrement: true,
                    primaryKey: true,
                    allowNull: false,
                },
                email: {
                    type: Sequelize.STRING,
                    unique: true,
                    allowNull: false,
                },
                password: {
                    type: Sequelize.STRING,
                },
                created_at: {
                    type: Sequelize.DATE,
                    allowNull: false,
                    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
                },
                updated_at: {
                    type: Sequelize.DATE,
                    allowNull: false,
                    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
                    onUpdate: Sequelize.literal("CURRENT_TIMESTAMP"),
                },
            },
            {
                timestamps: true,
                underscored: true,
                charset: "utf8",
                collate: "utf8_general_ci",
                engine: "InnoDB",
            }
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("users");
    },
};
