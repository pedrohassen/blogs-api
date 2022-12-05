const postService = require('../services/post.service');

const createPost = async (req, res) => {
  const {
    body: {
      title,
      content,
      categoryIds: categories,
    },
    user: { id: userId },
  } = req;
  const newPost = await postService.createPost({ title, content, categories, userId });
  res.status(201).json(newPost);
};

const getPosts = async (_req, res) => {
  const allPosts = await postService.getPosts();
  res.status(200).json(allPosts);
};

const getPostById = async (req, res) => {
  const { id } = req.params;
  const postById = await postService.getPostById(id);
  if (!postById) return res.status(404).json({ message: 'Post does not exist' });
  res.status(200).json(postById);
};

const changePostById = async (req, res) => {
  const { params: { id }, body: { title, content } } = req;
  const updatedPost = await postService.changePostById({ id, title, content });
  res.status(200).json(updatedPost);
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  await postService.deletePost(id);
  res.status(204).end();
};

module.exports = {
  createPost,
  getPosts,
  getPostById,
  changePostById,
  deletePost,
};
