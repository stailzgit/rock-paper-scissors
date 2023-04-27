const { supportRounds, supportUser } = require("../supportResolvers");

// module.exports = async (_, {}, { models }) => {
//   return await models.Game.find({}).populate("rounds");
// };

module.exports = async (_, {}, { models }) => {
  try {
    const games = await models.Game.find({});

    return games.map((game) => ({
      ...game._doc,
      user1: {
        user: supportUser.bind(this, game._doc.user1.user),
        score: game._doc.user1.score,
      },
      user2: {
        user: supportUser.bind(this, game._doc.user2.user),
        score: game._doc.user2.score,
      },
      winnerGame: supportUser.bind(this, game._doc.winnerGame),
      rounds: supportRounds.bind(this, game._doc.rounds),
    }));
  } catch (err) {
    throw err;
  }
};
