const { generateToken } = require('../auth/jwtFunctions');
const userService = require('../services/user.service');

const createUser = async (req, res) => {
  const {
    displayName,
    email,
    password,
    image,
  } = req.body;
  const newUser = await userService.createUser(displayName, email, password, image);
  if (!newUser.created) {
    return res.status(409).json({
      message: 'User already registered',
    });
  }
  const token = generateToken(newUser.data);
  return res.status(201).json({ token });
};

const getAllUsers = async (_req, res) => {
  const allUsers = await userService.getAllUsers();
  return res.status(200).json(allUsers);
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await userService.getUserById(id);
  if (!user) return res.status(404).json({ message: 'User does not exist' });
  return res.status(200).json(user);
};

const deleteUser = async (req, res) => {
  const { id } = req.user;
  await userService.deleteUser(id);
  return res.status(204).end();
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  deleteUser,
};
