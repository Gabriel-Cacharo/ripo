'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addColumn({
      tableName: 'users'
    },
    'ripoId',
    {
      type: Sequelize.INTEGER
    })
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.removeColumn('users', 'ripoId')
  }
};
