'use strict';

module.exports = (sequelize, DataTypes) => {
  const blogPosts = sequelize.define('BlogPost', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    published: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updated: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
  }, {
    sequelize,
    timestamps: false,
    underscored: true,
  });

  blogPosts.associate = (models) => {
    blogPosts.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'user_id'
    });
  };
  return blogPosts;
};