const { transformGame, transformRound, transformUser } = require("../merge");
const { User } = require("../../models/user");

module.exports = async (_, {}, {}) => {
  try {
    const users = await User.find({});
    return users.map((user) => transformUser(user));
  } catch (err) {
    throw err;
  }
};
// module.exports = async (_, {}, { models }) => {
//   return await models.User.find({}).populate("games").populate("rounds");
// };
