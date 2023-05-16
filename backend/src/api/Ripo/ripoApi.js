const { SERVER_ERR_CODE, ZOD_ERR_CODE, ZOD_ERR_MESSAGE } = require('../../utils/errorsCode');
const { getUserPayloadByToken } = require('../../utils/getUserPayload');

const {
  getUserRiposController,
  sellRipoController,
  createUserRipoController,
  getAllRipoClothes,
  removeUserRipoController,
  getAllRiposController,
  addUserRiposController,
} = require('./ripoController');
const { createUserRipoValidation, removeUserRipoValidation, addUserRiposValidation } = require('./ripoValidations');

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
      const userTokenPayload = await getUserPayloadByToken(req);

      const sellRipoResponse = await sellRipoController(userTokenPayload.id, ripoId);

      return res.status(200).json(sellRipoResponse);
    } catch (err) {
      return res.status(SERVER_ERR_CODE).json({ error: err.message });
    }
  },

  async createUserRipo(req, res) {
    const { ripoUrl, ripoName, twitch, instagram } = req.body;

    try {
      createUserRipoValidation.parse(req.body);
    } catch (err) {
      return res.status(ZOD_ERR_CODE).json({ error: ZOD_ERR_MESSAGE });
    }

    try {
      const userTokenPayload = await getUserPayloadByToken(req);

      const createUserRipoResponse = await createUserRipoController(
        userTokenPayload.id,
        ripoUrl,
        ripoName,
        twitch,
        instagram
      );

      return res.status(201).json(createUserRipoResponse);
    } catch (err) {
      return res.status(SERVER_ERR_CODE).json({ error: err.message });
    }
  },

  async getAllRipoClothes(req, res) {
    try {
      const allRipoClothesResponse = await getAllRipoClothes();

      return res.status(200).json(allRipoClothesResponse);
    } catch (err) {
      return res.status(SERVER_ERR_CODE).json({ error: err.message });
    }
  },

  async removeUserRipo(req, res) {
    const { userId, ripoId } = req.body;

    try {
      removeUserRipoValidation.parse(req.body);
    } catch (err) {
      return res.status(ZOD_ERR_CODE).json({ error: ZOD_ERR_MESSAGE });
    }

    try {
      const removeUserRipoResponse = await removeUserRipoController(userId, ripoId);

      return res.status(200).json(removeUserRipoResponse);
    } catch (err) {
      return res.status(SERVER_ERR_CODE).json({ error: err.message });
    }
  },

  async getAllRipos(req, res) {
    try {
      const allRiposResponse = await getAllRiposController();

      return res.status(200).json(allRiposResponse);
    } catch (err) {
      return res.status(SERVER_ERR_CODE).json({ error: err.message });
    }
  },

  async addUserRipos(req, res) {
    const { userId, riposId } = req.body;

    try {
      addUserRiposValidation.parse(req.body);
    } catch (err) {
      return res.status(ZOD_ERR_CODE).json({ error: ZOD_ERR_MESSAGE });
    }

    try {
      const addUserRiposResponse = await addUserRiposController(userId, riposId);

      return res.status(201).json(addUserRiposResponse);
    } catch (err) {
      return res.status(SERVER_ERR_CODE).json({ error: err.message });
    }
  },

  async editRipBasicInformations(req, res) {
    const { name, price, ripoImage, rarity, public } = req.body;

    try {
    } catch (err) {
      return res.status(ZOD_ERR_CODE).json({ error: ZOD_ERR_MESSAGE });
    }
  },
};
