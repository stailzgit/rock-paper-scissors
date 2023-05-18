const { transformGame } = require("../merge");

const { Game } = require("../../models/game");

module.exports = async (_, {}, { models }) => {
  try {
    const games = await Game.find({});
    return games.map((game) => transformGame(game));
  } catch (err) {
    throw err;
  }
};
