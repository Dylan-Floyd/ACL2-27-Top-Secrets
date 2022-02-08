const bcrypt = require('bcrypt');
const User = require('../models/User');

module.exports = {
  signUp: async ({ email, password }) => {
    const existingUser = await User.getByEmail(email);
    if (existingUser?.id) throw new Error('Account already exists');

    const passwordHash = await bcrypt.hash(
      password,
      Number(process.env.SALT_ROUNDS)
    );

    const user = await User.insert({
      email,
      passwordHash,
    });

    return user;

  }
};
