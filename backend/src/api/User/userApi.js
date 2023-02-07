const { ZOD_ERR_CODE, ZOD_ERR_MESSAGE } = require('../../utils/errorsCode');

const { registerValidation, loginValidation } = require('./userValidations');
const { registerController, loginController } = require('./userController');

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
      console.log(err);
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
      return res.status(400).json({ error: err.message });
    }
  },
};
