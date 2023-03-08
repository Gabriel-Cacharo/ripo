const User = require('../../database/models/User');

module.exports = {
  async findOneUserWhere(options) {
    return await User.findOne(options);
  },

  async createUser(obj) {
    return await User.create(obj);
  },

  async updateUser(obj, where) {
    return await User.update(obj, where);
  },

  async getUserInformationsDatabase(userId) {
    const userInformations = await User.findByPk(userId);

    return {
      username: userInformations.dataValues.username,
      xp: userInformations.dataValues.xp,
      fac: userInformations.dataValues.facName,
      facRipos: userInformations.dataValues.facRipos,
      ripoId: userInformations.dataValues.ripoId,
    };
  },

  async addUserCoins(userId, coinsAmount) {
    const userInformations = await User.findByPk(userId);

    return await User.update(
      { coins: Number(userInformations.dataValues.coins) + Number(coinsAmount) },
      { where: { id: userId } }
    );
  },
};
