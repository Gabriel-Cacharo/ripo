const { SERVER_ERR_CODE, ZOD_ERR_CODE, ZOD_ERR_MESSAGE } = require('../../utils/errorsCode');
const { getUserPayloadByToken } = require('../../utils/getUserPayload');

const { getUserRiposController, sellRipoController, createUserRipoController } = require('./ripoController');
const { createUserRipoValidation } = require('./ripoValidations');

module.exports = {
  async getUserRipos(req, res) {
    try {
      const userTokenPayload = await getUserPayloadByToken(req);

      const userRiposResponse = await getUserRiposController(userTokenPayload.id);

      return res.status(200).json(userRiposResponse);
    } catch (err) {
      return res.status(SERVER_ERR_CODE).json({ error: err.message });
    }
  },

  async sellRipo(req, res) {
    const { ripoId } = req.query;

    try {
      const userTokenPayload = getUserPayloadByToken(req);

      const sellRipoResponse = await sellRipoController(userTokenPayload.id, ripoId);

      return res.status(200).json(sellRipoResponse);
    } catch (err) {
      return res.status(SERVER_ERR_CODE).json({ error: err.message });
    }
  },

  async createUserRipo(req, res) {
    const { ripoUrl, ripoName } = req.body;

    try {
      createUserRipoValidation.parse(req.body);
    } catch (err) {
      return res.status(ZOD_ERR_CODE).json({ error: ZOD_ERR_MESSAGE });
    }

    try {
      const userTokenPayload = getUserPayloadByToken(req);

      const createUserRipoResponse = await createUserRipoController(userTokenPayload.id, ripoUrl, ripoName);

      return res.status(201).json(createUserRipoResponse);
    } catch (err) {
      return res.status(SERVER_ERR_CODE).json({ error: err.message });
    }
  },
};
