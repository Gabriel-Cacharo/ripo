const { uploadImageCloudinary, destroyImageCloudinary, editImageCloudinary } = require('../../services/cloudinary');

const { SERVER_ERR_MESSAGE, USER_NOT_EXISTS_MESSAGE } = require('../../utils/errorsCode');
const { renderImageByBase64 } = require('../../utils/renderImage');

const { findOneUserWhere, addUserCoins, updateUser, getUserRipoDatabase } = require('../User/userDatabase');
const {
  getUserRipos,
  verifyIfUserAlreadyHaveThisRipoDatabase,
  removeUserRipo,
  createRipo,
  addUserRipo,
  getAllRipoClothesDatabase,
  removeUserRipoDatabase,
  getAllRiposDatabase,
  editRipoBasicInformationsDatabase,
  destroyRipoDatabase,
  getRipoById,
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
        publicId: imageUploadedResponse.public_id,
        name: ripoName,
        public: false,
      };

      const createdRipoResponse = await createRipo(ripoObj);

      // Link ripoId into user
      await updateUser({ ripoId: createdRipoResponse.dataValues.id, twitch, instagram }, { where: { id: userId } });

      return createdRipoResponse;

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

  async removeUserRipoController(userId, ripoId) {
    try {
      return await removeUserRipoDatabase(userId, ripoId);
    } catch (err) {
      throw new Error(SERVER_ERR_MESSAGE);
    }
  },

  async getAllRiposController() {
    try {
      return await getAllRiposDatabase();
    } catch (err) {
      throw new Error(SERVER_ERR_MESSAGE);
    }
  },

  async addUserRiposController(userId, riposId) {
    try {
      for (let i = 0; i < riposId.length; i++) {
        const verifyUserAlreadyHaveThisRipoResponse = await verifyIfUserAlreadyHaveThisRipoDatabase(userId, riposId[i]);

        if (verifyUserAlreadyHaveThisRipoResponse.length > 0) {
          continue;
        }

        addUserRipo(userId, riposId[i]);
      }
    } catch (err) {
      throw new Error(SERVER_ERR_MESSAGE);
    }
  },

  async editRipoBasicInformationsController(ripoId, name, price, rarity, public, ripoImage) {
    try {
      const ripoObj = {
        name,
        price,
        rarity,
        public,
        ripoImage,
      };

      return await editRipoBasicInformationsDatabase(ripoId, ripoObj);
    } catch (err) {
      throw new Error(SERVER_ERR_MESSAGE);
    }
  },

  async deleteUserRipoController(userId) {
    try {
      const userRipo = await getUserRipoDatabase(userId);

      await destroyImageCloudinary(userRipo.dataValues.publicId);

      await destroyRipoDatabase(userRipo.dataValues.id);

      return await updateUser({ ripoId: null }, { where: { id: userId } });
    } catch (err) {
      console.log(err);
      throw new Error(SERVER_ERR_MESSAGE);
    }
  },

  async getRipoImageController(ripoId) {
    try {
      const ripoImageResponse = await getRipoById(ripoId);

      return ripoImageResponse.dataValues.ripoImage;
    } catch (err) {
      console.log(err);
      throw new Error(SERVER_ERR_MESSAGE);
    }
  },

  async editRipoImageController(ripoId, ripoUrl, ripoName) {
    try {
      const ripoResponse = await getRipoById(ripoId);

      await renderImageByBase64(ripoUrl);

      // Edit image at cloudinary
      const imageUploadedResponse = await editImageCloudinary(ripoResponse.dataValues.publicId, 'image.png');

      const ripoObj = {
        ripoImage: imageUploadedResponse.url,
        publicId: imageUploadedResponse.public_id,
        name: ripoName,
      };

      await editRipoBasicInformationsDatabase(ripoId, ripoObj);

      return { ripoImage: imageUploadedResponse.url, ripoName: ripoName };
    } catch (err) {
      throw new Error(SERVER_ERR_MESSAGE);
    }
  },
};
