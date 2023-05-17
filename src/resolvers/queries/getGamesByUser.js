import { transformGame } from "../merge.js";
import { Game } from "../../models/game.js";

export default async (_, { userId }) => {
  const findGames = await Game.find({
    $or: [{ "sender.id": userId }, { "recipient.id": userId }],
  });
  return findGames.map((game) => transformGame(game));
};
