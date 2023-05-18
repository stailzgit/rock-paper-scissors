// const { transformGame } = require("../merge");
import { transformUser } from "../merge.js";
import { UserStatus } from "../../support/constants.js";
import { User } from "../../models/user.js";

export default async (_, { userId }, {}) => {
  const user = await User.findById({ _id: userId });
  user.statusGame = UserStatus.OFFLINE;
  await user.save();

  return transformUser(user);
};
