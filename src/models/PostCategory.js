'use strict';

module.exports = (sequelize, DataTypes) => {
  const postsCategories = sequelize.define('PostCategory', {
    postId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER
  }, {
    sequelize,
    tableName: 'posts_categories',
    timestamps: false,
    underscored: true,
  });

  postsCategories.associate = ({ Category, BlogPost }) => {
    Category.belongsToMany(BlogPost, {
      as: 'posts',
      through: postsCategories,
      foreignKey: 'categoryId',
      otherKey: 'postId'
    });

    BlogPost.belongsToMany(Category, {
      as: 'categories',
      through: postsCategories,
      foreignKey: 'postId',
      otherKey: 'categoryId'
    });
  };
  return postsCategories;
};