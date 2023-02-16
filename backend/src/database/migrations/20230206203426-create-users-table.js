'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      xp: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '0',
      },
      coins: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '0',
      },
      facName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      facRipos: {
        type: Sequelize.JSON,
        defaultValue: null,
        allowNull: true,
      },
      lastRedeemCrate: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null,
      },
      favoriteCar: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      favoriteGun: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      favoriteSecondGun: {
        type: Sequelize.INTEGER,
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
    return queryInterface.dropTable('users');
  },
};
