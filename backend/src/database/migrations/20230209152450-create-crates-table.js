'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('crates', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      price: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      rarity: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      canDropRipo: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      riposDrop: {
        type: Sequelize.JSON,
        defaultValue: null,
        allowNull: true,
      },
      canDropItems: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      itemsDrop: {
        type: Sequelize.JSON,
        defaultValue: null,
        allowNull: true,
      },
      crateImage: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable('crates');
  },
};
