const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SERVER_ERR_MESSAGE } = require('../../utils/errorsCode');

const { findOneUserWhere, createUser } = require('./userDatabase');

module.exports = {
  async registerController(obj) {
    try {
      const emailAlreadyExists = await findOneUserWhere({ where: { email: obj.email } });

      if (emailAlreadyExists) {
        throw new Error('Esse email já existe.');
      }

      const salt = bcrypt.genSaltSync(14);
      const encryptedPassword = bcrypt.hashSync(obj.password, salt);

      obj.password = encryptedPassword;

      const createdUser = await createUser(obj);

      const token = jwt.sign(
        {
          id: createdUser.dataValues.id,
          email: createdUser.dataValues.email,
          username: createdUser.dataValues.username,
        },
        process.env.JWT_SECRET,
        { expiresIn: '48h' }
      );

      return {
        user: {
          id: createdUser.dataValues.id,
          username: createdUser.dataValues.username,
          email: createdUser.dataValues.email,
        },
        token,
      };
    } catch (err) {
      console.log(err);

      throw new Error(err.message || SERVER_ERR_MESSAGE);
    }
  },

  async loginController(obj) {
    try {
      const userExists = await findOneUserWhere({ where: { email: obj.email } });

      if (!userExists) {
        throw new Error('Email não encontrado');
      }

      const checkPassword = await bcrypt.compare(obj.password, userExists.password);

      if (!checkPassword) {
        throw new Error('Senha incorreta');
      }

      const token = jwt.sign(
        { id: userExists.id, email: userExists.email, username: userExists.username },
        process.env.JWT_SECRET,
        { expiresIn: '48h' }
      );

      return {
        user: {
          id: userExists.id,
          email: userExists.email,
          username: userExists.username,
          coins: userExists.coins,
        },
        token: token,
      };
    } catch (err) {
      console.log(err);

      throw new Error(err.message || SERVER_ERR_MESSAGE);
    }
  },
};
