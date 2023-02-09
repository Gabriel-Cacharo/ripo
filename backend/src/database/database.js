const Sequelize = require('sequelize');
const dbConfig = require('./config/config.json');

const User = require('./models/User');
const Crate = require('./models/Crate');
const Ripo = require('./models/Ripo');

const connection = new Sequelize(dbConfig.development);

// Models
User.init(connection);
Crate.init(connection);
Ripo.init(connection);

// Relations
User.associate(connection.models);
Crate.associate(connection.models);

module.exports = {
  connection,
};
