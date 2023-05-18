import { transformRound } from "../merge.js";
import { Round } from "../../models/round.js";

export default async (_, { gameId }, {}) => {
  const findRounds = await Round.find({ game: gameId });
  return findRounds.map((round) => transformRound(round));
};
