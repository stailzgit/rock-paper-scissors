import { transformGame } from "../merge.js";

export default async (_, {}, { models }) => {
  try {
    const games = await models.Game.find({});
    return games.map((game) => transformGame(game));
  } catch (err) {
    throw err;
  }
};
