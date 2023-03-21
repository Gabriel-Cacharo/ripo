const Sequelize = require('sequelize');
const dbConfig = require('./config/config.json');

const User = require('./models/User');
const Crate = require('./models/Crate');
const Ripo = require('./models/Ripo');
const Car = require('./models/Car');
const Gun = require('./models/Gun');
const RipoClothes = require('./models/RipoClothes');

const connection = new Sequelize(dbConfig.development);

// Models
User.init(connection);
Crate.init(connection);
Ripo.init(connection);
Car.init(connection);
Gun.init(connection);
RipoClothes.init(connection);

// Relations
User.associate(connection.models);
Crate.associate(connection.models);
Ripo.associate(connection.models);

module.exports = {
  connection,
};
