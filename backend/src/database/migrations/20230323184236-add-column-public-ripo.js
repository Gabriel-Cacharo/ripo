'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      {
        tableName: 'ripos'
      },
      'public',
      {
        type: Sequelize.BOOLEAN,
        defaulValue: false,
      }
    )
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.removeColumn('ripos', 'public')
  }
};
