const { transformGame } = require("../merge");

module.exports = async (_, { userId }, { models }) => {
  const findGames = await models.Game.find({
    $or: [{ "user1.user": userId }, { "user2.user": userId }],
  });
  return findGames.map((game) => transformGame(game));
};
