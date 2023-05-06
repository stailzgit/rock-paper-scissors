const { transformGame } = require("../merge");

module.exports = async (_, {}, { models }) => {
  try {
    const games = await models.Game.find({});
    return games.map((game) => transformGame(game));
  } catch (err) {
    throw err;
  }
};
