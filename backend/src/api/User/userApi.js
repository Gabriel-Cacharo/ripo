const { ZOD_ERR_CODE, ZOD_ERR_MESSAGE, SERVER_ERR_CODE } = require('../../utils/errorsCode');

const {
  registerValidation,
  loginValidation,
  searchProfileValidation,
  updateUserFacRipos,
  getPublicRipoOwnerValidation,
  resetPasswordValidation,
  forgotPasswordValidation,
  acceptForgotPasswordValidation,
  editBasicUserInformationsValidation,
} = require('./userValidations');
const {
  registerController,
  loginController,
  profileController,
  searchProfileController,
  updateUserFacRiposController,
  getPublicRipoOwnerController,
  resetUserPasswordController,
  forgotPasswordController,
  acceptForgotPasswordController,
  verifyAccountEmail,
  searchProfileResponsesController,
  getAllUsersController,
  loginAdminController,
  editBasicUserInformationsController,
} = require('./userController');
const { getUserPayloadByToken } = require('../../utils/getUserPayload');
const transport = require('../../services/nodemailer');

module.exports = {
  async register(req, res) {
    const { username, email, password } = req.body;

    let obj = {
      username,
      email,
      password,
    };

    try {
      registerValidation.parse(req.body);
    } catch (err) {
      return res.status(ZOD_ERR_CODE).json({ error: ZOD_ERR_MESSAGE });
    }

    try {
      const registerSuccessResponse = await registerController(obj);

      return res.status(201).json(registerSuccessResponse);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  },

  async login(req, res) {
    const { email, password } = req.body;

    let obj = {
      email,
      password,
    };

    try {
      loginValidation.parse(req.body);
    } catch (err) {
      return res.status(ZOD_ERR_CODE).json({ error: ZOD_ERR_MESSAGE });
    }

    try {
      const loginUserResponse = await loginController(obj);

      return res.status(200).json(loginUserResponse);
    } catch (err) {
      return res.status(SERVER_ERR_CODE).json({ error: err.message });
    }
  },

  async loginAdmin(req, res) {
    const { email, password } = req.body;

    let obj = {
      email,
      password,
    };

    try {
      loginValidation.parse(req.body);
    } catch (err) {
      return res.status(ZOD_ERR_CODE).json({ error: ZOD_ERR_MESSAGE });
    }

    try {
      const loginAdminUserResponse = await loginAdminController(obj);

      return res.status(200).json(loginAdminUserResponse);
    } catch (err) {
      return res.status(SERVER_ERR_CODE).json({ error: err.message });
    }
  },

  async profile(req, res) {
    const { userId } = req.query;

    try {
      const profileResponse = await profileController(userId);

      return res.status(200).json(profileResponse);
    } catch (err) {
      return res.status(SERVER_ERR_CODE).json({ error: err.message });
    }
  },

  async searchProfile(req, res) {
    const { username } = req.query;

    try {
      searchProfileValidation.parse(req.query);
    } catch (err) {
      return res.status(ZOD_ERR_CODE).json({ error: ZOD_ERR_MESSAGE });
    }

    try {
      const userProfileResponse = await searchProfileController(username);

      if (!userProfileResponse) {
        throw new Error('O usuário não foi encontrado');
      }

      const userProfileInformationsResponse = await profileController(userProfileResponse.dataValues.id);

      return res.status(200).json(userProfileInformationsResponse);
    } catch (err) {
      return res.status(SERVER_ERR_CODE).json({ error: err.message });
    }
  },

  async searchProfileResponses(req, res) {
    const { username } = req.query;

    try {
      searchProfileValidation.parse(req.query);
    } catch (err) {
      return res.status(ZOD_ERR_CODE).json({ error: ZOD_ERR_MESSAGE });
    }

    try {
      const searchProfileResponsesResponse = await searchProfileResponsesController(username);

      return res.status(200).json(searchProfileResponsesResponse);
    } catch (err) {
      return res.status(SERVER_ERR_CODE).json({ error: err.message });
    }
  },

  async updateUserFacRipos(req, res) {
    const { facRipos, facName } = req.body;

    try {
      updateUserFacRipos.parse(req.body);
    } catch (err) {
      return res.status(ZOD_ERR_CODE).json({ error: ZOD_ERR_MESSAGE });
    }

    try {
      const userTokenPayload = await getUserPayloadByToken(req);

      const updatedUserFacRipos = await updateUserFacRiposController(userTokenPayload.id, facRipos, facName);

      return res.status(200).json(updatedUserFacRipos);
    } catch (err) {
      return res.status(SERVER_ERR_CODE).json({ error: err.message });
    }
  },

  async getPublicRipoOwner(req, res) {
    const { ripoId } = req.query;

    try {
      getPublicRipoOwnerValidation.parse(req.query);
    } catch (err) {
      return res.status(ZOD_ERR_CODE).json({ error: ZOD_ERR_MESSAGE });
    }

    try {
      const ripoOwnerInformationsResponse = await getPublicRipoOwnerController(ripoId);

      return res.status(200).json(ripoOwnerInformationsResponse);
    } catch (err) {
      return res.status(SERVER_ERR_CODE).json({ error: err.message });
    }
  },

  async resetUserPassword(req, res) {
    const { oldPassword, newPassword } = req.body;

    try {
      resetPasswordValidation.parse(req.body);
    } catch (err) {
      return res.status(ZOD_ERR_CODE).json({ error: ZOD_ERR_MESSAGE });
    }

    try {
      const userTokenPayload = await getUserPayloadByToken(req);

      const resetUserPasswordResponse = await resetUserPasswordController(
        userTokenPayload.id,
        oldPassword,
        newPassword
      );

      return res.status(201).json(resetUserPasswordResponse);
    } catch (err) {
      return res.status(SERVER_ERR_CODE).json({ error: err.message });
    }
  },

  async forgotPassword(req, res) {
    const { email } = req.body;

    try {
      forgotPasswordValidation.parse(req.body);
    } catch (err) {
      return res.status(ZOD_ERR_CODE).json({ error: ZOD_ERR_MESSAGE });
    }

    try {
      const forgotPasswordResponse = await forgotPasswordController(email);

      return res.status(200).json(forgotPasswordResponse);
    } catch (err) {
      return res.status(SERVER_ERR_CODE).json({ error: err.message });
    }
  },

  async acceptForgotPassword(req, res) {
    const { token, newPassword } = req.body;

    try {
      acceptForgotPasswordValidation.parse(req.body);
    } catch (err) {
      return res.status(ZOD_ERR_CODE).json({ error: ZOD_ERR_MESSAGE });
    }

    try {
      const acceptForgotPasswordResponse = await acceptForgotPasswordController(token, newPassword);

      return res.status(201).json(acceptForgotPasswordResponse.message);
    } catch (err) {
      return res.status(SERVER_ERR_CODE).json({ error: err.message });
    }
  },

  async verifyAccountEmail(req, res) {
    try {
      const userTokenPayload = await getUserPayloadByToken(req);

      const verifyAccountEmailResponse = await verifyAccountEmail(userTokenPayload.id);

      return res.status(200).json(verifyAccountEmailResponse);
    } catch (err) {
      return res.status(SERVER_ERR_CODE).json({ error: err.message });
    }
  },

  async getAllUsers(req, res) {
    try {
      const getAllUsersResponse = await getAllUsersController();

      return res.status(200).json(getAllUsersResponse);
    } catch (err) {
      return res.status(SERVER_ERR_CODE).json({ error: err.message });
    }
  },

  async editUserBasicInformations(req, res) {
    const { userId, xp, coins, twitch, instagram } = req.body;

    try {
      editBasicUserInformationsValidation.parse(req.body);
    } catch (err) {
      console.log(err);
      return res.status(ZOD_ERR_CODE).json({ error: ZOD_ERR_MESSAGE });
    }

    try {
      const editBasicValidationsResponse = await editBasicUserInformationsController(
        userId,
        xp,
        coins,
        twitch,
        instagram
      );

      return res.status(201).json(editBasicValidationsResponse);
    } catch (err) {
      return res.status(SERVER_ERR_CODE).json({ error: err.message });
    }
  },
};
