const mongoose = require("mongoose");
const { transformRound } = require("../merge");
const { ObjectId } = mongoose.Types;

module.exports = async (_, { input }, { models }) => {
  const newRound = new models.Round({
    game: input.gameId,
    user1: { user: input.userId1 },
    user2: { user: input.userId2 },
  });
  const createdRound = await newRound.save();

  const user1 = await models.User.findById(input.userId1);
  const user2 = await models.User.findById(input.userId1);
  const game = await models.Game.findById(input.gameId);
  console.log("game", game);
  // user1.rounds.push(createdRound.id);
  // user2.rounds.push(createdRound.id);
  game.rounds.push(createdRound.id);

  // await user1.save();
  // await user2.save();
  await game.save();

  return transformRound(createdRound);
};
