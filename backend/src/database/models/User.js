const { Model, DataTypes } = require('sequelize');

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        username: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        xp: DataTypes.STRING,
        coins: DataTypes.STRING,
        facName: DataTypes.STRING,
        facRipos: DataTypes.STRING,
        favoriteCar: DataTypes.INTEGER,
        favoriteGun: DataTypes.INTEGER,
        favoriteSecondGun: DataTypes.INTEGER,
        lastRedeemCrate: DataTypes.DATE,
        twitch: DataTypes.STRING,
        instagram: DataTypes.STRING,
        verifiedEmail: DataTypes.BOOLEAN,
        admin: DataTypes.BOOLEAN,
        ripoId: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: 'users',
      }
    );
  }

  static associate(models) {
    this.belongsToMany(models.Crate, { foreignKey: 'userId', through: 'userCrates', as: 'crates', unique: false });
    this.belongsToMany(models.Ripo, { foreignKey: 'userId', through: 'userRipos', unique: false });
  }
}

module.exports = User;
