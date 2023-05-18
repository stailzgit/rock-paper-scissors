const { transformRound } = require("../merge");
const { Round } = require("../../models");

module.exports = async (_, { gameId }) => {
  const findRounds = await Round.find({ game: gameId });
  return findRounds.map((round) => transformRound(round));
};
