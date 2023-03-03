const jwt = require('jsonwebtoken')

module.exports = {
  async getUserPayloadByToken(req) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    return jwt.decode(token);
  }
}
