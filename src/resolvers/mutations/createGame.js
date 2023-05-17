import { Types } from "mongoose";
import { transformGame } from "../merge.js";
const { ObjectId } = Types;
import { Game } from "../../models/game.js";

export default async (_, { input }, {}) => {
  const newGame = new Game(input);

  newGame.sender = { id: input.senderId, score: 0 };
  newGame.recipient = { id: input.recipientId, score: 0 };

  const createdGame = await newGame.save();

  return transformGame(createdGame);
};
