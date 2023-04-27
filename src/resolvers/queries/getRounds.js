// module.exports = async (_, {}, { models }) => {
//   return await models.Round.find({});
// };

const { user, games } = require("./supportFunctions");

// module.exports = async (_, {}, { models }) => {
//   return await models.Game.find({}).populate("rounds");
// };

module.exports = async (_, {}, { models }) => {
  try {
    const rounds = await models.Round.find({});

    return rounds.map((round) => ({
      ...round._doc,
      game: games.bind(this, round._doc.game),
      user1: {
        user: user.bind(this, round._doc.user1.user),
        pick: round._doc.user1.pick,
      },
      user2: {
        user: user.bind(this, round._doc.user2.user),
        pick: round._doc.user2.pick,
      },
      winnerRound: user.bind(this, round._doc.winnerRound),
    }));
  } catch (err) {
    throw err;
  }
};
