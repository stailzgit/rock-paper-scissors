const { supportGames } = require("../supportResolvers");

module.exports = async (_, { input }, { models }) => {
  const newUser = new models.User(input);
  const createdUser = await newUser.save();
  return createdUser;
};
