const mongoose = require("mongoose");
const { transformGame } = require("../merge");
const { ObjectId } = mongoose.Types;

module.exports = async (_, { input }, { models }) => {
  const newGame = new models.Game(input);

  newGame.sender = { id: input.senderId, score: 0 };
  newGame.recipient = { id: input.recipientId, score: 0 };

  const createdGame = await newGame.save();

  return transformGame(createdGame);
};
