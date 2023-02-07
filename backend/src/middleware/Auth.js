const jwt = require('jsonwebtoken');

const { NOT_AUTHORIZED_CODE, NOT_AUTHORIZED_MESSAGE } = require('../utils/errorsCode');

module.exports = {
  async authMiddleware(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(NOT_AUTHORIZED_CODE).json({ error: NOT_AUTHORIZED_MESSAGE });
    }

    try {
      jwt.verify(token, process.env.JWT_SECRET);

      next();
    } catch (err) {
      return res.status(NOT_AUTHORIZED_CODE).json({ error: NOT_AUTHORIZED_MESSAGE });
    }
  },
};
