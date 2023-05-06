const { transformGame } = require("../merge");

module.exports = async (_, {}, { models }) => {
  try {
    const games = await models.Game.find({});
<<<<<<< HEAD
    return games.map((game) => transformGame(game));
=======

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
>>>>>>> 6975dffe4f9e228c0c2d7c052188bb808b7ac9d5
  } catch (err) {
    throw err;
  }
};
