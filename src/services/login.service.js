require('dotenv').config();

const jwt = require('jsonwebtoken');
const { User } = require('../models');

const secretPassword = process.env.JWT_SECRET || 'suaSenhaSecreta';

const jwtConfig = {
  algorithm: 'HS256',
  expiresIn: '30min',
};

const findUser = async (email) => {
  const user = await User.findOne({ where: { email } });
  return user;
};

const generateToken = (user, secret, config) => {
  const token = jwt.sign({ data: user }, secret, config);
  return token;
};

const login = async (email) => {
  const user = await findUser(email);
  const { password: _, ...userWithoutPassword } = user;
  const token = generateToken(userWithoutPassword, secretPassword, jwtConfig);
  return token;
};

module.exports = {
  findUser,
  login,
};
