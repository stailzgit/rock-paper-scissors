const games = async (_, { gamesIds }, { models }) => {
  try {
    const games = await models.Game.find({ _id: { $in: gamesIds } });
    return games.map((game) => ({
      ...game._doc,
      user1: {
        user: user.bind(this, game._doc.user1.user),
        score: game._doc.user1.score,
      },
      user2: {
        user: user.bind(this, game._doc.user2.user),
        score: game._doc.user2.score,
      },
    }));
  } catch {
    throw err;
  }
};

const rounds = async (_, { roundsIds }, { models }) => {
  try {
    const rounds = await models.Round.find({ _id: { $in: roundsIds } });
    return rounds.map((round) => ({
      ...round._doc,
      user1: {
        user: user.bind(this, round._doc.user1.user),
        pick: round._doc.user1.pick,
      },
      user2: {
        user: user.bind(this, round._doc.user2.user),
        pick: round._doc.user2.pick,
      },
    }));
  } catch {
    throw err;
  }
};

const user = async (_, { usersId }, { models }) => {
  try {
    const user = await models.User.findById(usersId);
    return {
      ...user._doc,
      games: games.bind(this, user._doc.games),
      rounds: rounds.bind(this, user._doc.rounds),
    };
  } catch (err) {
    throw err;
  }
};

module.exports = { supportUser, supportGames, supportRounds };
