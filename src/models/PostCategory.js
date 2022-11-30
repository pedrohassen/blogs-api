'use strict';

module.exports = (sequelize, DataTypes) => {
  const postsCategories = sequelize.define('PostCategory', {
    postId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER
  }, {
    sequelize,
    timestamps: false,
    underscored: true,
  });

  postsCategories.associate = ({ Category, BlogPost }) => {
    Category.belongsToMany(BlogPost, {
      as: 'categories',
      through: postsCategories,
      foreignKey: 'category_id',
      otherKey: 'post_id'
    });

    BlogPost.belongsToMany(Category, {
      as: 'blog_posts',
      through: postsCategories,
      foreignKey: 'post_id',
      otherKey: 'category_id'
    });
  };
  return postsCategories;
};