import { transformGame, transformRound, transformUser } from "../merge.js";
import { User } from "../../models/user.js";

export default async (_, { statusGame, excludeMe }, {}) => {
  try {
    const users = await User.find({
      $and: [{ statusGame: statusGame }, { _id: { $ne: excludeMe } }],
    });
    return users.map((user) => transformUser(user));
  } catch (err) {
    throw err;
  }
};
