// module.exports = async (_, {}, { models }) => {
//   return await models.Round.find({});
// };
import { Round } from "../../models/round.js";
import { transformRound } from "../merge.js";

// module.exports = async (_, {}, { models }) => {
//   return await models.Game.find({}).populate("rounds");
// };

export default async (_, {}) => {
  try {
    const rounds = await Round.find({});
    return rounds.map((round) => transformRound(round));
  } catch (err) {
    throw err;
  }
};
