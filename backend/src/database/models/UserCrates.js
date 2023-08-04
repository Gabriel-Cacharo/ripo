const { Model, DataTypes } = require('sequelize');

class UserCrates extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        userId: {
          type: DataTypes.INTEGER,
        },
        crateId: {
          type: DataTypes.INTEGER,
        },
      },
      {
        sequelize,
        tableName: 'usercrates',
      }
    );
  }
}

module.exports = UserCrates;
