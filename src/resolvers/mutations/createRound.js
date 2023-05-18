import { Types } from "mongoose";
import { transformRound } from "../merge.js";
const { ObjectId } = Types;
import { Round } from "../../models/round.js";

export default async (_, { input }, {}) => {
  const newRound = new Round({
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
