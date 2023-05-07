// const { transformGame } = require("../merge");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { transformUser } = require("../merge");

module.exports = async (_, { input }, { models }) => {
  const { name, email, password } = input;
  const existingUser = await models.User.findOne({ email: email });

  if (existingUser) {
    throw new Error("User exists already.");
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = new models.User({
    name: name,
    email: email,
    password: hashedPassword,
  });

  const createdUser = await user.save();
  return transformUser(createdUser);
};
