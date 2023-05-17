// const { transformGame } = require("../merge");
import compare from "bcryptjs";
import sign from "jsonwebtoken";
import { transformUser } from "../merge.js";
import { UserStatus } from "../../support/constants.js";

export default async (_, { input }, { models }) => {
  const { email, password } = input;
  const user = await models.User.findOne({ email: email });
  if (!user) throw new Error("User does not exist!");

  const isEqual = await compare(password, user.password);
  if (!isEqual) throw new Error("Password is incorrect!");

  const token = sign(
    { userId: user.id, email: user.email },
    "somesupersecretkey",
    { expiresIn: "1h" }
  );
  user.token = token;
  user.statusGame = UserStatus.ONLINE;
  await user.save();

  return transformUser(user);
};
