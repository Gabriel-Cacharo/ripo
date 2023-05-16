const User = require('../../database/models/User');
const Ripo = require('../../database/models/Ripo');
const RipoClothes = require('../../database/models/RipoClothes');

module.exports = {
  async createRipo(obj) {
    return await Ripo.create(obj);
  },

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

  async addUserRipo(userId, ripoId) {
    const user = await User.findByPk(userId);
    return await user.addRipo(ripoId);
  },

  async removeUserRipo(userId, ripoId) {
    const user = await User.findByPk(userId);
    const ripo = await user.getRipos({ where: { id: ripoId } });

    return await user.removeRipo(ripo, { limit: 1 });
  },

  async getAllRipoClothesDatabase() {
    return await RipoClothes.findAll();
  },

  async countRiposPublic() {
    return await Ripo.count({ where: { public: true } });
  },

  async removeUserRipoDatabase(userId, ripoId) {
    const user = await User.findByPk(userId);
    const ripo = await user.getRipos({ where: { id: ripoId } });

    return await user.removeRipo(ripo, { limit: 1 });
  },

  async getAllRiposDatabase() {
    return await Ripo.findAll();
  },

  async editRipoBasicInformationsDatabase(ripoId, obj) {
    return await Ripo.update(obj, { where: { id: ripoId } });
  },
};
