const { ZOD_ERR_CODE, ZOD_ERR_MESSAGE, SERVER_ERR_CODE } = require('../../utils/errorsCode');
const { buyCrateValidation } = require('./crateValidations');

const { getUserCrates, redeemCrate, buyCrate, openCrate } = require('./crateController');

module.exports = {
  async getUserCrates(req, res) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    try {
      const userCratesResponse = await getUserCrates(token);

      return res.status(200).json(userCratesResponse);
    } catch (err) {
      return res.status(SERVER_ERR_CODE).json({ error: err.message });
    }
  },

  async redeemCrate(req, res) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    try {
      const redeemCrateResponse = await redeemCrate(token);

      return res.status(200).json(redeemCrateResponse);
    } catch (err) {
      return res.status(SERVER_ERR_CODE).json({ error: err.message });
    }
  },

  async buyCrate(req, res) {
    const { crateId } = req.query;
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    try {
      buyCrateValidation.parse(req.query);
    } catch (err) {
      return res.status(ZOD_ERR_CODE).json({ error: ZOD_ERR_MESSAGE });
    }

    try {
      const buyCrateResponse = await buyCrate(token, crateId);

      return res.status(200).json(buyCrateResponse);
    } catch (err) {
      return res.status(SERVER_ERR_CODE).json({ error: err.message });
    }
  },

  async openCrate(req, res) {
    const { crateId } = req.query;
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    try {
      buyCrateValidation.parse(req.query);
    } catch (err) {
      return res.status(ZOD_ERR_CODE).json({ error: ZOD_ERR_MESSAGE });
    }

    try {
      const openCrateResponse = await openCrate(token, crateId);

      return res.status(200).json(openCrateResponse);
    } catch (err) {
      return res.status(SERVER_ERR_CODE).json({ error: err.message });
    }
  },
};
