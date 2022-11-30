'use strict';

module.exports = (sequelize, DataTypes) => {
  const categories = sequelize.define('Category', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: DataTypes.STRING
  }, {
    sequelize,
    timestamps: false,
    underscored: true,
  });
  return categories;
};