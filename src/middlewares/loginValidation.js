const { findUser } = require('../services/login.service');

const checkFields = (user, password) => {
  if (user.password !== password) return false;
  return true;
};

const loginValidation = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await findUser(email);
  if (!email || !password) {
    return res.status(400)
      .send({ message: 'Some required fields are missing' }); 
  }
  if (!user || !checkFields(user, password)) {
    return res.status(400).send({ message: 'Invalid fields' }); 
  }
  req.user = user;
  next();
};

module.exports = {
  loginValidation,
};
