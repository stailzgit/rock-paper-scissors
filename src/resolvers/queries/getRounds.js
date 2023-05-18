import { Round } from "../../models/round.js";
import { transformRound } from "../merge.js";

export default async (_, {}) => {
  try {
    const rounds = await Round.find({});
    return rounds.map((round) => transformRound(round));
  } catch (err) {
    throw err;
  }
};
