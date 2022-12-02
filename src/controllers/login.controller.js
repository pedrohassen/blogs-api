const loginService = require('../services/login.service');

const login = async (req, res) => {
  const { user } = req;
  const token = await loginService.login(user);
  return res.status(200).json({ token });
};

module.exports = {
  login,
};
