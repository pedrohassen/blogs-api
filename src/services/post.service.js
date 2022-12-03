const {
  BlogPost,
  PostCategory,
  sequelize,
} = require('../models');

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

module.exports = {
  createPost,
};
