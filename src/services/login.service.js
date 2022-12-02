const { generateToken } = require('../auth/jwtFunctions');
const { User } = require('../models');

const findUser = async (email) => {
  const user = await User.findOne({ where: { email } });
  return user;
};

const login = async (user) => {
  const { password: _, ...userWithoutPassword } = user;
  const token = generateToken(userWithoutPassword);
  return token;
};

module.exports = {
  findUser,
  login,
};
