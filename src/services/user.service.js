const { User } = require('../models');

const createUser = async (displayName, email, password, image) => {
  const [newUser, created] = await User.findOrCreate({
    where: { email },
    defaults: {
      displayName,
      email,
      password,
      image,
    },
  });
  const { password: _, ...newUserWithoutPassword } = newUser.dataValues;
  return { data: newUserWithoutPassword, created };
};

module.exports = {
  createUser,
};
