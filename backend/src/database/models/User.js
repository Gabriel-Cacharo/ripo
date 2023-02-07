const { Model, DataTypes } = require('sequelize');

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          unique: true,
        },
        username: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        xp: DataTypes.STRING,
        coins: DataTypes.STRING,
        lastRedeemCrate: DataTypes.DATE,
      },
      {
        sequelize,
      }
    );
  }
}

module.exports = User;
