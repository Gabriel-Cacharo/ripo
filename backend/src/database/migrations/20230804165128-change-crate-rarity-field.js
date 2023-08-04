'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.changeColumn('crates', 'rarity', {
      type: Sequelize.INTEGER(2),
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.changeColumn('crates', 'rarity', {
      type: Sequelize.STRING,
    });
  },
};
