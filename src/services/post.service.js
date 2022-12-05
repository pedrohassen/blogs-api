const {
  BlogPost,
  PostCategory,
  User,
  Category,
  sequelize,
} = require('../models');

const findOptions = {
  include: [
    { model: User, as: 'user', attributes: ['id', 'displayName', 'email', 'image'] },
    { model: Category, as: 'categories', through: { attributes: [] } },
  ],
};

const createPost = async ({ userId, title, content, categories }) => {
  const result = await sequelize.transaction(async (t) => {
    const newPost = await BlogPost.create({
      title,
      content,
      userId,
    }, { transaction: t });
    await Promise.all(categories.map(async (categoryId) => PostCategory.create({
      postId: newPost.dataValues.id,
      categoryId,
    }, { transaction: t })));
    return newPost;
  });
  return result;
};

const getPosts = async () => {
  const allPosts = await BlogPost.findAll(findOptions);
  return allPosts;
};

module.exports = {
  createPost,
  getPosts,
};