const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

module.exports = async (_, { input }, { models }) => {
  console.log(input);
  const newGame = new models.Game(input);

  newGame.user1 = { id: input.userId1, score: 0 };
  newGame.user2 = { id: input.userId2, score: 0 };

  const createdGame = await newGame.save();

  const user1 = await models.User.findById(ObjectId(input.userId1));
  const user2 = await models.User.findById(ObjectId(input.userId2));

  user1.games.push(createdGame.id);
  user2.games.push(createdGame.id);

  await user1.save();
  await user2.save();

  return {
    ...createdGame,
  };
};
