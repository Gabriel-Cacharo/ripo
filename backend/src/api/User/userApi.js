const { ZOD_ERR_CODE, ZOD_ERR_MESSAGE, SERVER_ERR_CODE } = require('../../utils/errorsCode');

const {
  registerValidation,
  loginValidation,
  searchProfileValidation,
  updateUserFacRipos,
} = require('./userValidations');
const {
  registerController,
  loginController,
  profileController,
  searchProfileController,
  updateUserFacRiposController,
} = require('./userController');
const { getUserPayloadByToken } = require('../../utils/getUserPayload');

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
};
