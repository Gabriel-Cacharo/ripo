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
        lastRedeemCrate: DataTypes.DATE,
      },
      {
        sequelize,
        tableName: 'users',
      }
    );
  }

  static associate(models) {
    this.belongsToMany(models.Crate, { foreignKey: 'userId', through: 'userCrates', as: 'crates', unique: false });
    this.belongsToMany(models.Ripo, { foreignKey: 'userId', through: 'userRipos', as: 'ripos', unqiue: false });
  }
}

module.exports = User;
