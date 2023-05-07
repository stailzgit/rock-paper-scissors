const { transformRound } = require("../merge");

module.exports = async (_, { gameId }, { models }) => {
  const findRounds = await models.Round.find({ game: gameId });
  return findRounds.map((round) => transformRound(round));
};
