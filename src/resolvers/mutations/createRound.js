const mongoose = require("mongoose");
const { transformRound } = require("../merge");
const { ObjectId } = mongoose.Types;

module.exports = async (_, { input }, { models }) => {
  const newRound = new models.Round({
    game: input.gameId,
    sender: { id: input.senderId },
    recipient: { id: input.recipientId },
  });
  const createdRound = await newRound.save();

  const game = await models.Game.findById(input.gameId);
  console.log("game", game);

  game.rounds.push(createdRound.id);

  await game.save();

  return transformRound(createdRound);
};
