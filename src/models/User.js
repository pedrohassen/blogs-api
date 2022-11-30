'use strict';

module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('User', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING
  }, {
    sequelize,
    timestamps: false,
    underscored: true,
  });

  users.associate = (models) => {
    users.hasMany(models.BlogPost, {
      as: 'blog_posts',
      foreignKey: 'user_id'
    });
  };
  return users;
};