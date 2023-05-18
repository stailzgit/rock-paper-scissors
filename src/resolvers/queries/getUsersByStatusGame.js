const { transformGame, transformRound, transformUser } = require("../merge");
const { User } = require("../../models");

module.exports = async (_, { statusGame, excludeMe }) => {
  try {
    const users = await User.find({
      $and: [{ statusGame: statusGame }, { _id: { $ne: excludeMe } }],
    });
    return users.map((user) => transformUser(user));
  } catch (err) {
    throw err;
  }
};
