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
  getAllCratesDatabase,
  addUserCrateDatabaseWithoutCoins,
  updateCrate,
} = require('./crateDatabase');
const { checkHours } = require('./utils/checkHours');

module.exports = {
  async getAllCratesController() {
    try {
      const crates = await getAllCratesDatabase();

      return crates;
    } catch (err) {
      throw new Error(SERVER_ERR_MESSAGE);
    }
  },

  async getUserCrates(userId) {
    try {
      const userExists = await findOneUserWhere({ where: { id: userId } });

      if (!userExists) {
        throw new Error(USER_NOT_EXISTS_MESSAGE);
      }

      const userCrates = await getUserCratesDatabase(userId);

      return userCrates;
    } catch (err) {
      throw new Error(SERVER_ERR_MESSAGE);
    }
  },

  async redeemCrate(userId) {
    try {
      const userExists = await findOneUserWhere({ where: { id: userId } });

      if (!userExists) {
        throw new Error(USER_NOT_EXISTS_MESSAGE);
      }

      if (!userExists.dataValues.lastRedeemCrate) {
        return await addRedeemCrateDatabase(userId);
      } else {
        const [hoursRemaining, minutesRemaining] = await checkHours(userExists.dataValues.lastRedeemCrate);
        const userCanRedeemCrate = hoursRemaining + minutesRemaining;

        if (userCanRedeemCrate <= 0) {
          return await addRedeemCrateDatabase(userId);
        } else {
          throw new Error(`${hoursRemaining}h${minutesRemaining}m`);
        }
      }
    } catch (err) {
      throw new Error(err.message || SERVER_ERR_MESSAGE);
    }
  },

  async buyCrate(userId, crateId) {
    try {
      const userInfos = await findOneUserWhere({ where: { id: userId } });

      if (!userInfos) {
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

  async openCrate(userId, crateId) {
    try {
      const userInfos = await findOneUserWhere({ where: { id: userId } });

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

  async removeUserCrateController(userId, crateId) {
    try {
      return await removeUserCrateDatabase(userId, crateId);
    } catch (err) {
      throw new Error(SERVER_ERR_MESSAGE);
    }
  },

  async addUserCrateController(userId, crateId) {
    try {
      return await addUserCrateDatabaseWithoutCoins(userId, crateId);
    } catch (err) {
      console.log(err);
      throw new Error(SERVER_ERR_MESSAGE);
    }
  },

  async editCrateBasicInformationsController(crateId, obj) {
    try {
      const updatedCrateResponse = await updateCrate(obj, { where: { id: crateId } });

      return updatedCrateResponse;
    } catch (err) {
      throw new Error(SERVER_ERR_MESSAGE);
    }
  },
};
