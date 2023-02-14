const User = require('../../database/models/User');
const Ripo = require('../../database/models/Ripo');
const Crate = require('../../database/models/Crate');
const dayjs = require('dayjs');
const { Op } = require('sequelize');

module.exports = {
  async getUserCratesDatabase(userId) {
    const user = await User.findByPk(userId);
    const userCrates = await user.getCrates();

    if (userCrates.length > 0) {
      const ripos = await Ripo.findAll();

      userCrates.forEach((crate) => {
        const ripoImages = ripos
          .filter((ripo) => {
            return crate.riposDrop.includes(ripo.id);
          })
          .map((ripo) => ripo.ripoImage);

        crate.riposDrop = ripoImages;
      });

      return userCrates;
    } else {
      throw new Error('Usuário não possui caixas');
    }
  },

  async verifyIfUserHaveThisCrate(userId, crateId) {
    const user = await User.findByPk(userId);
    const userCrate = await user.hasCrate(1);

    if (userCrate) {
      const userCrateInfo = await user.getCrates({ where: { id: crateId } });
      return JSON.parse(userCrateInfo[0].riposDrop);
    } else {
      throw new Error('Usuário não possui essa caixa');
    }
  },

  async getCrateInfos(crateId) {
    return await Crate.findByPk(crateId);
  },

  async addRedeemCrateDatabase(userId) {
    const user = await User.findByPk(userId);
    await user.addCrate(process.env.INDEX_CRATE_ADD_REDEEM);

    await User.update({ lastRedeemCrate: dayjs().format() }, { where: { id: userId } });
  },

  async addUserCrate(userId, crateId, price) {
    const user = await User.findByPk(userId);
    const newUserCoins = user.dataValues.coins - price;

    await User.update({ coins: newUserCoins }, { where: { id: userId } });
    return await user.addCrate(crateId);
  },

  async removeUserCrate(userId, crateId) {
    const user = await User.findByPk(userId);
    const crate = await user.getCrates({ where: { id: crateId } });

    return await user.removeCrate(crate, { limit: 1 });
  },
};
