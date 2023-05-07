const mongoose = require("mongoose");
const { transformRound } = require("../merge");
const { Schema } = mongoose;
const { ObjectId } = mongoose.Types;

module.exports = async (_, { input }, { models }) => {
  const findRound = await models.Round.findById({ _id: input.roundId });

  //Pick for user1
  if (String(findRound.user1.user) === String(input.userId))
    findRound.user1.pick = input.pick;

  //Pick for user2
  if (String(findRound.user2.user) === String(input.userId))
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
    if (String(findGame.user1.user) === String(findRound.winnerRound))
      findGame.user1.score++;
    if (String(findGame.user2.user) === String(findRound.winnerRound))
      findGame.user2.score++;

    //If max score then end Game
    if (findGame.user1.score === findGame.endGameScore)
      findGame.winnerGame = findGame.user1.user;
    if (findGame.user2.score === findGame.endGameScore)
      findGame.winnerGame = findGame.user2.user;

    await findGame.save();
  }

  const resultRound = await findRound.save();

  return transformRound(resultRound);
};

const getWinnerRound = (user1, user2) => {
  if (user1.pick === user2.pick) return null;
  if (user1.pick === "ROCK" && user2.pick === "SCISSORS") return user1.user;
  if (user1.pick === "ROCK" && user2.pick === "PAPER") return user2.user;
  if (user1.pick === "PAPER" && user2.pick === "ROCK") return user1.user;
  if (user1.pick === "PAPER" && user2.pick === "SCISSORS") return user2.user;
  if (user1.pick === "SCISSORS" && user2.pick === "PAPER") return user1.user;
  if (user1.pick === "SCISSORS" && user2.pick === "ROCK") return user2.user;
};
