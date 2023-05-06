const { transformGame, transformRound, transformUser } = require("../merge");

module.exports = async (_, {}, { models }) => {
  try {
    const users = await models.User.find({});
<<<<<<< HEAD
    return users.map((user) => transformUser(user));
=======
    return users.map((user) => ({
      ...user._doc,
      games: supportGames(user.games),
    }));
>>>>>>> 6975dffe4f9e228c0c2d7c052188bb808b7ac9d5
  } catch (err) {
    throw err;
  }
};
// module.exports = async (_, {}, { models }) => {
//   return await models.User.find({}).populate("games").populate("rounds");
// };
