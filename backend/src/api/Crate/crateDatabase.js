const User = require('../../database/models/User');
const Ripo = require('../../database/models/Ripo');
const dayjs = require('dayjs');

module.exports = {
  async verifyUserExistsDatabase(userId) {
    return await User.findByPk(userId);
  },

  async getUserCratesDatabase(userId) {
    const user = await User.findByPk(userId);
    const userCrates = await user.getCrates();

    return userCrates;
  },

  async addRedeemCrateDatabase(userId) {
    const user = await User.findByPk(userId);
    await user.addCrate(process.env.INDEX_CRATE_ADD_REDEEM);

    await User.update({ lastRedeemCrate: dayjs().format() }, { where: { id: userId } });
  },
};
