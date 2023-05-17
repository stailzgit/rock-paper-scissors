import { transformGame } from "../merge.js";

export default async (_, { userId }, { models }) => {
  const findGames = await models.Game.find({
    $or: [{ "sender.id": userId }, { "recipient.id": userId }],
  });
  return findGames.map((game) => transformGame(game));
};
