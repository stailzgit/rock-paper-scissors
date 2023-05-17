import { Types } from "mongoose";
import { transformRound } from "../merge.js";
const { ObjectId } = Types;

export default async (_, { input }, { models }) => {
  const newRound = new models.Round({
    game: input.gameId,
    sender: { id: input.senderId },
    recipient: { id: input.recipientId },
  });
  const createdRound = await newRound.save();

  const game = await models.Game.findById(input.gameId);

  game.rounds.push(createdRound.id);

  await game.save();

  return transformRound(createdRound);
};
