const { transformGame, transformRound, transformUser } = require("../merge");

module.exports = async (_, {}, { models }) => {
  try {
    const users = await models.User.find({});
    return users.map((user) => transformUser(user));
  } catch (err) {
    throw err;
  }
};
// module.exports = async (_, {}, { models }) => {
//   return await models.User.find({}).populate("games").populate("rounds");
// };
