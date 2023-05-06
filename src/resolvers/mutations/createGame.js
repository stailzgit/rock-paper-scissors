const mongoose = require("mongoose");
<<<<<<< HEAD
const { transformUser } = require("../transformResolvers");
const { transformGame } = require("../merge");
=======
const { supportUser } = require("../supportResolvers");
>>>>>>> 6975dffe4f9e228c0c2d7c052188bb808b7ac9d5
const { ObjectId } = mongoose.Types;

module.exports = async (_, { input }, { models }) => {
  const newGame = new models.Game(input);

<<<<<<< HEAD
  newGame.user1 = { user: input.userId1, score: 0 };
  newGame.user2 = { user: input.userId2, score: 0 };
=======
  newGame.user1 = { _id: input.userId1, score: 0 };
  newGame.user2 = { _id: input.userId2, score: 0 };
>>>>>>> 6975dffe4f9e228c0c2d7c052188bb808b7ac9d5

  const createdGame = await newGame.save();
  const user1Find = await models.User.findById(input.userId1);
  const user2Find = await models.User.findById(input.userId2);

  user1Find.games.push(createdGame.id);
  user2Find.games.push(createdGame.id);

<<<<<<< HEAD
  await user1Find.save();
  await user2Find.save();

  return transformGame(createdGame);
=======
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
>>>>>>> 6975dffe4f9e228c0c2d7c052188bb808b7ac9d5
};
