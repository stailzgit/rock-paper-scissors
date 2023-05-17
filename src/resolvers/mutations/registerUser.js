// const { transformGame } = require("../merge");
import hash from "bcryptjs";
import sign from "jsonwebtoken";
import { transformUser } from "../merge.js";
// import { Apollo } from "@apollo/server";

export default async (_, { input }, { models }) => {
  const { name, email, password } = input;
  const existingUser = await models.User.findOne({ email: email });

  if (existingUser) {
    throw new Error(
      "A user is already registered with the email " + email,
      "USER_ALREADY_EXIST"
    );
  }

  const encryptedPassword = await hash(password, 10);

  const newUser = new models.User({
    name,
    email: email.toLowerCase(),
    password: encryptedPassword,
  });

  const token = sign({ userId: newUser.id.email }, "UNSAVE_STRING", {
    expiresIn: "2h",
  });

  newUser.token = token;

  const createdUser = await newUser.save();

  return transformUser(createdUser);
};
