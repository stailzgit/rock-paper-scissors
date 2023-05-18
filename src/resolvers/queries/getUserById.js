const { transformGame, transformRound, transformUser } = require("../merge");
const { User } = require("../../models/user");

module.exports = async (_, { userId }) => {
  try {
    const user = await User.findById({ _id: userId });
    return transformUser(user);
  } catch (err) {
    throw err;
  }
};
