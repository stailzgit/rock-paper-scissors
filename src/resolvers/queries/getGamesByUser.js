const { transformGame } = require("../merge");
const { Game } = require("../../models/game");

module.exports = async (_, { userId }, { models }) => {
  const findGames = await Game.find({
    $or: [{ "sender.id": userId }, { "recipient.id": userId }],
  });
  return findGames.map((game) => transformGame(game));
};
