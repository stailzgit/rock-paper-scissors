const { transformGame, transformRound, transformUser } = require("../merge");
const { User } = require("../../models");

module.exports = async () => {
  try {
    const users = await User.find({});
    return users.map((user) => transformUser(user));
  } catch (err) {
    throw err;
  }
};
