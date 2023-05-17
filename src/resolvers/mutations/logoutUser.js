// const { transformGame } = require("../merge");
import { transformUser } from "../merge.js";
import { UserStatus } from "../../models/constants.js";

export default async (_, { userId }, { models }) => {
  const user = await models.User.findById({ _id: userId });
  user.statusGame = UserStatus.OFFLINE;
  await user.save();

  return transformUser(user);
};
