const categoryService = require('../services/category.service');
const postService = require('../services/post.service');

const postFieldsValidation = async (req, res, next) => {
  const { title, content, categoryIds } = req.body;
  if (!title || !content || !categoryIds) {
    return res.status(400)
      .json({ message: 'Some required fields are missing' }); 
  }
  const categories = await categoryService.getAllCategories();
  const checkCategories = categories.map((category) => categoryIds.includes(category.id));
  if (!checkCategories.every((category) => category)) {
    return res.status(400)
      .json({ message: 'one or more "categoryIds" not found' }); 
  }
  next();
};

const updatedPostFieldsValidation = async (req, res, next) => {
  const { params: { id }, body: { title, content }, user } = req;
  if (!title || !content) {
    return res.status(400)
      .json({ message: 'Some required fields are missing' }); 
  }
  const post = await postService.getPostById(id);
  if (post.user.id !== user.id) return res.status(401).json({ message: 'Unauthorized user' });
  next();
};

const deletePostValidation = async (req, res, next) => {
  const { params: { id }, user } = req;
  const post = await postService.getPostById(id);
  if (!post) return res.status(404).json({ message: 'Post does not exist' });
  if (post.user.id !== user.id) return res.status(401).json({ message: 'Unauthorized user' });
  next();
};

module.exports = {
  postFieldsValidation,
  updatedPostFieldsValidation,
  deletePostValidation,
};
