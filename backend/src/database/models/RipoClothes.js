const { Model, DataTypes } = require('sequelize');

class RipoClothes extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        type: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        default: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        red: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
        },
        darkRed: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        lightRed: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        salmon: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        lightPink: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        pink: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        darkPink: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        lightOrange: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        orange: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        darkYellow: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        yellow: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        lightPurple: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        purple: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        lightPurpleWithBlue: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        lime: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        lightGreen: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        green: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        cyan: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        lightCyan: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        ice: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        lightBlue: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        blue: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        beige: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        white: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        darkWhite: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        lightGray: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        gray: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        black: {
          type: DataTypes.STRING,
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: 'ripoclothes',
      }
    );
  }
}

module.exports = RipoClothes;
