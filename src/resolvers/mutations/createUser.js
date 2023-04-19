const { User } = require("../../models");

module.exports = async (_, { input }, { models }) => {
  const newUser = new User(input);
  const createdUser = await newUser.save();

  return createdUser;
};
