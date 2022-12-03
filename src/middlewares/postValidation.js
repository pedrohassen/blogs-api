const categoryService = require('../services/category.service');

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

module.exports = {
  postFieldsValidation,
};
