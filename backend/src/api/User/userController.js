const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { findOneUserWhere, createUser } = require('./userDatabase');

module.exports = {
  async registerController(obj) {
    const emailAlreadyExists = await findOneUserWhere({ where: { email: obj.email } });

    if (emailAlreadyExists) {
      throw new Error('Esse email já existe.');
    }

    const salt = bcrypt.genSaltSync(14);
    const encryptedPassword = bcrypt.hashSync(obj.password, salt);

    obj.password = encryptedPassword;

    const createdUserResponse = await createUser(obj);

    return {
      id: createdUserResponse.id,
      username: createdUserResponse.username,
      email: createdUserResponse.email,
    };
  },

  async loginController(obj) {
    const userExists = await findOneUserWhere({ where: { email: obj.email } });

    if (!userExists) {
      throw new Error('Email não encontrado');
    }

    const checkPassword = await bcrypt.compare(obj.password, userExists.password);

    if (!checkPassword) {
      throw new Error('Senha incorreta');
    }

    try {
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
        },
        token: token,
      };
    } catch (err) {
      console.log(err);

      throw new Error('Ocorreu um erro ao fazer login. Tente novamente mais tarde.');
    }
  },
};
