const jwt = require('jsonwebtoken');

const { SERVER_ERR_CODE, ZOD_ERR_CODE, ZOD_ERR_MESSAGE } = require('../../utils/errorsCode');

const { getUserRipos, sellRipoController, createUserRipoController } = require('./ripoController');
const { createUserRipoValidation } = require('./ripoValidations');

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

  async createUserRipo(req, res) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    const { ripoUrl, ripoName } = req.body;

    // console.log(ripoUrl);

    try {
      createUserRipoValidation.parse(req.body);
    } catch (err) {
      console.log(err);
      return res.status(ZOD_ERR_CODE).json({ error: ZOD_ERR_MESSAGE });
    }

    try {
      const userTokenPayload = jwt.decode(token);
      const createUserRipoResponse = await createUserRipoController(userTokenPayload.id, ripoUrl, ripoName);

      return res.status(201).json(createUserRipoResponse);
    } catch (err) {
      console.log(err);
      return res.status(SERVER_ERR_CODE).json({ error: err.message });
    }
  },
};
