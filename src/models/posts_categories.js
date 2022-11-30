'use strict';

module.exports = (sequelize, DataTypes) => {
  const postsCategories = sequelize.define({
    post_id: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER
  }, {
    sequelize,
    timestamps: false,
    underscored: true,
  });
  return postsCategories;
};