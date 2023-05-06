// module.exports = async (_, {}, { models }) => {
//   return await models.Round.find({});
// };

const { transformRound } = require("../merge");

// module.exports = async (_, {}, { models }) => {
//   return await models.Game.find({}).populate("rounds");
// };

module.exports = async (_, {}, { models }) => {
  try {
    const rounds = await models.Round.find({});
    return rounds.map((round) => transformRound(round));
  } catch (err) {
    throw err;
  }
};
