import { transformRound } from "../merge.js";

export default async (_, { gameId }, { models }) => {
  const findRounds = await models.Round.find({ game: gameId });
  return findRounds.map((round) => transformRound(round));
};
