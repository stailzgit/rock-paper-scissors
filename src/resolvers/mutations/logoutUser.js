// const { transformGame } = require("../merge");
const { transformUser } = require("../merge");
const { UserStatus } = require("../../models/constants");
const { User } = require("../../models/user");

module.exports = async (_, { userId }, { models }) => {
  const user = await User.findById({ _id: userId });
  user.statusGame = UserStatus.OFFLINE;
  await user.save();

  return transformUser(user);
};
