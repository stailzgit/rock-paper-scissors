const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

const { User, Game, Round } = require("../../models");

module.exports = async (_, { input }, { models }) => {
  const newRound = new Round(input);
  const createdRound = await newRound.save();

  const user1 = await User.findById(ObjectId(input.user1.id));
  const user2 = await User.findById(ObjectId(input.user2.id));
  const game = await Game.findById(ObjectId(input.game));

  user1.rounds.push(createdRound.id);
  user2.rounds.push(createdRound.id);
  game.rounds.push(createdRound.id);

  await user1.save();
  await user2.save();
  await game.save();

  return createdRound;
};
