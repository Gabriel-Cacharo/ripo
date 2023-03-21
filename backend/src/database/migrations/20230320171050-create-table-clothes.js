'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('ripoClothes', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      type: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      default: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      red: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      darkRed: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      lightRed: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      salmon: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      lightPink: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      pink: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      darkPink: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      lightOrange: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      orange: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      darkYellow: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      yellow: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      lightPurple: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      purple: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      lightPurpleWithBlue: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      lime: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      lightGreen: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      green: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      cyan: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      lightCyan: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      ice: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      lightBlue: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      blue: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      beige: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      white: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      darkWhite: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      lightGray: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      gray: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      black: {
        type: Sequelize.STRING,
        allowNull: true,
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
    return queryInterface.dropTable('ripoClothes');
  },
};
