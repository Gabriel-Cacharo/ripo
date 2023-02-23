const { SERVER_ERR_MESSAGE, USER_NOT_EXISTS_MESSAGE } = require('../../utils/errorsCode');

const { findOneUserWhere, addUserCoins } = require('../User/userDatabase');
const { getUserRipos, verifyIfUserAlreadyHaveThisRipoDatabase, removeUserRipo } = require('./ripoDatabase');

module.exports = {
  async getUserRiposController(userId) {
    try {
      const userExists = await findOneUserWhere({ where: { id: userId } });

      if (!userExists) {
        throw new Error(USER_NOT_EXISTS_MESSAGE);
      }

      const userRipos = await getUserRipos(userId);

      return userRipos;
    } catch (err) {
      throw new Error(err.message || SERVER_ERR_MESSAGE);
    }
  },

  async sellRipoController(userId, ripoId) {
    const verifyIfUserHaveThisRipoResponse = await verifyIfUserAlreadyHaveThisRipoDatabase(userId, ripoId);

    if (verifyIfUserHaveThisRipoResponse.length > 0) {
      const removeRipoResponse = await removeUserRipo(userId, ripoId);

      return await addUserCoins(userId, verifyIfUserHaveThisRipoResponse[0].dataValues.price);
    } else {
      throw new Error('Ocorreu um erro ao vender o Ripo, tente novamente mais tarde.');
    }
  },
};
