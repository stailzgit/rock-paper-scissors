// module.exports = async (_, {}, { models }) => {
//   return await models.Round.find({});
// };

import { transformRound } from "../merge.js";

// module.exports = async (_, {}, { models }) => {
//   return await models.Game.find({}).populate("rounds");
// };

export default async (_, {}, { models }) => {
  try {
    const rounds = await models.Round.find({});
    return rounds.map((round) => transformRound(round));
  } catch (err) {
    throw err;
  }
};
