const { Model, DataTypes } = require('sequelize');

class Guns extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        name: DataTypes.STRING,
        price: DataTypes.STRING,
        type: DataTypes.BOOLEAN,
        gunImage: DataTypes.STRING,
      },
      {
        sequelize,
        tableName: 'cars',
      }
    );
  }
}

module.exports = Guns;
