const { ZOD_ERR_CODE, ZOD_ERR_MESSAGE, SERVER_ERR_CODE } = require('../../utils/errorsCode');
const { getUserPayloadByToken } = require('../../utils/getUserPayload');

const {
  buyCrateValidation,
  removeUserCrateValidation,
  editCrateBasicInformationsValidation,
} = require('./crateValidations');

const {
  getUserCrates,
  redeemCrate,
  buyCrate,
  openCrate,
  removeUserCrateController,
  getAllCratesController,
  addUserCrateController,
  editCrateBasicInformationsController,
} = require('./crateController');

module.exports = {
  async getAllCrates(req, res) {
    try {
      const allCratesResponse = await getAllCratesController();

      return res.status(200).json(allCratesResponse);
    } catch (err) {
      return res.status(SERVER_ERR_CODE).json({ error: err.message });
    }
  },

  async getUserCrates(req, res) {
    try {
      const userTokenPayload = await getUserPayloadByToken(req);

      const userCratesResponse = await getUserCrates(userTokenPayload.id);

      return res.status(200).json(userCratesResponse);
    } catch (err) {
      return res.status(SERVER_ERR_CODE).json({ error: err.message });
    }
  },

  async getSpecificUserCrates(req, res) {
    const { userId } = req.query;

    try {
      const userCratesResponse = await getUserCrates(userId);

      return res.status(200).json(userCratesResponse);
    } catch (err) {
      return res.status(SERVER_ERR_CODE).json({ error: err.message });
    }
  },

  async redeemCrate(req, res) {
    try {
      const userTokenPayload = await getUserPayloadByToken(req);

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
      const userTokenPayload = await getUserPayloadByToken(req);

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
      const userTokenPayload = await getUserPayloadByToken(req);

      const openCrateResponse = await openCrate(userTokenPayload.id, crateId);

      return res.status(200).json(openCrateResponse);
    } catch (err) {
      return res.status(SERVER_ERR_CODE).json({ error: err.message });
    }
  },

  async removeUserCrate(req, res) {
    const { userId, crateId } = req.body;

    try {
      removeUserCrateValidation.parse(req.body);
    } catch (err) {
      return res.status(ZOD_ERR_CODE).json({ error: ZOD_ERR_MESSAGE });
    }

    try {
      const removeUserCrateResponse = await removeUserCrateController(userId, crateId);

      return res.status(200).json(removeUserCrateResponse);
    } catch (err) {
      return res.status(SERVER_ERR_CODE).json({ error: err.message });
    }
  },

  async addUserCrate(req, res) {
    const { userId, crateId } = req.body;

    try {
      removeUserCrateValidation.parse(req.body);
    } catch (err) {
      return res.status(ZOD_ERR_CODE).json({ error: ZOD_ERR_MESSAGE });
    }

    try {
      const addUserCrateResponse = await addUserCrateController(userId, crateId);

      return res.status(200).json(addUserCrateResponse);
    } catch (err) {
      return res.status(SERVER_ERR_CODE).json({ error: err.message });
    }
  },

  async editCrateBasicInformations(req, res) {
    const { name, rarity, price, crateImage, canDropItems, canDropRipo, itemsDrop, riposDrop, type } = req.body;

    try {
      editCrateBasicInformationsValidation.parse(req.body);
    } catch (err) {
      return res.status(ZOD_ERR_CODE).json({ error: ZOD_ERR_MESSAGE });
    }

    let obj = {
      name,
      rarity,
      price,
      crateImage,
      canDropItems,
      canDropRipo,
      itemsDrop,
      riposDrop,
      type,
    };

    try {
      const editCrateBasicInformationsResponse = await editCrateBasicInformationsController(req.body.crateId, obj);

      return res.status(200).json(editCrateBasicInformationsResponse);
    } catch (err) {
      return res.status(SERVER_ERR_CODE).json({ error: err.message });
    }
  },
};
