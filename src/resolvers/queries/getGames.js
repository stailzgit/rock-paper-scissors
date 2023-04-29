const { supportRounds, supportUser } = require("../supportResolvers");

// module.exports = async (_, {}, { models }) => {
//   return await models.Game.find({}).populate("rounds");
// };

module.exports = async (_, {}, { models }) => {
  try {
    const games = await models.Game.find({});

    return games.map((game) => ({
      ...game,
      user1: {
        user: supportUser(game.user1.user),
        score: game.user1.score,
      },
      user2: {
        user: supportUser(game.user2.user),
        score: game.user2.score,
      },
      winnerGame: supportUser(game.winnerGame),
    }));
  } catch (err) {
    throw err;
  }
};
