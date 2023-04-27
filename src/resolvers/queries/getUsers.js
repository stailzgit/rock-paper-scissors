const { games, rounds } = require("./supportFunctions");
module.exports = async (_, {}, { models }) => {
  models.User.find({});

  try {
    const users = await models.User.find({});
    return users.map((user) => ({
      ...user._doc,
      games: games.bind(this, user._doc.games),
      rounds: rounds.bind(this, user._doc.games),
    }));
  } catch (err) {
    throw err;
  }
};
// module.exports = async (_, {}, { models }) => {
//   return await models.User.find({}).populate("games").populate("rounds");
// };
