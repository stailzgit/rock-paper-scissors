const mongoose = require("mongoose");
const { transformGame } = require("../merge");
const { ObjectId } = mongoose.Types;
const { Game, User } = require("../../models");

module.exports = async (_, { input }, { models }) => {
  const newGame = new Game(input);
  console.log("input", input);
  newGame.sender = { id: input.senderId, score: 0 };
  newGame.recipient = { id: input.recipientId, score: 0 };

  const user1 = await User.findById(ObjectId(input.senderId));
  const user2 = await User.findById(ObjectId(input.recipientId));

  const createdGame = await newGame.save();

  user1.games.push(createdGame.id);
  user2.games.push(createdGame.id);

  await user1.save();
  await user2.save();

  return transformGame(createdGame);
};
