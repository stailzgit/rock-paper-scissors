const { supportGames } = require("../supportResolvers");

module.exports = async (_, { input }, { models }) => {
  const newUser = new models.User(input);
  const createdUser = await newUser.save();
  console.log("newUser._doc.games", newUser._doc.games);
  console.log("newUser._doc.games", newUser.games);
  console.log("newUser._doc.games", newUser);
  console.log("createdUser", createdUser);
  return {
    ...createdUser,
    games: supportGames(newUser.games),
  };
};
