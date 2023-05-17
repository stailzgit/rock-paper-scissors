import { transformGame, transformRound, transformUser } from "../merge.js";
import { User } from "../../models/user.js";

export default async () => {
  try {
    const users = await User.find({});
    return users.map((user) => transformUser(user));
  } catch (err) {
    throw err;
  }
};
// module.exports = async (_, {}, { models }) => {
//   return await models.User.find({}).populate("games").populate("rounds");
// };
