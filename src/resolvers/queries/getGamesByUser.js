const { transformGame } = require("../merge");
const { Game } = require("../../models");

module.exports = async (_, { userId }) => {
  const findGames = await Game.find({
    $or: [{ "sender.id": userId }, { "recipient.id": userId }],
  });
  return findGames.map((game) => transformGame(game));
};
