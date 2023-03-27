const { Model, DataTypes } = require('sequelize');

class ForgotPassword extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        userId: DataTypes.STRING,
        token: DataTypes.STRING,
      },
      {
        sequelize,
        tableName: 'forgotpassword',
      }
    );
  }
}

module.exports = ForgotPassword;
