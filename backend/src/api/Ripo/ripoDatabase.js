const User = require('../../database/models/User');
const Ripo = require('../../database/models/Ripo');

module.exports = {
  async getUserRipos(userId) {
    const user = await User.findByPk(userId);
    const userRipos = await user.getRipos();

    return userRipos;
  },

  async getRipoById(ripoId) {
    return await Ripo.findByPk(ripoId);
  },

  async verifyIfUserAlreadyHaveThisRipoDatabase(userId, ripoId) {
    const user = await User.findByPk(userId);
    return await user.getRipos({ where: { id: ripoId } });
  },
};
