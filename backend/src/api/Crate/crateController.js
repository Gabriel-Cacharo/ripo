const jwt = require('jsonwebtoken');

const { SERVER_ERR_MESSAGE, USER_NOT_EXISTS_MESSAGE } = require('../../utils/errorsCode');

const { getRipoById, verifyIfUserAlreadyHaveThisRipoDatabase, addUserRipo } = require('../Ripo/ripoDatabase');
const { findOneUserWhere, addUserCoins } = require('../User/userDatabase');
const {
  getUserCratesDatabase,
  addRedeemCrateDatabase,
  addUserCrateDatabase,
  getCrateInfosDatabase,
  verifyIfUserHaveThisCrateDatabase,
  removeUserCrateDatabase,
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
      throw new Error(SERVER_ERR_MESSAGE);
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

      const crateInfos = await getCrateInfosDatabase(crateId);

      if (Number(userInfos.dataValues.coins) >= Number(crateInfos.dataValues.price)) {
        return await addUserCrateDatabase(userInfos.id, crateId, crateInfos.dataValues.price);
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

      const userHaveThisCrate = await verifyIfUserHaveThisCrateDatabase(userInfos.id, crateId);

      const drawnIndex = Math.floor(Math.random() * userHaveThisCrate.length);
      const drawnRipo = await getRipoById(userHaveThisCrate[drawnIndex]);
      await removeUserCrateDatabase(userInfos.id, crateId);

      const userAlreadyHaveThisRipoResponse = await verifyIfUserAlreadyHaveThisRipoDatabase(
        userInfos.id,
        drawnRipo.dataValues.id
      );

      // If user already has this Ripo, just add coins in his inventory;
      if (userAlreadyHaveThisRipoResponse.length > 0) {
        await addUserCoins(userInfos.id, drawnRipo.dataValues.price);
      } else {
        // If user not have this Ripo, add in his inventory;
        await addUserRipo(userInfos.id, drawnRipo.dataValues.id);
      }

      const userAlreadyHaveThisRipo = userAlreadyHaveThisRipoResponse.length >= 1 ? true : false;

      return { drawnRipo, userAlreadyHaveThisRipo };
    } catch (err) {
      throw new Error(SERVER_ERR_MESSAGE);
    }
  },
};
