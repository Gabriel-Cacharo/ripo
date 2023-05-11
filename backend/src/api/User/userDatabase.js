const User = require('../../database/models/User');
const ForgotPassword = require('../../database/models/ForgotPassword');
const { Op } = require('sequelize');

module.exports = {
  async findAllUsers() {
    return await User.findAll({ attributes: ['id', 'username', 'xp', 'coins', 'facName', 'ripoId'] });
  },

  async findOneUserWhere(options) {
    return await User.findOne(options);
  },

  async findUsersSearchDatabase(username) {
    return await User.findAll({
      where: { username: { [Op.like]: `%${username}%` } },
      limit: 3,
      attributes: ['username', 'ripoId'],
    });
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
      id: userInformations.dataValues.id,
      username: userInformations.dataValues.username,
      xp: userInformations.dataValues.xp,
      fac: userInformations.dataValues.facName,
      facRipos: userInformations.dataValues.facRipos,
      ripoId: userInformations.dataValues.ripoId,
      twitch: userInformations.dataValues.twitch,
      instagram: userInformations.dataValues.instagram,
      coins: userInformations.dataValues.coins,
    };
  },

  async addUserCoins(userId, coinsAmount) {
    const userInformations = await User.findByPk(userId);

    return await User.update(
      { coins: Number(userInformations.dataValues.coins) + Number(coinsAmount) },
      { where: { id: userId } }
    );
  },

  async getRipoOwnerInformationsDatabase(ripoId) {
    const userInformations = await User.findOne({ where: { ripoId } });

    return {
      twitch: userInformations.dataValues.twitch,
      instagram: userInformations.dataValues.instagram,
      username: userInformations.dataValues.username,
    };
  },

  async userAlreadyHasAnRequestToForgotPasswordDatabase(userId) {
    return await ForgotPassword.findOne({ where: { userId: userId } });
  },

  async addRequestToForgotPasswordDatabase(userId, token) {
    return await ForgotPassword.create({ userId, token });
  },

  async deleteRequestToForgotPasswordDatabase(userId) {
    return await ForgotPassword.destroy({ where: { userId: userId } });
  },
};
