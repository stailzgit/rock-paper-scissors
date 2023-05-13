// const { transformGame } = require("../merge");
const { transformUser } = require("../merge");
const { UserStatusGames } = require("../../models/constants");

module.exports = async (_, { userId }, { models }) => {
  const user = await models.User.findById({ _id: userId });
  user.statusGame = UserStatusGames.OFFLINE;
  await user.save();

  return transformUser(user);
};
