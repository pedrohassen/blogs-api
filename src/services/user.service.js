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

const getAllUsers = async () => {
  const users = await User.findAll();
  const usersWithoutPassword = users.map((user) => {
    const { password: _, ...userWithoutPassword } = user.dataValues;
    return userWithoutPassword;
  });
  return usersWithoutPassword;
};

module.exports = {
  createUser,
  getAllUsers,
};
