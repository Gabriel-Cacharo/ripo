const { Model, DataTypes } = require('sequelize');

class Crate extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        name: DataTypes.STRING,
        type: DataTypes.STRING,
        price: DataTypes.STRING,
        rarity: DataTypes.INTEGER,
        canDropRipo: DataTypes.BOOLEAN,
        riposDrop: DataTypes.STRING,
        canDropItems: DataTypes.BOOLEAN,
        itemsDrop: DataTypes.STRING,
        crateImage: DataTypes.STRING,
      },
      {
        sequelize,
        tableName: 'crates',
      }
    );
  }

  static associate(models) {
    this.belongsToMany(models.User, { foreignKey: 'crateId', through: 'userCrates', as: 'users', unique: false });
    this.belongsToMany(models.Ripo, { through: 'id' });
  }
}

module.exports = Crate;
