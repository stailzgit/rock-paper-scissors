const mongoose = require("mongoose");
const { supportUser } = require("../supportResolvers");
const { ObjectId } = mongoose.Types;

module.exports = async (_, { input }, { models }) => {
  console.log(input);
  const newGame = new models.Game(input);

  newGame.user1 = { _id: input.userId1, score: 0 };
  newGame.user2 = { _id: input.userId2, score: 0 };

  const createdGame = await newGame.save();

  const user1 = await models.User.findById(ObjectId(input.userId1));
  const user2 = await models.User.findById(ObjectId(input.userId2));

  console.log("user1", user1);

  user1.games.push(createdGame.id);
  user2.games.push(createdGame.id);

  await user1.save();
  await user2.save();

  return {
    ...createdGame._doc,
    user1: {
      user: supportUser(createdGame.user1.user),
      score: createdGame.user1.score,
    },
    user2: {
      user: supportUser(createdGame.user2.user),
      score: createdGame.user2.score,
    },
  };
};
