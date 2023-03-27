'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.addColumn(
      {
        tableName: 'users',
      },
      'verifiedEmail',
      {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      }
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.removeColumn('users', 'verifiedEmail');
  },
};
