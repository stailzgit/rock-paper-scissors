import { transformGame, transformRound, transformUser } from "../merge.js";
import { User } from "../../models/user.js";

export default async (_, { userId }, {}) => {
  try {
    const user = await User.findById({ _id: userId });
    return transformUser(user);
  } catch (err) {
    throw err;
  }
};
