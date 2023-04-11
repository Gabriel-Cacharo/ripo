const { uploadImageCloudinary } = require('../../services/cloudinary');

const { SERVER_ERR_MESSAGE, USER_NOT_EXISTS_MESSAGE } = require('../../utils/errorsCode');
const { renderImageByBase64 } = require('../../utils/renderImage');

const { findOneUserWhere, addUserCoins, updateUser } = require('../User/userDatabase');
const {
  getUserRipos,
  verifyIfUserAlreadyHaveThisRipoDatabase,
  removeUserRipo,
  createRipo,
  addUserRipo,
  getAllRipoClothesDatabase,
} = require('./ripoDatabase');

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

  async createUserRipoController(userId, ripoUrl, ripoName, twitch, instagram) {
    try {
      // Render image by base64
      await renderImageByBase64(ripoUrl);

      // Upload image at cloudinary
      const imageUploadedResponse = await uploadImageCloudinary('image.png');

      const ripoObj = {
        rarity: 0,
        price: '300',
        ripoImage: imageUploadedResponse.url,
        name: ripoName,
        public: false,
      };

      const createdRipoResponse = await createRipo(ripoObj);

      // Link ripoId into user
      return await updateUser(
        { ripoId: createdRipoResponse.dataValues.id, twitch, instagram },
        { where: { id: userId } }
      );

      // Add ripo to user
      // return await addUserRipo(userId, createdRipoResponse.dataValues.id);
    } catch (err) {
      throw new Error(SERVER_ERR_MESSAGE);
    }
  },

  async getAllRipoClothes() {
    try {
      const allRipoClothes = await getAllRipoClothesDatabase();

      return allRipoClothes;
    } catch (err) {
      throw new Error(SERVER_ERR_MESSAGE);
    }
  },
};
