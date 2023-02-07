const User = require('../../database/models/User');

module.exports = {
  async findOneUserWhere(options) {
    return await User.findOne(options);
  },

  async createUser(obj) {
    return await User.create(obj);
  },
};
