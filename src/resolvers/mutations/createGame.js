const mongoose = require("mongoose");
const { transformUser } = require("../transformResolvers");
const { transformGame } = require("../merge");
const { ObjectId } = mongoose.Types;

module.exports = async (_, { input }, { models }) => {
  const newGame = new models.Game(input);

  newGame.user1 = { user: input.userId1, score: 0 };
  newGame.user2 = { user: input.userId2, score: 0 };

  const createdGame = await newGame.save();
  const user1Find = await models.User.findById(input.userId1);
  const user2Find = await models.User.findById(input.userId2);

  user1Find.games.push(createdGame.id);
  user2Find.games.push(createdGame.id);

  await user1Find.save();
  await user2Find.save();

  return transformGame(createdGame);
};
