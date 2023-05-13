const { transformGame } = require("../merge");

module.exports = async (_, { userId }, { models }) => {
  const findGames = await models.Game.find({
    $or: [{ "sender.id": userId }, { "recipient.id": userId }],
  });
  return findGames.map((game) => transformGame(game));
};
