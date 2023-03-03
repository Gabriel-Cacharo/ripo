const { ZOD_ERR_CODE, ZOD_ERR_MESSAGE, SERVER_ERR_CODE } = require('../../utils/errorsCode');
const { getUserPayloadByToken } = require('../../utils/getUserPayload')

const { buyCrateValidation } = require('./crateValidations');

const { getUserCrates, redeemCrate, buyCrate, openCrate } = require('./crateController');

module.exports = {
  async getUserCrates(req, res) {
    try {
      const userTokenPayload = await getUserPayloadByToken(req);

      const userCratesResponse = await getUserCrates(userTokenPayload.id);

      return res.status(200).json(userCratesResponse);
    } catch (err) {
      return res.status(SERVER_ERR_CODE).json({ error: err.message });
    }
  },

  async redeemCrate(req, res) {
    try {
      const userTokenPayload = await getUserPayloadByToken(req)

      const redeemCrateResponse = await redeemCrate(userTokenPayload.id);

      return res.status(200).json(redeemCrateResponse);
    } catch (err) {
      return res.status(SERVER_ERR_CODE).json({ error: err.message });
    }
  },

  async buyCrate(req, res) {
    const { crateId } = req.query;

    try {
      buyCrateValidation.parse(req.query);
    } catch (err) {
      return res.status(ZOD_ERR_CODE).json({ error: ZOD_ERR_MESSAGE });
    }

    try {
      const userTokenPayload = await getUserPayloadByToken(req)

      const buyCrateResponse = await buyCrate(userTokenPayload.id, crateId);

      return res.status(200).json(buyCrateResponse);
    } catch (err) {
      return res.status(SERVER_ERR_CODE).json({ error: err.message });
    }
  },

  async openCrate(req, res) {
    const { crateId } = req.query;

    try {
      buyCrateValidation.parse(req.query);
    } catch (err) {
      return res.status(ZOD_ERR_CODE).json({ error: ZOD_ERR_MESSAGE });
    }

    try {
      const userTokenPayload = await getUserPayloadByToken(req)

      const openCrateResponse = await openCrate(userTokenPayload.id, crateId);

      return res.status(200).json(openCrateResponse);
    } catch (err) {
      return res.status(SERVER_ERR_CODE).json({ error: err.message });
    }
  },
};
