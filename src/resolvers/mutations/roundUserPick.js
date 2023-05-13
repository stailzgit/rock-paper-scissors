const mongoose = require("mongoose");
const { transformRound } = require("../merge");
const { Schema } = mongoose;
const { ObjectId } = mongoose.Types;

module.exports = async (_, { input }, { models }) => {
  const findRound = await models.Round.findById({ _id: input.roundId });

  //Pick for sender
  if (String(findRound.sender.id) === String(input.userId))
    findRound.sender.pick = input.pick;

  //Pick for recipient
  if (String(findRound.recipient.id) === String(input.userId))
    findRound.recipient.pick = input.pick;

  //End round if 2 users made pick
  if (findRound.sender.pick && findRound.recipient.pick) {
    findRound.winnerRoundId = getWinnerRound(
      findRound.sender,
      findRound.recipient
    );
  } else {
    return await findRound.save();
  }

  //Check end game if max score
  if (findRound.winnerRoundId !== null) {
    const findGame = await models.Game.findById({
      _id: findRound.game,
    });

    //Inc score for winner Round
    if (String(findGame.sender.id) === String(findRound.winnerRoundId))
      findGame.sender.score++;
    if (String(findGame.recipient.id) === String(findRound.winnerRoundId))
      findGame.recipient.score++;

    //If max score then end Game
    if (findGame.sender.score === findGame.endGameScore)
      findGame.winnerGameId = findGame.sender.user;
    if (findGame.recipient.score === findGame.endGameScore)
      findGame.winnerGameId = findGame.recipient.id;

    await findGame.save();
  }

  const resultRound = await findRound.save();

  return transformRound(resultRound);
};

const getWinnerRound = (sender, recipient) => {
  if (sender.pick === recipient.pick) return null;
  if (sender.pick === "ROCK" && recipient.pick === "SCISSORS") return sender.id;
  if (sender.pick === "ROCK" && recipient.pick === "PAPER") return recipient.id;
  if (sender.pick === "PAPER" && recipient.pick === "ROCK") return sender.id;
  if (sender.pick === "PAPER" && recipient.pick === "SCISSORS")
    return recipient.id;
  if (sender.pick === "SCISSORS" && recipient.pick === "PAPER")
    return sender.id;
  if (sender.pick === "SCISSORS" && recipient.pick === "ROCK")
    return recipient.id;
};
