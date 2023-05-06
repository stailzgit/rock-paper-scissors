const mongoose = require("mongoose");
const { transformRound } = require("../merge");
const { ObjectId } = mongoose.Types;

module.exports = async (_, { input }, { models }) => {
  const newRound = new models.Round(input);
  const createdRound = await newRound.save();

  const user1 = await models.User.findById(ObjectId(input.user1.user));
  const user2 = await models.User.findById(ObjectId(input.user2.user));
  const game = await models.Game.findById(ObjectId(input.game));

  // user1.rounds.push(createdRound.id);
  // user2.rounds.push(createdRound.id);
  game.rounds.push(createdRound.id);

  // await user1.save();
  // await user2.save();
  await game.save();

  return transformRound(createdRound);
};
