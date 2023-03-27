const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const {
  findOneUserWhere,
  createUser,
  getUserInformationsDatabase,
  updateUser,
  getRipoOwnerInformationsDatabase,
  userAlreadyHasAnRequestToForgotPasswordDatabase,
  addRequestToForgotPasswordDatabase,
  deleteRequestToForgotPasswordDatabase,
} = require('./userDatabase');
const { getUserRiposController } = require('../Ripo/ripoController');
const { getRipoById } = require('../Ripo/ripoDatabase');
const { addCrateToUserAfterVerifyEmailDatabase } = require('../Crate/crateDatabase');

const { SERVER_ERR_MESSAGE } = require('../../utils/errorsCode');
const transport = require('../../services/nodemailer');

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
      throw new Error(SERVER_ERR_MESSAGE);
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
          ripoId: userExists.ripoId,
          verifiedEmail: userExists.verifiedEmail,
        },
        token: token,
      };
    } catch (err) {
      throw new Error(err.message || SERVER_ERR_MESSAGE);
    }
  },

  async profileController(userId) {
    try {
      const userInformations = await getUserInformationsDatabase(userId);
      const userRipos = await getUserRiposController(userId);
      const userFacRiposIndexes = JSON.parse(userInformations.facRipos);

      const userFacRipos = [];

      if (userFacRiposIndexes && userFacRiposIndexes.length > 0) {
        await Promise.all(
          userFacRiposIndexes.map(async (ripoId) => {
            const ripoInformations = await getRipoById(ripoId);

            if (!ripoInformations) {
              return;
            }

            userFacRipos.push(ripoInformations.dataValues);
          })
        );
      }

      const userProfileRipo = await getRipoById(userInformations.ripoId);

      return {
        user: userInformations,
        ripos: userRipos,
        facRipos: userFacRipos,
        profileRipo: userProfileRipo ? userProfileRipo.ripoImage : null,
      };
    } catch (err) {
      throw new Error(SERVER_ERR_MESSAGE);
    }
  },

  async searchProfileController(username) {
    try {
      const userResponse = await findOneUserWhere({ where: { username: username } });

      return userResponse;
    } catch (err) {
      throw new Error(SERVER_ERR_MESSAGE);
    }
  },

  async updateUserFacRiposController(userId, newRipos, facName) {
    const arrayRiposIdsToString = newRipos.join(',');

    try {
      if (facName) {
        const updatedUserFacRiposResponse = await updateUser(
          { facRipos: `[${String(arrayRiposIdsToString)}]`, facName: facName },
          { where: { id: userId } }
        );

        return updatedUserFacRiposResponse;
      } else {
        const updatedUserFacRiposResponse = await updateUser(
          { facRipos: `[${String(arrayRiposIdsToString)}]` },
          { where: { id: userId } }
        );

        return updatedUserFacRiposResponse;
      }
    } catch (err) {
      throw new Error(SERVER_ERR_MESSAGE);
    }
  },

  async getPublicRipoOwnerController(ripoId) {
    try {
      const ripoOwnerInformationsResponse = await getRipoOwnerInformationsDatabase(ripoId);

      return ripoOwnerInformationsResponse;
    } catch (err) {
      throw new Error(SERVER_ERR_MESSAGE);
    }
  },

  async resetUserPasswordController(userId, oldPassword, newPassword) {
    try {
      const userExists = await findOneUserWhere({ where: { id: userId } });

      if (!userExists) {
        throw new Error("User doesn't exists");
      }

      const passwordMatch = await bcrypt.compare(oldPassword, userExists.dataValues.password);

      if (!passwordMatch) {
        throw new Error('Password does not match');
      }

      const salt = bcrypt.genSaltSync(14);
      const encryptedPassword = bcrypt.hashSync(newPassword, salt);

      const updatePasswordResponse = await updateUser({ password: encryptedPassword }, { where: { id: userId } });

      return updatePasswordResponse;
    } catch (err) {
      if (err.message === 'Password does not match') {
        throw new Error('A senha não coincide');
      }

      throw new Error(SERVER_ERR_MESSAGE);
    }
  },

  async forgotPasswordController(email) {
    try {
      const userInformations = await findOneUserWhere({ where: { email: email } });

      if (userInformations) {
        const userAlreadyHasAnRequestToForgotPassword = await userAlreadyHasAnRequestToForgotPasswordDatabase(
          userInformations.dataValues.id
        );

        if (userAlreadyHasAnRequestToForgotPassword) {
          throw new Error('Usuário já possui um pedido em aberto.');
        }

        const userToken = jwt.sign({ id: userInformations.dataValues.id, email: email }, process.env.JWT_SECRET, {
          expiresIn: '24h',
        });

        await addRequestToForgotPasswordDatabase(userInformations.dataValues.id, userToken);

        transport.sendMail({
          from: 'noreplay@ripo.com.br',
          to: email,
          subject: 'Esqueci minha senha',
          html: `<h2>Esqueci minha senha</h2></br></br><p>Para alterar a sua senha de acesso, basta clicar no link abaixo: <a href="http://localhost:5173/auth/forgotPassword?token=${userToken}">Clique aqui</a></p>`,
        });

        return { message: 'Email enviado com sucesso.' };
      }

      throw new Error('Email não encontrado');
    } catch (err) {
      if (err.message === 'Usuário já possui um pedido em aberto.') {
        throw new Error(err.message);
      }

      throw new Error(SERVER_ERR_MESSAGE);
    }
  },

  async acceptForgotPasswordController(token, newPassword) {
    try {
      jwt.verify(token, process.env.JWT_SECRET);

      const userInformations = jwt.decode(token);

      const verifyUserRequest = await userAlreadyHasAnRequestToForgotPasswordDatabase(userInformations.id);

      if (!verifyUserRequest) {
        throw new Error('Usuário não possui um pedido aberto.');
      }

      if (!verifyUserRequest.dataValues.token === token) {
        throw new Error('Token inválido');
      }

      const salt = bcrypt.genSaltSync(14);
      const encryptedPassword = bcrypt.hashSync(newPassword, salt);

      await deleteRequestToForgotPasswordDatabase(userInformations.id);

      return await updateUser({ password: encryptedPassword }, { where: { id: userInformations.id } });
    } catch (err) {
      throw new Error(SERVER_ERR_MESSAGE);
    }
  },

  async verifyAccountEmail(userId) {
    try {
      const userInformations = await findOneUserWhere({ where: { id: userId } });

      if (userInformations.dataValues.verifiedEmail === true) {
        throw new Error('Sua conta já está verificada');
      }

      await updateUser({ verifiedEmail: true }, { where: { id: userId } });

      return addCrateToUserAfterVerifyEmailDatabase();
    } catch (err) {
      throw new Error(SERVER_ERR_MESSAGE);
    }
  },
};
