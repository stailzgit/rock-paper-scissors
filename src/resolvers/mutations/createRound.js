const mongoose = require("mongoose");
const { transformRound } = require("../merge");
const { ObjectId } = mongoose.Types;
const { Round, Game } = require("../../models");

module.exports = async (_, { input }) => {
  const newRound = new Round({
    game: input.gameId,
    sender: { id: input.senderId },
    recipient: { id: input.recipientId },
  });
  const createdRound = await newRound.save();

  const game = await Game.findById(input.gameId);

  game.rounds.push(createdRound.id);

  await game.save();

  return transformRound(createdRound);
};
