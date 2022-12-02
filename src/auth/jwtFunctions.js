require('dotenv').config();

const jwt = require('jsonwebtoken');

const secretPassword = process.env.JWT_SECRET || 'suaSenhaSecreta';

const jwtConfig = {
  algorithm: 'HS256',
  expiresIn: '30min',
};

const generateToken = (user) => {
  const token = jwt.sign({ data: user }, secretPassword, jwtConfig);
  return token;
};

module.exports = {
  generateToken,
};
