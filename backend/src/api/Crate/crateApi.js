const { ZOD_ERR_CODE, ZOD_ERR_MESSAGE, SERVER_ERR_CODE } = require('../../utils/errorsCode');
const { getUserCratesValidation } = require('./crateValidations');

const { getUserCrates, redeemCrate } = require('./crateController');

module.exports = {
  async getUserCrates(req, res) {
    const { userId } = req.query;

    try {
      getUserCratesValidation.parse(req.query);
    } catch (err) {
      return res.status(ZOD_ERR_CODE).json({ error: ZOD_ERR_MESSAGE });
    }

    try {
      const userCratesResponse = await getUserCrates(userId);

      return res.status(200).json(userCratesResponse);
    } catch (err) {
      return res.status(SERVER_ERR_CODE).json({ error: err.message });
    }
  },

  async redeemCrate(req, res) {
    const { userId } = req.query;

    try {
      getUserCratesValidation.parse(req.query);
    } catch (err) {
      return res.status(ZOD_ERR_CODE).json({ error: ZOD_ERR_MESSAGE });
    }

    try {
      const redeemCrateResponse = await redeemCrate(userId);

      return res.status(200).json(redeemCrateResponse);
    } catch (err) {
      return res.status(SERVER_ERR_CODE).json({ error: err.message });
    }
  },
};
