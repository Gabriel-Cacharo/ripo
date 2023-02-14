const jwt = require('jsonwebtoken');
const { SERVER_ERR_MESSAGE, USER_NOT_EXISTS_MESSAGE } = require('../../utils/errorsCode');

const { findOneUserWhere } = require('../User/userDatabase');
const { getUserRipos } = require('./ripoDatabase');

module.exports = {
  async getUserRipos(token) {
    try {
      const userTokenPayload = jwt.decode(token);
      const userExists = await findOneUserWhere({ where: { id: userTokenPayload.id } });

      if (!userExists) {
        throw new Error(USER_NOT_EXISTS_MESSAGE);
      }

      const userRipos = await getUserRipos(userTokenPayload.id);

      return userRipos;
    } catch (err) {
      throw new Error(err.message || SERVER_ERR_MESSAGE);
    }
  },
};
