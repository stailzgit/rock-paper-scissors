const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = mongoose.Types;

module.exports = async (_, { input }, { models }) => {
  const findRound = await models.Round.findById({
    _id: input.roundId,
  });

  //Pick for user1
  if (String(findRound.user1.id) === String(input.userId))
    findRound.user1.pick = input.pick;

  //Pick for user2
  if (String(findRound.user2.id) === String(input.userId))
    findRound.user2.pick = input.pick;

  //End round if 2 users made pick
  if (findRound.user1.pick && findRound.user2.pick) {
    findRound.winnerRound = getWinnerRound(findRound.user1, findRound.user2);
  } else {
    return await findRound.save();
  }

  //Check end game if max score
  if (findRound.winnerRound !== null) {
    const findGame = await models.Game.findById({
      _id: findRound.game,
    });
    //Inc score for winner Round
    if (String(findGame.user1.id) === String(findRound.winnerRound))
      findGame.user1.score += 1;
    if (String(findGame.user2.id) === String(findRound.winnerRound))
      findGame.user2.score += 1;

    //If max score then end Game
    if (findGame.user1.score === findGame.endGameScore)
      findGame.winnerGame = findGame.user1.id;
    if (findGame.user2.score === findGame.endGameScore)
      findGame.winnerGame = findGame.user2.id;

    await findGame.save();
  }

  return await findRound.save();
};

const getWinnerRound = (user1, user2) => {
  if (user1.pick === user2.pick) return null;
  if (user1.pick === "rock" && user2.pick === "scissors") return user1.id;
  if (user1.pick === "rock" && user2.pick === "paper") return user2.id;
  if (user1.pick === "paper" && user2.pick === "rock") return user1.id;
  if (user1.pick === "paper" && user2.pick === "scissors") return user2.id;
  if (user1.pick === "scissors" && user2.pick === "paper") return user1.id;
  if (user1.pick === "scissors" && user2.pick === "rock") return user2.id;
};

const addUserScore = (roundId, winnerId) => {
  find().where("_id").in(ids);
};
