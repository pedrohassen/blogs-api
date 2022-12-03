const categoryService = require('../services/category.service');

const createCategory = async (req, res) => {
  const { name } = req.body;
  const newCategory = await categoryService.createCategory(name);
  return res.status(201).json(newCategory);
};

const getAllCategories = async (_req, res) => {
  const allCategories = await categoryService.getAllCategories();
  return res.status(200).json(allCategories);
};

module.exports = {
  createCategory,
  getAllCategories,
};
