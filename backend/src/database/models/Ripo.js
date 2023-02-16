const { Model, DataTypes } = require('sequelize');

class Ripo extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        rarity: DataTypes.STRING,
        ripoImage: DataTypes.STRING,
        name: DataTypes.STRING,
      },
      {
        sequelize,
        tableName: 'ripos',
      }
    );
  }

  static associate(models) {
    this.belongsToMany(models.Crate, { through: 'id' });
    this.belongsToMany(models.User, { foreignKey: 'ripoId', through: 'userRipos', as: 'users', unique: false });
  }
}

module.exports = Ripo;
