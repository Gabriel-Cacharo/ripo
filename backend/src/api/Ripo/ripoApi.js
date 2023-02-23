const jwt = require('jsonwebtoken');

const { SERVER_ERR_CODE } = require('../../utils/errorsCode');

const { getUserRipos, sellRipoController } = require('./ripoController');

module.exports = {
  async getUserRipos(req, res) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    try {
      const userTokenPayload = jwt.decode(token);
      const userRiposResponse = await getUserRipos(userTokenPayload.id);

      return res.status(200).json(userRiposResponse);
    } catch (err) {
      return res.status(SERVER_ERR_CODE).json({ error: err.message });
    }
  },

  async sellRipo(req, res) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    const { ripoId } = req.query;

    try {
      const userTokenPayload = jwt.decode(token);
      const sellRipoResponse = await sellRipoController(userTokenPayload.id, ripoId);

      return res.status(200).json(sellRipoResponse);
    } catch (err) {
      return res.status(SERVER_ERR_CODE).json({ error: err.message });
    }
  },
};
