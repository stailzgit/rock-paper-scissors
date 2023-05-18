// const { transformGame } = require("../merge");
const { transformUser } = require("../merge");
const { UserStatus } = require("../../models/constants");
const { User } = require("../../models");

module.exports = async (_, { userId }) => {
  const user = await User.findById({ _id: userId });
  user.statusGame = UserStatus.OFFLINE;
  await user.save();

  return transformUser(user);
};
