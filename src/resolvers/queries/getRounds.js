// module.exports = async (_, {}, { models }) => {
//   return await models.Round.find({});
// };

const { transformRound } = require("../merge");

// module.exports = async (_, {}, { models }) => {
//   return await models.Game.find({}).populate("rounds");
// };

module.exports = async (_, {}, { models }) => {
  try {
    const rounds = await models.Round.find({});
<<<<<<< HEAD
    return rounds.map((round) => transformRound(round));
=======

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
>>>>>>> 6975dffe4f9e228c0c2d7c052188bb808b7ac9d5
  } catch (err) {
    throw err;
  }
};
