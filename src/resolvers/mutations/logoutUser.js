// const { transformGame } = require("../merge");
const { transformUser } = require("../merge");
const { UserStatus } = require("../../models/constants");

module.exports = async (_, { userId }, { models }) => {
  const user = await models.User.findById({ _id: userId });
  user.statusGame = UserStatus.OFFLINE;
  await user.save();

  return transformUser(user);
};
