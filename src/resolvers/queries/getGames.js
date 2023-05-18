const { transformGame } = require("../merge");

const { Game } = require("../../models");

module.exports = async () => {
  try {
    const games = await Game.find({});
    return games.map((game) => transformGame(game));
  } catch (err) {
    throw err;
  }
};
