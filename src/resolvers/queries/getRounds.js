const { transformRound } = require("../merge");
const { Round } = require("../../models");

module.exports = async () => {
  try {
    const rounds = await Round.find({});
    return rounds.map((round) => transformRound(round));
  } catch (err) {
    throw err;
  }
};
