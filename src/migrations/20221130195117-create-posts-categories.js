'use strict';

const blog_posts = require("../models/BlogPost");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('posts_categories', {
      post_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        referencies: {
          model: 'blog_posts',
          key: 'id',
        },
        primary_key: true
      },
      category_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        referencies: {
          model: 'categories',
          key: 'id',
        },
        primary_key: true
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('posts_categories');
  }
};