const { SERVER_ERR_MESSAGE, USER_NOT_EXISTS_MESSAGE } = require('../../utils/errorsCode');

const { verifyUserExistsDatabase, getUserCratesDatabase, addRedeemCrateDatabase } = require('./crateDatabase');
const { checkHours } = require('./utils/checkHours');

module.exports = {
  async getUserCrates(userId) {
    try {
      const userExists = await verifyUserExistsDatabase(userId);

      if (!userExists) {
        throw new Error(USER_NOT_EXISTS_MESSAGE);
      }

      const userCrates = await getUserCratesDatabase(userId);

      return userCrates;
    } catch (err) {
      throw new Error(err.message || SERVER_ERR_MESSAGE);
    }
  },

  async redeemCrate(userId) {
    try {
      const userExists = await verifyUserExistsDatabase(userId);

      if (!userExists) {
        throw new Error(USER_NOT_EXISTS_MESSAGE);
      }

      if (!userExists.dataValues.lastRedeemCrate) {
        return await addRedeemCrateDatabase(userId);
      } else {
        const [hoursRemaining, minutesRemaining] = await checkHours(userExists.dataValues.lastRedeemCrate);
        const userCanRedeemCrate = hoursRemaining + minutesRemaining;

        if (userCanRedeemCrate >= 0) {
          throw new Error(`${hoursRemaining}h${minutesRemaining}m restantes`);
        } else {
          return await addRedeemCrateDatabase(userId);
        }
      }
    } catch (err) {
      throw new Error(err.message || SERVER_ERR_MESSAGE);
    }
  },
};
