const { Model, DataTypes } = require('sequelize');

class Cars extends Model {
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
        rarity: DataTypes.STRING,
        carImage: DataTypes.STRING,
      },
      {
        sequelize,
        tableName: 'cars',
      }
    );
  }
}

module.exports = Cars;
