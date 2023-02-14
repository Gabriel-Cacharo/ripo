const jwt = require('jsonwebtoken');

const { SERVER_ERR_MESSAGE, USER_NOT_EXISTS_MESSAGE } = require('../../utils/errorsCode');
const { getRipoById } = require('../RIpo/ripoDatabase');
const { findOneUserWhere } = require('../User/userDatabase');

const {
  getUserCratesDatabase,
  addRedeemCrateDatabase,
  addUserCrate,
  getCrateInfos,
  verifyIfUserHaveThisCrate,
  removeUserCrate,
} = require('./crateDatabase');
const { checkHours } = require('./utils/checkHours');

module.exports = {
  async getUserCrates(token) {
    try {
      const userTokenPayload = jwt.decode(token);
      const userExists = await findOneUserWhere({ where: { id: userTokenPayload.id } });

      if (!userExists) {
        throw new Error(USER_NOT_EXISTS_MESSAGE);
      }

      const userCrates = await getUserCratesDatabase(userTokenPayload.id);

      return userCrates;
    } catch (err) {
      console.log(err);
      throw new Error(err.message || SERVER_ERR_MESSAGE);
    }
  },

  async redeemCrate(token) {
    try {
      const userTokenPayload = jwt.decode(token);
      const userExists = await findOneUserWhere({ where: { id: userTokenPayload.id } });

      if (!userExists) {
        throw new Error(USER_NOT_EXISTS_MESSAGE);
      }

      if (!userExists.dataValues.lastRedeemCrate) {
        return await addRedeemCrateDatabase(userTokenPayload.id);
      } else {
        const [hoursRemaining, minutesRemaining] = await checkHours(userExists.dataValues.lastRedeemCrate);
        const userCanRedeemCrate = hoursRemaining + minutesRemaining;

        if (userCanRedeemCrate <= 0) {
          return await addRedeemCrateDatabase(userTokenPayload.id);
        } else {
          throw new Error(`${hoursRemaining}h${minutesRemaining}m`);
        }
      }
    } catch (err) {
      throw new Error(err.message || SERVER_ERR_MESSAGE);
    }
  },

  async buyCrate(token, crateId) {
    try {
      const userTokenPayload = jwt.decode(token);
      const userInfos = await findOneUserWhere({ where: { id: userTokenPayload.id } });

      if (!userInfos || !userTokenPayload) {
        throw new Error(USER_NOT_EXISTS_MESSAGE);
      }

      const crateInfos = await getCrateInfos(crateId);

      if (userInfos.dataValues.coins >= crateInfos.dataValues.price) {
        return await addUserCrate(userInfos.id, crateId, crateInfos.dataValues.price);
      } else {
        throw new Error('Coins insuficientes');
      }
    } catch (err) {
      throw new Error(err.message || SERVER_ERR_MESSAGE);
    }
  },

  async openCrate(token, crateId) {
    try {
      const userTokenPayload = jwt.decode(token);
      const userInfos = await findOneUserWhere({ where: { id: userTokenPayload.id } });

      if (!userInfos) {
        throw new Error(USER_NOT_EXISTS_MESSAGE);
      }

      const userHaveThisCrate = await verifyIfUserHaveThisCrate(userInfos.id, crateId);
      const drawnIndex = Math.floor(Math.random() * userHaveThisCrate.length + 1);
      const drawnRipo = await getRipoById(drawnIndex);
      await removeUserCrate(userInfos.id, crateId);

      return drawnRipo;
    } catch (err) {
      throw new Error(err.message || SERVER_ERR_MESSAGE);
    }
  },
};
