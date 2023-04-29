// module.exports = async (_, {}, { models }) => {
//   return await models.Round.find({});
// };

const { supportUser, supportGames } = require("../supportResolvers");

// module.exports = async (_, {}, { models }) => {
//   return await models.Game.find({}).populate("rounds");
// };

module.exports = async (_, {}, { models }) => {
  try {
    const rounds = await models.Round.find({});

    return rounds.map((round) => ({
      ...round,
      game: supportGames(round.game),
      user1: {
        user: supportUser(round.user1.user),
        pick: round.user1.pick,
      },
      user2: {
        user: supportUser(round.user2.user),
        pick: round.user2.pick,
      },
      winnerRound: supportUser(round.winnerRound),
    }));
  } catch (err) {
    throw err;
  }
};
