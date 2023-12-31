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
        price: DataTypes.STRING,
        ripoImage: DataTypes.STRING,
        publicId: DataTypes.STRING,
        name: DataTypes.STRING,
        public: DataTypes.BOOLEAN,
      },
      {
        sequelize,
        tableName: 'ripos',
      }
    );
  }

  static associate(models) {
    this.belongsToMany(models.Crate, { through: 'id' });
    this.belongsToMany(models.User, { foreignKey: 'ripoId', through: 'userRipos', unique: false });
  }
}

module.exports = Ripo;
