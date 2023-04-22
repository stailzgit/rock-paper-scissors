module.exports = async (_, { gameId }, { models }) => {
  return await models.Round.find({ game: gameId });
};
