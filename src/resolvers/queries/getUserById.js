const { transformGame, transformRound, transformUser } = require("../merge");

module.exports = async (_, { userId }, { models }) => {
  try {
    const user = await models.User.findById({ _id: userId });
    return transformUser(user);
  } catch (err) {
    throw err;
  }
};
// module.exports = async (_, {}, { models }) => {
//   return await models.User.find({}).populate("games").populate("rounds");
// };
