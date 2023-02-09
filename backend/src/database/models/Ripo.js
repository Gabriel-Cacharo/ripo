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
      },
      {
        sequelize,
        tableName: 'ripos',
      }
    );
  }
}

module.exports = Ripo;
