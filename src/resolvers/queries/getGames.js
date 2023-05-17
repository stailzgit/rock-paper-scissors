import { transformGame } from "../merge.js";
import { Game } from "../../models/game.js";

export default async (_, {}) => {
  try {
    const games = await Game.find({});
    return games.map((game) => transformGame(game));
  } catch (err) {
    throw err;
  }
};
